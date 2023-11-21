import * as THREE from 'three';

export function createPlane(length, width) 
{
    console.log(`createPlane(${length}, ${width})`);
    const geometry = new THREE.PlaneGeometry(length, width, length, width);
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: true } );
    const plane = new THREE.Mesh(geometry, material);
    // Position the floor (optional, depending on your scene setup)
    plane.rotation.x = -Math.PI / 2; // Rotate to lie flat
    return { plane };
}