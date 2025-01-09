// Création de la scène, de la caméra par défaut et du renderer
const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Position initiale de la caméra
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Variable pour suivre le mode actuel
let isMobileMode = window.innerWidth <= 768;

// Fonction pour ajuster la caméra en fonction de la largeur de l'écran
function adjustCameraForScreenSize() {
    if (window.innerWidth <= 768) {
        if (!isMobileMode) {
            // Passer en mode mobile
            isMobileMode = true;
            camera.fov = 80; // Champ de vision élargi
            console.log("Mode mobile activé");
        }
    } else {
        if (isMobileMode) {
            // Passer en mode desktop
            isMobileMode = false;
            camera.fov = 50; // Champ de vision standard
            console.log("Mode desktop activé");
        }
    }
    camera.aspect = window.innerWidth / window.innerHeight; // Mettre à jour le ratio
    camera.updateProjectionMatrix(); // Appliquer les modifications
}

// Fonction de redimensionnement
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight); // Ajuster le renderer
    adjustCameraForScreenSize(); // Réajuster la caméra
}

// Gestion initiale
adjustCameraForScreenSize();

// Écouteur pour redimensionnement
window.addEventListener("resize", onResize);

// Variable pour stocker le modèle chargé
let model;

// Écouteur de mouvement (souris ou tactile)
const inputVector = new THREE.Vector3();
function onInputMove(event) {
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;

    inputVector.x = ((x / window.innerWidth) * 2 - 1) * 3; // Augmenter la sensibilité (x2)
    inputVector.y = (-(y / window.innerHeight) * 2 + 1) * 3; // Augmenter la sensibilité (x2)
    inputVector.z = 0.5;

    inputVector.unproject(camera);
    if (model) {
        model.lookAt(inputVector);
    }
}

// Écouteurs pour mouvement
document.addEventListener("mousemove", onInputMove);
document.addEventListener("touchmove", onInputMove);

// Chargement du modèle
const loader = new THREE.OBJLoader();
loader.load(
    'blender/portfolio.obj',
    (obj) => {
        model = obj;

        // Agrandir le modèle
        model.scale.set(2, 2, 2); // Échelle doublée
        model.position.set(0, 0, 0); // Centrer le modèle
        model.rotation.set(0, 0, 0); // Rotation initiale
        scene.add(model);

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement du modèle OBJ:', error);
    }
);
