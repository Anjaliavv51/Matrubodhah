const logo = document.querySelector("nav .logo");
const navLinks = document.querySelectorAll("ul li ")
const tl = gsap.timeline();
tl.from(logo, {
    opacity: 0,
    y: -30,
    duration: 1
})

tl.from(navLinks, {
    y: -30,
    opacity: 0,
    duration: 0.75,
    stagger: 0.15,
})