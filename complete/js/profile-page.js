/* ─────────────────────────────────────────
   profile-page.js
   Handles Edit / Save profile on profile.html
   Runs AFTER auth-guard.js populates the page
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

    const editBtn = document.getElementById('editToggleBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const formActions = document.getElementById('formActions');
    const profileForm = document.getElementById('profileForm');

    // These fields become editable on Edit click
    const editableFields = ['inputName', 'inputPhone', 'inputBio', 'inputLocation'];

    if (!editBtn || !profileForm) return;

    // ── Enable editing ──
    editBtn.addEventListener('click', () => {
        editableFields.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = false;
        });
        if (formActions) formActions.style.display = 'flex';
        editBtn.style.display = 'none';

        // Focus on name field
        const inputName = document.getElementById('inputName');
        if (inputName) inputName.focus();
    });

    // ── Cancel editing ──
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            editableFields.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.disabled = true;
            });
            if (formActions) formActions.style.display = 'none';
            editBtn.style.display = 'flex';

            // Restore original values from cached data
            restoreFormValues();
        });
    }

    // ── Restore form from cached profile ──
    function restoreFormValues() {
        const user = window._currentUser;
        const profile = window._currentProfile;
        if (!user) return;

        const displayName = profile?.username || user.displayName || '';

        const inputName = document.getElementById('inputName');
        const inputPhone = document.getElementById('inputPhone');
        const inputBio = document.getElementById('inputBio');
        const inputLocation = document.getElementById('inputLocation');

        if (inputName) inputName.value = displayName;
        if (inputPhone) inputPhone.value = profile?.phone || '';
        if (inputBio) inputBio.value = profile?.bio || '';
        if (inputLocation) inputLocation.value = profile?.location || '';
    }

    // ── Save profile ──
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = window._currentUser;
        if (!user) {
            alert('You are not logged in.');
            return;
        }

        const newName = (document.getElementById('inputName')?.value || '').trim();
        const phone = (document.getElementById('inputPhone')?.value || '').trim();
        const bio = (document.getElementById('inputBio')?.value || '').trim();
        const location = (document.getElementById('inputLocation')?.value || '').trim();

        if (!newName) {
            alert('Name cannot be empty.');
            return;
        }

        // Show saving state
        const saveBtn = profileForm.querySelector('.btn-save');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.textContent = 'Saving...';
        }

        try {
            // Update Firebase Auth display name
            await user.updateProfile({ displayName: newName });

            // Update Firestore
            await updateUserProfile(user.uid, {
                username: newName,
                phone,
                bio,
                location
            });

            // Update cached profile
            window._currentProfile = {
                ...(window._currentProfile || {}),
                username: newName,
                phone,
                bio,
                location
            };

            // Update all avatar letters & name on page
            const firstLetter = newName.charAt(0).toUpperCase();

            const els = {
                userAvatar: document.getElementById('userAvatar'),
                userAvatarLarge: document.getElementById('userAvatarLarge'),
                profilePageAvatar: document.getElementById('profilePageAvatar'),
                profileDisplayName: document.getElementById('profileDisplayName'),
                userName: document.getElementById('userName'),
            };

            if (els.userAvatar) els.userAvatar.textContent = firstLetter;
            if (els.userAvatarLarge) els.userAvatarLarge.textContent = firstLetter;
            if (els.profilePageAvatar) els.profilePageAvatar.textContent = firstLetter;
            if (els.profileDisplayName) els.profileDisplayName.textContent = newName;
            if (els.userName) els.userName.textContent = newName;

            // Disable fields again
            editableFields.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.disabled = true;
            });
            if (formActions) formActions.style.display = 'none';
            if (editBtn) editBtn.style.display = 'flex';

            showSaveSuccess();

        } catch (err) {
            console.error('Save profile error:', err);
            alert('Failed to save: ' + err.message);
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Save Changes';
            }
        }
    });

    // ── Success feedback ──
    function showSaveSuccess() {
        const btn = document.getElementById('editToggleBtn');
        if (!btn) return;

        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        btn.style.background = '#00cc66';

        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
        }, 2000);
    }

});