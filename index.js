
// Add this to your existing JavaScript file
document.addEventListener("DOMContentLoaded", function () {
  const toggleMenu = document.querySelector(".toggle-menu");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  
  // Toggle mobile menu
  toggleMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Handle dropdowns on mobile
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.classList.toggle("active");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("nav")) {
      navLinks.classList.remove("active");
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });
});
