document.addEventListener("scroll", function() {
    const cards = document.querySelectorAll(".roadmap-card");
    const triggerBottom = window.innerHeight / 5 * 4;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
});
