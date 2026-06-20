

onAuthStateChange(
    async (user, profile) => {
        
        const displayName = profile?.username
            || user.displayName
            || user.email.split('@')[0];
        const email = user.email;
        const firstLetter = displayName.charAt(0).toUpperCase();

        
        window._currentUser = user;
        window._currentProfile = profile;

        
        const avatar = document.getElementById('userAvatar');
        if (avatar) avatar.textContent = firstLetter;

        
        const avatarLarge = document.getElementById('userAvatarLarge');
        if (avatarLarge) avatarLarge.textContent = firstLetter;

        
        const nameEl = document.getElementById('userName');
        const emailEl = document.getElementById('userEmail');
        if (nameEl) nameEl.textContent = displayName;
        if (emailEl) emailEl.textContent = email;

        
        const profilePageAvatar = document.getElementById('profilePageAvatar');
        if (profilePageAvatar) profilePageAvatar.textContent = firstLetter;

        const profileDisplayName = document.getElementById('profileDisplayName');
        if (profileDisplayName) profileDisplayName.textContent = displayName;

        const profileDisplayEmail = document.getElementById('profileDisplayEmail');
        if (profileDisplayEmail) profileDisplayEmail.textContent = email;

        
        const inputName = document.getElementById('inputName');
        const inputEmail = document.getElementById('inputEmail');
        if (inputName) inputName.value = displayName;
        if (inputEmail) inputEmail.value = email;

        if (profile) {
            const inputPhone = document.getElementById('inputPhone');
            const inputBio = document.getElementById('inputBio');
            const inputLocation = document.getElementById('inputLocation');
            if (inputPhone) inputPhone.value = profile.phone || '';
            if (inputBio) inputBio.value = profile.bio || '';
            if (inputLocation) inputLocation.value = profile.location || '';
        }

        
        const memberSince = document.getElementById('memberSince');
        if (memberSince) {
            const year = new Date(user.metadata.creationTime).getFullYear();
            memberSince.textContent = year;
        }
    },
    () => {

        window.location.href = '/login.html';
    }
);