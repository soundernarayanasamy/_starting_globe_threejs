import * as THREE from "three";

// Set up renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Set up camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

// Create the scene
const scene = new THREE.Scene();

// Create an icosahedron geometry
const geometry = new THREE.IcosahedronGeometry(1, 2); // Radius 1, detail level 2 for more triangular faces

// Gradient material using MeshStandardMaterial
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: true,
});

// Apply a gradient color effect using vertex colors
const colors = [];
for (let i = 0; i < geometry.attributes.position.count; i++) {
    const y = geometry.attributes.position.getY(i); // Get Y position of each vertex
    const color = new THREE.Color(0.5 + y * 0.5, 0.1, 0.7); // Adjust the gradient as needed
    colors.push(color.r, color.g, color.b);
}
geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

// Create the mesh and add it to the scene
const icosahedronMesh = new THREE.Mesh(geometry, material);
scene.add(icosahedronMesh);

// Add a point light for shading
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 3, 5);
scene.add(light);

// Ambient light to softly light the entire scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Animation function
function animate() {
    requestAnimationFrame(animate);
    icosahedronMesh.rotation.y += 0.01; // Adjust rotation speed
    renderer.render(scene, camera);
}

// Start the animation
animate();

// Responsive resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
