// Création de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / (window.innerHeight / 1.3), 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight / 1.3); // Taille initiale pour desktop
renderer.setClearColor(0x0c0c0c); // Couleur de fond
document.body.appendChild(renderer.domElement);

// Position initiale de la caméra
camera.position.set(0, 0, 2);
camera.lookAt(0, 0, 0);

// Lumières
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Variable pour stocker le modèle chargé
let model;

// Fonction pour ajuster les paramètres pour mobile et desktop
function adjustForScreenSize() {
    if (window.innerWidth <= 1025) {
        // Configuration mobile
        renderer.setSize(window.innerWidth, window.innerHeight / 2); // Hauteur divisée par 2
        camera.fov = 40; // Champ de vision élargi pour mobile
        camera.aspect = window.innerWidth / (window.innerHeight / 2); // Ratio ajusté pour la hauteur réduite
        if (model) {
            model.scale.set(0.5, 0.5, 2); // Réduire l'échelle du modèle sur mobile
        }
    } else {
        // Configuration desktop
        renderer.setSize(window.innerWidth, window.innerHeight / 1.3); // Garder la réduction sur l'axe Y
        camera.fov = 50; // Champ de vision par défaut
        camera.aspect = window.innerWidth / (window.innerHeight / 1.3);
        if (model) {
            model.scale.set(1, 1, 1); // Échelle standard
        }
    }
    camera.updateProjectionMatrix();
}

// Événement pour gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    adjustForScreenSize();
    renderer.setPixelRatio(window.devicePixelRatio || 1);
});

// Gestion des mouvements de souris
const mouseVector = new THREE.Vector3();
document.addEventListener("mousemove", (event) => {
    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouseVector.z = 0.5;

    mouseVector.unproject(camera);
    if (model) {
        model.lookAt(mouseVector);
    }
});

// Gestion des mouvements tactiles
const touchVector = new THREE.Vector3();
document.addEventListener("touchmove", (event) => {
    const touch = event.touches[0]; // Premier point de contact
    touchVector.x = (touch.clientX / window.innerWidth) * 2 - 1;
    touchVector.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    touchVector.z = 0.5;

    touchVector.unproject(camera);
    if (model) {
        model.lookAt(touchVector);
    }
});

// Chargement du modèle
const loader = new THREE.OBJLoader();
loader.load(
    'blender/portfolio.obj',
    (obj) => {
        model = obj;

        model.position.set(0, 0, 0); // Centrer le modèle
        model.scale.set(1, 1, 1); // Échelle standard
        model.rotation.set(0, 0, 0); // Rotation initiale
        scene.add(model);

        // Lancement de l'animation
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // Ajuster la configuration pour le démarrage
        adjustForScreenSize();
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement du modèle OBJ:', error);
    }
);
