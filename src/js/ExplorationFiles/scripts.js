import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    0.1,
    1000);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
orbit.update();

const gridHelper = new THREE.GridHelper(20, 2);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry( 10, 10, 10 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );

function animate(time){
    //box.rotation.x = time / 1000;
    //box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);