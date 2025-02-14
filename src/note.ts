import { Vector3 } from "three";

// # create note structure

export interface Note {
    name: string;

    coordinates: Vector3;
    rotation: Vector3;
    scale: number;

    content?: string;
}

export class SimpleNote implements Note {
    name: string;

    coordinates: Vector3;
    rotation: Vector3;
    scale: number;

    content?: string;

    constructor(name: string, coordinates: Vector3, rotation: Vector3, scale: number, content?: string) {
        this.name = name;
        this.coordinates = coordinates;
        this.rotation = rotation;
        this.scale = scale;

        this.content = content;
    }

    static new(name: string) {

        const coordinates = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);
        const scale = 1;

        const content = `
        # Hello World

        This is a note.

        :)

        `;

        return new SimpleNote(name, coordinates, rotation, scale, content);
    }
}