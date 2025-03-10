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
// UPDATE: I was able to get this working again... Enjoy!

var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})