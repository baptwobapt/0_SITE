const menuToggle = document.getElementById("menu-toggle");
const zoneh = document.getElementById("zoneh");
const burgerMenu = document.getElementById("burger-menu");
const logo = document.getElementById("logo");
let lastScrollY = window.scrollY; // Position de défilement initiale

// Assurez-vous que zoneh et logo sont visibles dès le début
document.addEventListener("DOMContentLoaded", () => {
    zoneh.classList.add("show");
    logo.classList.add("show");
});

// Gestion du défilement
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 0) {
        // Évitez toute action si le défilement est au-dessus de 0 (scroll-bounce sur iOS)
        return;
    }

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

// Ajout des événements spécifiques pour la version ordinateur (mouseover et mouseout)
if (window.innerWidth > 1024) {
    // Version ordinateur
    zoneh.addEventListener("mouseover", () => {
        zoneh.classList.add("active");
        menuToggle.classList.add("active");
    });

    zoneh.addEventListener("mouseout", () => {
        zoneh.classList.remove("active");
        menuToggle.classList.remove("active");
    });
} else {
    // Version mobile
    zoneh.addEventListener("click", () => {
        const isMenuActive = burgerMenu.classList.toggle("active");
        zoneh.classList.toggle("active");
        menuToggle.classList.toggle("active");

        // Activer ou désactiver la classe no-scroll pour le body
        document.body.classList.toggle("no-scroll", isMenuActive);
    });
}

// Fermer le menu burger si un clic est effectué à l'extérieur
document.addEventListener("click", (event) => {
    if (!burgerMenu.contains(event.target) && !zoneh.contains(event.target)) {
        burgerMenu.classList.remove("active");
        document.body.classList.remove("no-scroll"); // Réactiver le défilement
    }
});
