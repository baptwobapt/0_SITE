const carouselTrack = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');

// Double clonage pour couvrir l'espace avant et après
slides.forEach(slide => {
  const clone1 = slide.cloneNode(true);
  carouselTrack.appendChild(clone1);
});

const trackStyle = window.getComputedStyle(carouselTrack);
const gap = parseFloat(trackStyle.gap) || 0;
const slideWidth = slides[0].offsetWidth + gap;
const totalWidth = slideWidth * slides.length;
let currentPosition = 0;
let animationId;
const speed = 75; // pixels/seconde

function animate(timestamp) {
  if (!animationId) animationId = { lastTime: timestamp };
  
  const deltaTime = timestamp - animationId.lastTime;
  currentPosition += (speed * deltaTime) / 1000;
  
  // Rebouclage progressif

  
  carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
  animationId.lastTime = timestamp;
  requestAnimationFrame(animate);
}

// Démarrage de l'animation
requestAnimationFrame(animate);