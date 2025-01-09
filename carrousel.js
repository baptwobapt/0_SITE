// Initialisation du Swiper
const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 25, // Valeur initiale de l'écart
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    coverflowEffect: {
        rotate: 50, // Valeur par défaut pour desktop
        stretch: -200,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Fonction pour ajuster les paramètres dynamiquement
function resizeSwiper() {
    if (window.innerWidth < 800) {
        // Modifie les paramètres pour mobile
        swiper.params.coverflowEffect.rotate = 110; // Réduit l'effet rotate
        swiper.params.spaceBetween = -45; // Ajuste l'écart
    } else {
        // Réinitialise les paramètres pour desktop
        swiper.params.coverflowEffect.rotate = 50; // Valeur par défaut
        swiper.params.spaceBetween = 25; // Écart par défaut
    }
    swiper.update(); // Applique les modifications
}

// Appel initial au chargement de la page
resizeSwiper();

// Écoute les redimensionnements de la fenêtre
window.addEventListener('resize', resizeSwiper);