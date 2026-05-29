document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const statusDiv = document.getElementById('contact-status');
  const historyDiv = document.getElementById('message-history'); // Grab history container

  // Function to pull messages from server and build HTML elements
  async function loadMessageHistory() {
    if (!historyDiv) return;
    try {
      const response = await fetch('http://localhost:3000/messages');
      const messages = await response.json();

      if (messages.length === 0) {
        historyDiv.innerHTML = '<p>No messages sent yet.</p>';
        return;
      }

      // Render out each message card cleanly
      historyDiv.innerHTML = messages.map(msg => `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 8px; border-radius: 4px;">
          <strong>${msg.name}</strong> 
          <small style="color: gray;">(${new Date(msg.timestamp).toLocaleTimeString()})</small>
          <p style="margin: 4px 0 0 0;">${msg.message}</p>
        </div>
      `).join('');
    } catch (error) {
      historyDiv.innerHTML = '<p style="color: red;">Could not load history.</p>';
    }
  }

  // 1. Automatically load history as soon as the browser tab opens
  loadMessageHistory();

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop page reload

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('username'),
        message: formData.get('user-message')
      };

      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        statusDiv.textContent = data.message;
        statusDiv.style.color = 'green';
        contactForm.reset(); 

        // 2. Instantly update the history list on screen after sending
        loadMessageHistory();

      } catch (error) {
        statusDiv.textContent = 'Server error. Try again later.';
        statusDiv.style.color = 'red';
      }
    });
  }
});
