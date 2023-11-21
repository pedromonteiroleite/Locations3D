import * as THREE from 'three';

export function createBoxWithGlowingEdges() {
    console.log(`createBoxWithGlowingEdges()`);
    // Box geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4 });
    const cube = new THREE.Mesh(geometry, material);

    // Edge geometry
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 }); // Bright color for glow effect
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    cube.add(edges);

    return { cube };
}