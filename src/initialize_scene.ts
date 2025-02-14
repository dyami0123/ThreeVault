import * as THREE from 'three';


export function InitializeScene(): { scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer } {
    const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    return {
        scene,
        camera,
        renderer
    }
}