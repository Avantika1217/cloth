// JavaScript to toggle dropdown on mobile view
document.querySelectorAll('.dropdown').forEach(function(dropdown) {
    dropdown.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('open');
    });
});
