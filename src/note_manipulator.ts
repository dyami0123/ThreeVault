import { Note } from './note';
import {getGeometriesByNoteName} from './note_rendering';
import * as THREE from 'three';

export class NoteManipulator {

    notes: Note[] = [];
    scene: THREE.Scene;

    constructor(notes: Note[], scene: THREE.Scene) {
        this.notes = notes;
        this.scene = scene;

    }

    rotateX( angle: number) {
        for (let note of this.notes) {
            note.rotation.x += angle;
            getGeometriesByNoteName(note, this.scene).forEach((geometry) => {
                geometry.rotateX(angle);
            });
        }
    }

    rotateY(angle: number) {
        for (let note of this.notes) {
            note.rotation.y += angle;
            getGeometriesByNoteName(note, this.scene).forEach((geometry) => {
                geometry.rotateY(angle);
            });
        }
    }

    rotateZ(angle: number) {
        for (let note of this.notes) {
            note.rotation.z += angle;
            getGeometriesByNoteName(note, this.scene).forEach((geometry) => {
                geometry.rotateZ(angle);
            });
        }
    }

    rotate3D(Vector3: THREE.Vector3) {
        this.rotateX(Vector3.x);
        this.rotateY(Vector3.y);
        this.rotateZ(Vector3.z);
    }

    scale(scale: number) {
        for (let note of this.notes) {
            note.scale *= scale;
            getGeometriesByNoteName(note, this.scene).forEach((geometry) => {
                geometry.scale(note.scale, note.scale, note.scale);
            });
        }
    }

    translate(note: Note, x: number, y: number, z: number) {
        note.coordinates.x += x;
        note.coordinates.y += y;
        note.coordinates.z += z;

        getGeometriesByNoteName(note, this.scene).forEach((geometry) => {
            geometry.translate(x, y, z);
        });
    }
}