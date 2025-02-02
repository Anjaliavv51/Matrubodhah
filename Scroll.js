<!-- Scroll to Top Button -->

const scrollButton = document.getElementById('scrollButton');
const outerCircle = document.querySelector('.outer-circle');
const arrow = document.querySelector('.arrow');

// Function to handle scroll behavior
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 360;

    // Show button after scrolling 7-8 lines (~100px)
    if (scrollTop > 100) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }

    // Update the circular progress
    outerCircle.style.setProperty('--scroll-progress', `${scrollProgress}deg`);
});

// Scroll-to-top functionality
scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
