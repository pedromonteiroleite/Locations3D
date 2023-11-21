import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { createRoom  } from './Components/Room';
import { createBoxWithGlowingEdges  } from './Components/createBoxWithGlowingEdges';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const gui = new dat.GUI();

const room = createRoom(20, 10, 3); // Length, Width, Height in meters
scene.add(room);
const cube = createBoxWithGlowingEdges();
scene.add(cube);
positionBoxInRoom(cube, 20, 10, 3, 5); // Position the box 5m from the left wall

// Define the properties you want to control
const cubeProperties = {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    // Add other properties you want to control
};

// Add GUI controls
gui.add(cubeProperties, 'rotationX', 0, Math.PI * 2);
gui.add(cubeProperties, 'rotationY', 0, Math.PI * 2);
gui.add(cubeProperties, 'rotationZ', 0, Math.PI * 2);

// Add OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
orbit.update();

// Add AxesHelper
const axesHelper = new THREE.AxesHelper(5); // The size of the axes
scene.add(axesHelper);

// Optional: Add GridHelper
const gridHelper = new THREE.GridHelper(10, 10); // Size and divisions
scene.add(gridHelper);


function animate() {
    requestAnimationFrame(animate);
    orbit.update(); // Required if controls.enableDamping or controls.autoRotate are set to true

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // Update properties
    //cube.rotation.x = cubeProperties.rotationX;
    //cube.rotation.y = cubeProperties.rotationY;
    //cube.rotation.z = cubeProperties.rotationZ;



    renderer.render(scene, camera);
}

animate();

function positionBoxInRoom(box, roomLength, roomWidth, roomHeight, distanceFromLeftWall) {
    // Position the box at the desired distance from the left wall
    box.position.x = -roomLength / 2 + distanceFromLeftWall;
    // Adjust the y position based on the box's height
    box.position.y = box.geometry.parameters.height / 2;
    // Center the box along the width of the room
    box.position.z = 0;
}
