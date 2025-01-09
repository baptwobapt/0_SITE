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
        rotate: 50,
        stretch: -200,
        depth: 100,
        modifier: 1,
        slideShadows: false ,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
function resizeSwiper() {
    if (window.innerWidth < 800) {
        swiper.params.spaceBetween = -45; // Modifie l'espacement pour mobile
    } else {
        swiper.params.spaceBetween = 25; // Modifie l'espacement pour desktop
    }
    swiper.update(); // Applique les modifications
}

// Appel initial au chargement de la page
resizeSwiper();

// Écoute les redimensionnements de la fenêtre
window.addEventListener('resize', resizeSwiper);