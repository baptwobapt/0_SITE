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
