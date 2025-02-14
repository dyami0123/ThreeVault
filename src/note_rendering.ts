import * as THREE from 'three';
import {Note} from "./note" 

export function addNoteToScene(note: Note, scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(8.5 / 10, 11 / 10, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xf1f11f });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = note.name;
    cube.position.set(note.coordinates.x, note.coordinates.y, note.coordinates.z);
    cube.rotation.set(note.rotation.x, note.rotation.y, note.rotation.z);
    cube.scale.set(note.scale, note.scale, note.scale);
    scene.add(cube);
}

export function getGeometriesByNoteName(note: Note, scene: THREE.Scene): THREE.BufferGeometry[] {
    const geometries: THREE.BufferGeometry[] = [];
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh && object.name === note.name) {
            geometries.push(object.geometry);
        }
    });
    return geometries;
}

// export function synchronizeNotePropertiesInScene(note: Note, scene: THREE.Scene) {
//     // synchronizeNotePosition(note, scene);
//     synchronizeNoteRotation(note, scene);
//     // synchronizeNoteScale(note, scene);
// }

// export function synchronizeNotePosition(note: Note, scene: THREE.Scene) {
//     var geometries = getGeometriesByNoteName(note, scene);
//     geometries.forEach((geometry) => {
//         geometry.position.set(note.coordinates.x, note.coordinates.y, note.coordinates.z);
//     });
// }

// export function synchronizeNoteRotation(note: Note, scene: THREE.Scene) {
//     var geometries = getGeometriesByNoteName(note, scene);
//     geometries.forEach((geometry: THREE.BufferGeometry | undefined) => {
//         if (geometry) {
//             geometry.rotation.set(note.rotation.x, note.rotation.y, note.rotation.z);
//         }
//     });
// }

// export function synchronizeNoteScale(note: Note, scene: THREE.Scene) {
//     var geometries = getGeometriesByNoteName(note, scene);
//     geometries.forEach((geometry) => {
//         geometry.scale.set(note.scale, note.scale, note.scale);
//     });
// }