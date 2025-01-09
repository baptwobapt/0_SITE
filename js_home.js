// Création de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth , window.innerHeight  );
document.body.appendChild(renderer.domElement);
// Réduire la taille du renderer seulement sur l'axe Y
renderer.setSize(window.innerWidth, window.innerHeight / 1.3); // Réduire uniquement la hauteur à 2/3 de l'écran, largeur inchangée
// Création de la scène, de la caméra et du renderer


// Réduire la couleur de fond à une valeur transparente
renderer.setClearColor(0x0c0c0c, ); // 0 pour la transparence
// Mettre à jour la caméra pour correspondre au nouveau ratio
camera.aspect = window.innerWidth / (window.innerHeight / 1.3);
camera.updateProjectionMatrix(); // Mise à jour nécessaire après changement

// Gestion du redimensionnement de la fenêtre pour maintenir les proportions
window.addEventListener('resize', () => {
    // Ajuster le renderer et la caméra sur l'axe Y
    renderer.setSize(window.innerWidth, window.innerHeight / 1.3);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    camera.aspect = window.innerWidth / (window.innerHeight / 1.3);
    camera.updateProjectionMatrix();
});

// Définir la couleur de fond de la scène


// Position de la caméra
camera.position.set(0, 0, 2); // Caméra centrée dans l'axe Z
camera.lookAt(0, 0, 0); // La caméra regarde le centre de la scène

// Lumières
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Variable pour stocker le modèle chargé
let model;

// Écouteur d'événement pour capturer le mouvement de la souris
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
function adjustCameraForScreenSize() {
    if (window.innerWidth <= 768) {
        // Configuration pour mobile
        camera.fov = 100; // Champ de vision élargi

    } else {
        // Configuration pour desktop/tablette
        camera.fov = 50; // Champ de vision par défaut
    }
    camera.aspect = window.innerWidth / window.innerHeight; // Mettre à jour le ratio
    camera.updateProjectionMatrix(); // Appliquer les modifications
}
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Ajuster le renderer
    adjustCameraForScreenSize(); // Réajuster la caméra
});

// Appeler une première fois pour configurer correctement la caméra au chargement
adjustCameraForScreenSize();
function toggleModelVisibility() {
    if (window.innerWidth <= 768) {
            scene.remove(model);
        }
    } else {
        // Si l'écran est desktop ou tablette, ajouter le modèle à la scène
        if (model && !scene.children.includes(model)) {
            scene.add(model);
        }
    }
}


const touchVector = new THREE.Vector3();
document.addEventListener("touchmove", (event) => {
    const touch = event.touches[0]; // Premier point de contact
    touchVector.x = (touch.clientX / window.innerWidth) * 2 - 1;
    touchVector.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    touchVector.z = 0.5;

    touchVector.unproject(camera);
    if (model) {
        model.lookAt(touchVector); // Orienter le modèle vers le toucher
    }
});


