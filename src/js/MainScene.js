import * as THREE from 'three';
import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { createPlane  } from './Components/createPlane';
import { createBoxWithGlowingEdges  } from './Components/createBoxWithGlowingEdges';
import { ShelfOne } from './Components/ShelfOne';

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

const { plane } = createPlane(200, 100); // For a 20x10 meters floor
scene.add(plane);

const { cube : cube1 } = createBoxWithGlowingEdges(); 
scene.add(cube1);
positionBoxInRoom(cube1, 20, 10, 3, 5);
const { cube : cube2 } = createBoxWithGlowingEdges(); 
scene.add(cube2);
positionBoxInRoom(cube2, 40, 20, 3, 5);

const shelf01 = new ShelfOne(5, 10, 0.1, 1.5, 10, 100, 0.2);
scene.add(shelf01.getObject3D());
const shelf02 = new ShelfOne(5, 10, 0.1, 1.5, 10, 100, 0.2);
shelf02.setPosition(-10, 0, 0); // Now this should work
scene.add(shelf02.getObject3D());


function animate() {
    requestAnimationFrame(animate);
    orbit.update(); // Required if controls.enableDamping or controls.autoRotate are set to true
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;
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
