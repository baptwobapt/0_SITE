var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 500 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #111 }";
  document.body.appendChild(css);
};

document.addEventListener('DOMContentLoaded', function () {
  const card = document.querySelector('.card');
  const cardInner = card.querySelector('.card-inner');

  // Fonction pour vérifier la largeur de l'écran
  function checkScreenSize() {
    if (window.innerWidth < 1025) {
      // Si la largeur de l'écran est inférieure à 800px, on applique l'effet de clic
      card.addEventListener('click', toggleCardRotation);
    } else {
      // Sinon, on s'assure que l'effet de clic n'est pas activé
      card.removeEventListener('click', toggleCardRotation);
    }
  }

  // Fonction pour inverser la rotation
  function toggleCardRotation() {
    if (cardInner.style.transform === 'rotateY(180deg)') {
      cardInner.style.transform = 'rotateY(0deg)';
    } else {
      cardInner.style.transform = 'rotateY(180deg)';
    }
  }

  // Vérifier la taille de l'écran au chargement
  checkScreenSize();

  // Vérifier à chaque redimensionnement de la fenêtre
  window.addEventListener('resize', checkScreenSize);
});
document.addEventListener("DOMContentLoaded", function() {
  let video = document.getElementById("introVideo");
  let loader = document.getElementById("videoLoader");
  let content = document.getElementById("mainContent");

  // Désactiver le scroll temporairement
  document.body.classList.add("no-scroll");

  // Vérifier si la vidéo a déjà été vue
  if (sessionStorage.getItem("videoPlayed")) {
      // Si la vidéo a déjà été jouée, cacher le loader et afficher directement le site
      loader.style.display = "none";
      content.style.display = "block";
      content.style.opacity = "1";
      document.body.classList.remove("no-scroll"); // Activer le scroll
  } else {
      // Jouer la vidéo et enregistrer son état
      video.onended = function() {
          loader.style.opacity = "0"; // Début du fade-out
          setTimeout(() => {
              loader.style.display = "none"; // Masquer le loader
              content.style.display = "block";

              // Petite pause pour éviter une coupure brutale
              setTimeout(() => {
                  content.style.opacity = "1"; // Apparition en douceur du contenu
                  document.body.classList.remove("no-scroll"); // Réactiver le scroll
              }, 100);

              // Enregistrer que la vidéo a été jouée
              sessionStorage.setItem("videoPlayed", "true");
          }, 500); // Temps du fade-out avant de masquer complètement
      };
  }
});

