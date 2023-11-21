import * as THREE from 'three';

export function createBox() {
    // Box geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Material with transparency
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00,
        transparent: true,
        opacity: 0.4
    });

    // Creating the main cube
    const cube = new THREE.Mesh(geometry, material);

    // Glow effect
    const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00,
        transparent: true,
        opacity: 0.6,
        side: THREE.BackSide
    });

    // Slightly larger geometry for the glow
    const glowGeometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    cube.add(glowMesh); // Adding the glow mesh as a child of the cube

    return cube;
}