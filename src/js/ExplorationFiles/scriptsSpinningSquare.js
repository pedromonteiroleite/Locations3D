import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    0.1,
    1000);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(10, 10, 10);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//scene.add(plane);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


// BEGIN Arrow Helper
const dir = new THREE.Vector3( 1, 20, 20 );
//normalize the direction vector (convert to vector of length 1)
dir.normalize();

const origin = new THREE.Vector3( 3, 3, 3 );
const length = 1;
const hex = 0xffff00;

const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
scene.add( arrowHelper );

// END

function animate(time){
    //box.rotation.x = time / 1000;
    //box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



