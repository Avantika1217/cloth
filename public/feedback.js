// NAVIGATION SECTION 

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// FEEDBACK SECTION 

document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value;

    // Process feedback (In a real application, you'd send this data to a server)

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Rating:", rating);
    console.log("Message:", message);

    // Display thank you message
    document.getElementById("thankYouMessage").style.display = "block";
    document.getElementById("feedbackForm").reset(); // Clear the form
});
