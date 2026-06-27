// Contact form submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            createdAt: new Date().toISOString()
        };

        try {
            // Save to Firestore if available
            if (window.db) {
                await window.db.collection('contact_messages').add(formData);
            }

            // Show success
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thanks! Your message has been sent successfully.';
            contactForm.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Something went wrong. Please try again later.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Auto-hide status after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        }
    });
}