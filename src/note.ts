import { Vector3 } from "three";

// # create note structure

export interface Note {
    name: string;

    coordinates: Vector3;
    rotation: Vector3;
    scale: number;
}

export class SimpleNote implements Note {
    name: string;

    coordinates: Vector3;
    rotation: Vector3;
    scale: number;

    constructor(name: string, coordinates: Vector3, rotation: Vector3, scale: number) {
        this.name = name;
        this.coordinates = coordinates;
        this.rotation = rotation;
        this.scale = scale;
    }

    static new(name: string) {

        const coordinates = new Vector3(0, 0, 0);
        const rotation = new Vector3(0, 0, 0);
        const scale = 1;

        return new SimpleNote(name, coordinates, rotation, scale);
    }
}