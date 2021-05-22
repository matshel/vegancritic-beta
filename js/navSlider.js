navSlider = () => {
    const hamBurger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    // toggle nav
    hamBurger.addEventListener("click", () => {
            nav.classList.toggle("nav-active");

    // link animation
            navLinks.forEach((link, index) => {
                
                if (link.style.animation) {
                    link.style.animation = "";
                } else {
                    link.style.animation = `navLinkAnimation 0.5s ease forwards ${index / 7 + 0.44}s`;
                }
                
            });

    // animation burger
            hamBurger.classList.toggle("spin");
    });

}

navSlider();

