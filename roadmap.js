document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel with custom settings
    const roadmapCarousel = new bootstrap.Carousel(document.getElementById('roadmapCarousel'), {
        interval: 5000, // Change slides every 5 seconds
        wrap: true, // Continuous loop
        keyboard: true, // Allow keyboard navigation
        touch: true // Allow touch/swipe navigation
    });

    // Handle Read More buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentCard = this.closest('.roadmap-card');
            const currentCardText = currentCard.querySelector('.card-text');
            
            // First collapse all other expanded cards in the same slide
            const currentSlide = this.closest('.carousel-item');
            const otherCards = currentSlide.querySelectorAll('.roadmap-card');
            otherCards.forEach(card => {
                if (card !== currentCard) {
                    const cardText = card.querySelector('.card-text');
                    const cardButton = card.querySelector('.read-more');
                    cardText.classList.remove('expanded');
                    cardText.style.maxHeight = '96px';
                    cardButton.textContent = 'Read More';
                }
            });
            
            // Then toggle the current card
            if (this.textContent === 'Read More') {
                // Expand
                currentCardText.classList.add('expanded');
                this.textContent = 'Read Less';
            } else {
                // Collapse
                currentCardText.classList.remove('expanded');
                currentCardText.style.maxHeight = '96px';
                this.textContent = 'Read More';
            }
        });
    });

    // Collapse all cards when changing slides
    document.getElementById('roadmapCarousel').addEventListener('slide.bs.carousel', function() {
        const allCards = document.querySelectorAll('.roadmap-card');
        allCards.forEach(card => {
            const cardText = card.querySelector('.card-text');
            const cardButton = card.querySelector('.read-more');
            cardText.classList.remove('expanded');
            cardText.style.maxHeight = '96px';
            cardButton.textContent = 'Read More';
        });
    });

    // Pause carousel on hover
    document.getElementById('roadmapCarousel').addEventListener('mouseenter', function() {
        roadmapCarousel.pause();
    });

    document.getElementById('roadmapCarousel').addEventListener('mouseleave', function() {
        roadmapCarousel.cycle();
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.getElementById('roadmapCarousel');
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, false);
    
    carousel.addEventListener('touchmove', function(e) {
        touchEndX = e.touches[0].clientX;
    }, false);
    
    carousel.addEventListener('touchend', function() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                roadmapCarousel.next();
            } else {
                // Swipe right - previous slide
                roadmapCarousel.prev();
            }
        }
    }, false);

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            roadmapCarousel.prev();
        } else if (e.key === 'ArrowRight') {
            roadmapCarousel.next();
        }
    });
});
