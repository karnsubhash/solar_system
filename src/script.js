import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/addons/objects/Sky.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
// const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log("loadingManager: loading started");
// };
// loadingManager.onLoad = () => {
//   console.log("loadingManager: loading finished");
// };
// loadingManager.onProgress = () => {
//   console.log("loadingManager: loading progressing");
// };
// loadingManager.onError = () => {
//   console.log("loadingManager: loading error");
// };

const textureLoader = new THREE.TextureLoader();

const colorTexture = textureLoader.load("/textures/solar/2k_sun.jpg");
colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const mercuryTexture = textureLoader.load("/textures/solar/2k_mercury.jpg");
const venusTexture = textureLoader.load("/textures/solar/2k_venus_surface.jpg");
const earthTexture = textureLoader.load("/textures/solar/2k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/textures/solar/2k_mars.jpg");
const jupiterTexture = textureLoader.load("/textures/solar/2k_jupiter.jpg");
const staurnTexture = textureLoader.load("/textures/solar/2k_saturn.jpg");
const uranusTexture = textureLoader.load("/textures/solar/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("/textures/solar/2k_neptune.jpg");

const saturnTexture = textureLoader.load(
  "/textures/solar/2k_saturn_ring_alpha.png"
);
/**
 * Object
 */
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 64, 64),
  new THREE.MeshBasicMaterial({ map: colorTexture })
);
// sun.position.x = 0.2;

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.01, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: mercuryTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
mercury.position.x = 0.45;

const mercuryPath = new THREE.Mesh(
  new THREE.RingGeometry(0.449, 0.451, 99),
  new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    side: THREE.DoubleSide,
  })
);
scene.add(mercuryPath);

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.02, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: venusTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
venus.position.x = 0.55;

const venusPath = new THREE.Mesh(
  new THREE.RingGeometry(0.549, 0.551, 99),
  new THREE.MeshBasicMaterial({
    color: "goldenrod",
    side: THREE.DoubleSide,
  })
);
scene.add(venusPath);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.02, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: earthTexture,
    metalness: 1,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
earth.position.x = 0.65;

const earthPath = new THREE.Mesh(
  new THREE.RingGeometry(0.649, 0.651, 99),
  new THREE.MeshBasicMaterial({
    color: "aqua",
    side: THREE.DoubleSide,
  })
);
scene.add(earthPath);

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.019, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: marsTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
mars.position.x = 0.75;

const marsPath = new THREE.Mesh(
  new THREE.RingGeometry(0.749, 0.751, 99),
  new THREE.MeshBasicMaterial({
    color: "fireBrick",
    side: THREE.DoubleSide,
  })
);
scene.add(marsPath);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: jupiterTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
jupiter.position.x = 0.95;

const jupiterPath = new THREE.Mesh(
  new THREE.RingGeometry(0.949, 0.951, 99),
  new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  })
);
scene.add(jupiterPath);

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(0.03, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: staurnTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
saturn.position.x = 1.15;

const saturnPath = new THREE.Mesh(
  new THREE.RingGeometry(1.149, 1.151, 99),
  new THREE.MeshBasicMaterial({
    color: "#cccccc",
    side: THREE.DoubleSide,
  })
);
scene.add(saturnPath);

const staurnRingGeometry = new THREE.RingGeometry(0.031, 0.04, 99);
var uvs = staurnRingGeometry.attributes.uv.array;
var phiSegments = staurnRingGeometry.parameters.phiSegments || 0;
var thetaSegments = staurnRingGeometry.parameters.thetaSegments || 0;
phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1;
thetaSegments = thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
for (var c = 0, j = 0; j <= phiSegments; j++) {
  for (var i = 0; i <= thetaSegments; i++) {
    (uvs[c++] = i / thetaSegments), (uvs[c++] = j / phiSegments);
  }
}
// const staurnRingGeometry = new THREE.RingBufferGeometry(3, 5, 64);
// var pos = staurnRingGeometry.attributes.position;
// var v3 = new THREE.Vector3();
// for (let i = 0; i < pos.count; i++) {
//   v3.fromBufferAttribute(pos, i);
//   staurnRingGeometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
// }
const saturnRing = new THREE.Mesh(
  staurnRingGeometry,
  new THREE.MeshPhysicalMaterial({
    map: saturnTexture,
    color: "#cccccc",
    side: THREE.DoubleSide,
  })
);

saturnRing.position.x = 1.15;
saturnRing.rotation.y = -Math.PI / 2;

scene.add(saturnRing);

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(0.03, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: uranusTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
uranus.position.x = 1.35;

const uranusPath = new THREE.Mesh(
  new THREE.RingGeometry(1.349, 1.351, 99),
  new THREE.MeshBasicMaterial({
    color: "powderBlue",
    side: THREE.DoubleSide,
  })
);
scene.add(uranusPath);

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(0.035, 64, 64),
  new THREE.MeshPhysicalMaterial({
    map: neptuneTexture,
    metalness: 0,
    roughness: 1,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  })
);
neptune.position.x = 1.45;

const neptunePath = new THREE.Mesh(
  new THREE.RingGeometry(1.449, 1.451, 99),
  new THREE.MeshBasicMaterial({
    color: "slateBlue",
    side: THREE.DoubleSide,
  })
);
scene.add(neptunePath);

scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

const pointLight = new THREE.PointLight(0xffffff, 2);
// pointLight.position.x = 0;
// pointLight.position.y = 0;
// pointLight.position.z = 0;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  console.log("elapsedTime", elapsedTime);

  const factor = elapsedTime / 50;

  mercury.position.y = 0.45 * Math.sin(factor * 1.5);
  mercury.position.x = 0.45 * Math.cos(factor * 1.5);

  venus.position.y = 0.55 * Math.sin(Math.PI - factor * 0.7);
  venus.position.x = 0.55 * Math.cos(Math.PI - factor * 0.7);

  earth.position.y = 0.65 * Math.sin(factor);
  earth.position.x = 0.65 * Math.cos(factor);

  mars.position.y = 0.75 * Math.sin(factor * 1.2);
  mars.position.x = 0.75 * Math.cos(factor * 1.2);

  jupiter.position.y = 0.95 * Math.sin(factor / 2);
  jupiter.position.x = 0.95 * Math.cos(factor / 2);

  saturn.position.y = 1.15 * Math.sin(factor / 1.8);
  saturn.position.x = 1.15 * Math.cos(factor / 1.8);

  saturnRing.position.y = 1.15 * Math.sin(factor / 1.8);
  saturnRing.position.x = 1.15 * Math.cos(factor / 1.8);

  uranus.position.y = 1.35 * Math.sin(Math.PI - factor / 1.6);
  uranus.position.x = 1.35 * Math.cos(Math.PI - factor / 1.6);
  neptune.position.y = 1.45 * Math.sin(factor / 1.6);
  neptune.position.x = 1.45 * Math.cos(factor / 1.6);

  mercury.rotation.y = -0.15 * elapsedTime;
  venus.rotation.y = 0.15 * elapsedTime;
  earth.rotation.y = -1 * elapsedTime;
  mars.rotation.y = -0.65 * elapsedTime;
  jupiter.rotation.y = -5 * elapsedTime;
  saturn.rotation.y = -4 * elapsedTime;
  saturnRing.rotation.z = -4 * elapsedTime;

  uranus.rotation.y = 1 * elapsedTime;
  neptune.rotation.y = -0.5 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
