import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { createPlane  } from './Components/createPlane';
import { createBoxWithGlowingEdges  } from './Components/createBoxWithGlowingEdges';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
orbit.update();

// Add AxesHelper
const axesHelper = new THREE.AxesHelper(5); // The size of the axes
scene.add(axesHelper);

// Optional: Add GridHelper
//const gridHelper = new THREE.GridHelper(10, 10); // Size and divisions
//scene.add(gridHelper);

const { plane } = createPlane(20, 10); // For a 20x10 meters floor
scene.add(plane);

const { cube } = createBoxWithGlowingEdges(); 
scene.add(cube);
positionBoxInRoom(cube, 20, 10, 3, 5);

function animate() {
    requestAnimationFrame(animate);
    orbit.update(); // Required if controls.enableDamping or controls.autoRotate are set to true
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

function positionBoxInRoom(box, roomLength, roomWidth, roomHeight, distanceFromLeftWall) {
    // Position the box at the desired distance from the left wall
    box.position.x = -roomLength / 2 + distanceFromLeftWall;
    // Adjust the y position based on the box's height
    box.position.y = box.geometry.parameters.height * 5;
    // Center the box along the width of the room
    box.position.z = 0;
}
