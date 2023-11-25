import * as THREE from 'three';

export class ShelfOne {
    constructor(shelveWidth, shelveLength, shelveHeight, verticalSpaceBetweenShelves, numberOfShelves, totalItemsWeightAShelveCanStore, distanceFromGroundOfFirstShelve) {
        this.shelveWidth = shelveWidth;
        this.shelveLength = shelveLength;
        this.shelveHeight = shelveHeight;
        this.verticalSpaceBetweenShelves = verticalSpaceBetweenShelves;
        this.numberOfShelves = numberOfShelves;
        this.totalItemsWeightAShelveCanStore = totalItemsWeightAShelveCanStore;
        this.distanceFromGroundOfFirstShelve = distanceFromGroundOfFirstShelve;
        this.shelf = this.createShelf();
    }

    createShelf() {
        const group = new THREE.Group();

        for (let i = 0; i < this.numberOfShelves; i++) {
            const geometry = new THREE.BoxGeometry(this.shelveWidth, this.shelveHeight, this.shelveLength);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x808080, // Grey color for shelves
                transparent: true,
                opacity: 0.5 // Adjust this value as needed, between 0 (fully transparent) and 1 (fully opaque)
            });
            
            const mesh = new THREE.Mesh(geometry, material);

            // Position each shelf
            const yPos = this.distanceFromGroundOfFirstShelve + i * (this.shelveHeight + this.verticalSpaceBetweenShelves); // Assuming vertical space between shelves is equal to shelveHeight
            mesh.position.set(0, yPos, 0);

            group.add(mesh);

        }

        return group;
    }

    setPosition(x, y, z) {
        this.shelf.position.set(x, y, z);
    }
    
    getObject3D() {
        return this.shelf;
    }


}

// Example usage
// const myShelf = new ShelfOne(5, 10, 1, 4, 100, 2);
// scene.add(myShelf.getObject3D());
