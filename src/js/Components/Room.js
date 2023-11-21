import * as THREE from 'three';

export function createRoom(length, width, height) {
    const geometry = new THREE.BoxGeometry(length, width, height);
    const roomMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        side: THREE.BackSide // Rendering the inside of the room
    });
    const room = new THREE.Mesh(geometry, roomMaterial);

    // Edge geometry
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 }); // Bright color for glow effect
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    room.add(edges);

    // Position the room so that its base is on the ground
    room.position.y = 0;

    return room;
}
