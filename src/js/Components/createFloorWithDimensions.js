import * as THREE from 'three';

export function createFloorWithDimensions(length, width) {
    // Create the floor geometry
    const floorGeometry = new THREE.PlaneGeometry(length, width);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    // Position the floor (optional, depending on your scene setup)
    floor.rotation.x = -Math.PI / 2; // Rotate to lie flat

    // Create a texture with dimensions
    const texture = createTextTexture(`${length}m x ${width}m`, { 
        fontSize: 40, 
        bgColor: 'rgba(0, 0, 0, 0)', 
        textColor: 'black' 
    });

    const textMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(length, width), textMaterial);
    textPlane.rotation.x = -Math.PI / 2;
    textPlane.position.y = 0.01; // Slightly above the floor to avoid z-fighting

    return { floor, textPlane };
}

function createTextTexture(text, options) {
    const { fontSize = 50, bgColor = 'rgba(0, 0, 0, 0)', textColor = 'black' } = options;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 1024;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = `${fontSize}px Arial`;
    context.fillStyle = textColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
}
