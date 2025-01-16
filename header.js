const menuToggle = document.getElementById("menu-toggle");
const zoneh = document.getElementById("zoneh");
const burgerMenu = document.getElementById("burger-menu");

// Ajout des événements spécifiques pour la version ordinateur (mouseover et mouseout)
if (window.innerWidth > 1024) { // Version ordinateur
    zoneh.addEventListener("mouseover", () => {
        zoneh.classList.add("active");
        menuToggle.classList.add("active");
    });

    zoneh.addEventListener("mouseout", () => {
        zoneh.classList.remove("active");
        menuToggle.classList.remove("active");
    });
} else { // Version mobile
    // Ajout d'un toggle sur le clic pour activer/désactiver "zoneh"
    zoneh.addEventListener("click", () => {
        zoneh.classList.toggle("active");
        menuToggle.classList.toggle("active");
        burgerMenu.classList.toggle("active");
    });
}

document.addEventListener("click", (event) => {
    if (!burgerMenu.contains(event.target) && !zoneh.contains(event.target)) {
        burgerMenu.classList.remove("active");
    }
});

const logo = document.getElementById("logo");
let lastScrollY = window.scrollY; // Position de défilement initiale

// S'assurer que zoneh et logo sont visibles dès le début
document.addEventListener("DOMContentLoaded", () => {
    zoneh.classList.add("show");
    logo.classList.add("show");
});

// Écouteur d'événement pour surveiller le défilement
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
        // L'utilisateur remonte : afficher zoneh et logo
        zoneh.classList.add("show");
        logo.classList.add("show");
    } else {
        // L'utilisateur descend : masquer zoneh et logo
        zoneh.classList.remove("show");
        logo.classList.remove("show");
    }

    // Mise à jour de la dernière position de défilement
    lastScrollY = currentScrollY;
});