import * as THREE from 'three';
import { SimpleNote } from './note';
import { addNoteToScene } from './note_rendering';
import { InitializeScene } from './initialize_scene';
import { NoteManipulator } from './note_manipulator';
import { Pane } from 'tweakpane';


const { scene, camera, renderer } = InitializeScene();

var note = SimpleNote.new('note1');
addNoteToScene(note, scene);


class rotationState {
    xMultiplier: number;
    yMultiplier: number;
    zMultiplier: number;

    constructor() {
        this.xMultiplier = 0;
        this.yMultiplier = 0;
        this.zMultiplier = 0;
    }

    reset() {
        this.xMultiplier = 0;
        this.yMultiplier = 0;
        this.zMultiplier = 0;
    }

    setRandom() {
        this.xMultiplier = Math.random() * 2 - 1;
        this.yMultiplier = Math.random() * 2 - 1;
        this.zMultiplier = Math.random() * 2 - 1;
    }
}

var rotationStateInstance = new rotationState();


// Upper-right pane
const upperRightPane = new Pane({ title: 'Controls' });
upperRightPane.element.style.position = 'absolute';
upperRightPane.element.style.top = '10px';
upperRightPane.element.style.right = '10px';

// Rotation folder
const rotationFolder = upperRightPane.addFolder({ title: 'Rotation' });
rotationFolder.addBinding(rotationStateInstance, 'xMultiplier', { min: -1, max: 1 })
  .on('change', (ev) => {
    rotationStateInstance.xMultiplier = ev.value;
  });
rotationFolder.addBinding(rotationStateInstance, 'yMultiplier', { min: -1, max: 1 })
    .on('change', (ev) => {
        rotationStateInstance.yMultiplier = ev.value;
    });
rotationFolder.addBinding(rotationStateInstance, 'zMultiplier', { min: -1, max: 1 })
    .on('change', (ev) => {
        rotationStateInstance.zMultiplier = ev.value
    });


import { Raycaster, Vector2 } from 'three';

const raycaster = new Raycaster();
const mouse = new Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        var firstIntersectedObject = intersects[0].object;
        console.log(firstIntersectedObject.name);
        rotationStateInstance.setRandom();
        upperRightPane.refresh();

    }
});


const noteManipulator = new NoteManipulator(
    [
        note
    ],
    scene
);

function animate() {
    requestAnimationFrame(animate);

    // rotate
    noteManipulator.rotateX(0.01 * rotationStateInstance.xMultiplier);
    noteManipulator.rotateY(0.01 * rotationStateInstance.yMultiplier);
    noteManipulator.rotateZ(0.001 * rotationStateInstance.zMultiplier);

    renderer.render(scene, camera);


}

animate();
