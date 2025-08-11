// NAVIGATION SECTION 

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Form Validation (Basic)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        try {
            // Send data to the backend using fetch
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (response.ok) {
                // Success message
                document.getElementById('form-message').innerText = 'Your message has been sent successfully!';
                document.getElementById('form-message').style.color = 'green';

                // Reset the form
                document.getElementById('contact-form').reset();
            } else {
                // Error message from the server
                document.getElementById('form-message').innerText = result.error || 'Failed to send your message.';
                document.getElementById('form-message').style.color = 'red';
            }
        } catch (error) {
            // Network or other errors
            document.getElementById('form-message').innerText = 'An error occurred. Please try again later.';
            document.getElementById('form-message').style.color = 'red';
        }
    } else {
        // Error handling for empty fields
        document.getElementById('form-message').innerText = 'Please fill in all fields.';
        document.getElementById('form-message').style.color = 'red';
    }
});