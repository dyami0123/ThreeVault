import * as THREE from 'three';
import {Note} from "./note" 
import { marked } from 'marked';

function createTextTextureFromMarkdown(mdContent: string): THREE.Texture {
    const htmlContent = marked(mdContent);  // Convert Markdown to HTML

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 1024;
    canvas.height = 1024;

    // Create a temporary container to render HTML
    const tempDiv = document.createElement('div');
    // ignore async case
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    // Set styles for the text
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '36px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'left';
    context.textBaseline = 'top';

    // Loop through lines manually for line breaks
    const lines = tempDiv.innerText.split('\n');
    let y = 20;
    for (const line of lines) {
        context.fillText(line, 20, y);
        y += 50;  // Adjust line height
    }

    document.body.removeChild(tempDiv);

    return new THREE.CanvasTexture(canvas);
}

export function addNoteToScene(note: Note, scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(8.5 / 10, 11 / 10, 0.1);

    // Create a material with the text texture

    const textTexture = createTextTextureFromMarkdown(note.content || 'No Content');
    const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
    const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xf1f11f });

    const materials = [
        defaultMaterial, // Right
        defaultMaterial, // Left
        defaultMaterial, // Top
        defaultMaterial, // Bottom
        textMaterial,    // Front (with text)
        defaultMaterial  // Back
    ];

    const cube = new THREE.Mesh(geometry, materials);
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