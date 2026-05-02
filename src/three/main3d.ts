import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';
import { setThreeState } from './threeState';
import './styles3d.css';

const mount = document.querySelector<HTMLDivElement>('#three-game');
if (!mount) {
  throw new Error('Missing #three-game mount');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fc7df);
scene.fog = new THREE.Fog(0x9fc7df, 34, 86);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
mount.appendChild(renderer.domElement);

const camera = new THREE.OrthographicCamera(-18, 18, 10.2, -10.2, 0.1, 180);
camera.position.set(0, 9.5, 32);
camera.lookAt(0, 1.8, 0);
scene.add(camera);

const hemi = new THREE.HemisphereLight(0xddefff, 0x32543b, 1.8);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff2d2, 3.8);
sun.position.set(-12, 22, 18);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -36;
sun.shadow.camera.right = 36;
sun.shadow.camera.top = 24;
sun.shadow.camera.bottom = -14;
scene.add(sun);

const materials = {
  dirt: new THREE.MeshStandardMaterial({ color: 0x7b5735, roughness: 0.92, metalness: 0.02 }),
  grass: new THREE.MeshStandardMaterial({ color: 0x3d8a4f, roughness: 0.82 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x8a6038, roughness: 0.72 }),
  bark: new THREE.MeshStandardMaterial({ color: 0x5b3926, roughness: 0.9 }),
  leafDark: new THREE.MeshStandardMaterial({ color: 0x1f6b44, roughness: 0.86 }),
  leafLight: new THREE.MeshStandardMaterial({ color: 0x3f9b61, roughness: 0.82 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x222833, roughness: 0.42, metalness: 0.45 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.84 }),
  yellow: new THREE.MeshStandardMaterial({ color: 0xf6c431, roughness: 0.5, metalness: 0.12 }),
  red: new THREE.MeshStandardMaterial({ color: 0xdb3f35, roughness: 0.58 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x2864b7, roughness: 0.55 }),
  skin: new THREE.MeshStandardMaterial({ color: 0xf2c38b, roughness: 0.62 }),
  coin: new THREE.MeshStandardMaterial({ color: 0xffcc33, roughness: 0.3, metalness: 0.45 }),
};

function addMesh<T extends THREE.Mesh>(mesh: T): T {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function box(name: string, size: [number, number, number], pos: [number, number, number], mat: THREE.Material, rotZ = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.rotation.z = rotZ;
  return addMesh(mesh);
}

function cylinder(
  name: string,
  radius: number,
  depth: number,
  pos: [number, number, number],
  mat: THREE.Material,
  rot: [number, number, number] = [0, 0, 0],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 32), mat);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  return addMesh(mesh);
}

box('distant-ground', [92, 2.4, 18], [0, -2.4, -5], materials.grass);
box('near-soil', [92, 4.2, 14], [0, -5.6, 0], materials.dirt);

const trackSegments = [
  [-16, -0.3, 0, 14, 0.55, 3.2, -0.02],
  [-7.2, 0.6, 0, 7.6, 0.55, 3.2, 0.34],
  [0.7, 1.3, 0, 8.6, 0.55, 3.2, -0.08],
  [9.2, 2.1, 0, 8.2, 0.55, 3.2, 0.28],
  [17.3, 2.9, 0, 8.4, 0.55, 3.2, -0.04],
] as const;

trackSegments.forEach(([x, y, z, width, height, depth, rot], index) => {
  box(`wood-track-${index}`, [width, height, depth], [x, y, z], materials.wood, rot);
  box(`dark-track-side-${index}`, [width, 0.28, depth + 0.16], [x, y - 0.42, z], materials.dirt, rot);
});

function addTree(x: number, z: number, scale: number): void {
  cylinder('tree-trunk', 0.32 * scale, 3.8 * scale, [x, -0.8 + scale, z], materials.bark);
  const crownA = new THREE.Mesh(new THREE.DodecahedronGeometry(1.25 * scale, 0), materials.leafDark);
  crownA.position.set(x - 0.4 * scale, 2.4 * scale, z);
  addMesh(crownA);
  const crownB = new THREE.Mesh(new THREE.DodecahedronGeometry(1.45 * scale, 0), materials.leafLight);
  crownB.position.set(x + 0.35 * scale, 2.9 * scale, z - 0.25);
  addMesh(crownB);
}

for (let i = 0; i < 16; i += 1) {
  addTree(-25 + i * 3.6, -6.8 - (i % 3) * 1.4, 0.75 + (i % 4) * 0.08);
}

for (let i = 0; i < 9; i += 1) {
  cylinder('coin', 0.35, 0.12, [-10 + i * 3.2, 2.5 + Math.sin(i * 0.8) * 1.4, 0.25], materials.coin, [Math.PI / 2, 0, 0]);
}

box('bike-chassis', [2.55, 0.38, 0.7], [-14.5, 1.0, 0.15], materials.yellow, -0.08);
cylinder('rear-wheel', 0.55, 0.42, [-15.55, 0.55, 0.18], materials.rubber, [Math.PI / 2, 0, 0]);
cylinder('front-wheel', 0.55, 0.42, [-13.3, 0.72, 0.18], materials.rubber, [Math.PI / 2, 0, 0]);
cylinder('rear-rim', 0.32, 0.46, [-15.55, 0.55, 0.18], materials.metal, [Math.PI / 2, 0, 0]);
cylinder('front-rim', 0.32, 0.46, [-13.3, 0.72, 0.18], materials.metal, [Math.PI / 2, 0, 0]);
box('front-fork', [0.12, 1.22, 0.16], [-13.55, 1.25, 0.2], materials.metal, -0.32);
box('seat', [0.95, 0.2, 0.55], [-14.75, 1.42, 0.15], materials.red, -0.08);
box('rider-body', [0.42, 1.02, 0.34], [-14.35, 2.02, 0.14], materials.blue, -0.22);
cylinder('rider-head', 0.32, 0.34, [-14.05, 2.75, 0.14], materials.skin, [Math.PI / 2, 0, 0]);

box('finish-post', [0.18, 3.1, 0.18], [21.7, 2.7, 0], materials.metal);
box('finish-flag', [1.1, 0.7, 0.08], [22.25, 4.1, 0], materials.red);

const rapierReady = await RAPIER.init().then(() => true);
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
world.step();

let frame = 0;
function animate(): void {
  frame += 1;
  const pulse = Math.sin(frame * 0.018) * 0.08;
  camera.position.x = pulse;
  camera.lookAt(pulse, 1.75, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize(): void {
  const aspect = window.innerWidth / window.innerHeight;
  const viewHeight = 20.4;
  camera.top = viewHeight / 2;
  camera.bottom = -viewHeight / 2;
  camera.left = (-viewHeight * aspect) / 2;
  camera.right = (viewHeight * aspect) / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resize);
resize();
setThreeState({ ready: rapierReady, meshCount: scene.children.length, camera: 'orthographic-side' });
animate();
