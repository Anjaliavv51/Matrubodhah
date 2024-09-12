document.addEventListener("scroll", function() {
    const heroSection = document.querySelector(".hero");
    const heroH2 = document.querySelector(".hero h2");
    const heroP = document.querySelector(".hero p.subtitle");
    const wisdomContent = document.querySelector(".wisdom-section .wisdom-content");
    const wisdomImage = document.querySelector(".wisdom-image");

    const scrollPosition = window.scrollY + window.innerHeight;

    // Check if the user has scrolled to the hero section and apply/remove the scrolled class
    if (scrollPosition > heroSection.offsetTop + heroSection.offsetHeight / 3) {
        heroSection.classList.add("scrolled");
        heroH2.classList.add("scrolled");
        heroP.classList.add("scrolled");
    } else {
        heroSection.classList.remove("scrolled");
        heroH2.classList.remove("scrolled");
        heroP.classList.remove("scrolled");
    }

    // Check if the user has scrolled to the wisdom section content and apply/remove the scrolled class
    if (scrollPosition > wisdomContent.offsetTop + wisdomContent.offsetHeight / 3) {
        wisdomContent.classList.add("scrolled");
        wisdomImage.classList.add("scrolled");
    } else {
        wisdomContent.classList.remove("scrolled");
        wisdomImage.classList.remove("scrolled");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.roadmap-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the card is visible
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});