/**
 * @author Shauna Lynch <lynchbyte.com.au>
  * and
 * halloween model;
 * https://sketchfab.com/3d-models/hh-a12f747dbcbe4e43879ef24ea48f10b0 (modified)
 * https://sketchfab.com/3d-models/bat-8719886cf8f645ca9d53d766976baf9c
 */

import { scene, main, mixers, batAnim } from '../hh01.js';

import { GLTFLoader } from '../../js/GLTFLoader.mjs';

export function loadModels() {

    const loader = new GLTFLoader();

    const onLoad = (gltf, position, scale, rotation, name) => {

        const model = gltf.scene.children[0];
        model.position.copy(position);
        model.scale.copy(scale);
        model.setRotationFromEuler(rotation);
        model.name = name;

        if (name == "cat") {

            main.add(model);

            const obMoon = scene.getObjectByName("moon");
            obMoon.visible = false;
            const obGr = scene.getObjectByName("ground");
            obGr.visible = false;

        }

        if (name == "bat3D") {

            let mixer = new THREE.AnimationMixer(gltf.scene);

            const clips = gltf.animations;

            const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction");

            if (clip) {

                const action = mixer.clipAction(clip);
                // action.setLoop(THREE.LoopPingPong);
                action.timeScale = 0.4;
                action.play();

            }

            scene.add(gltf.scene);
            batAnim.push(gltf.scene);


            mixers.push(mixer);
            return mixer;

        }
    }

    const onProgress = (z) => { console.log(`${z.loaded / z.total * 100}%`); };

    const onErr = (errorMessage) => { console.log(errorMessage); };


    //cat
    const catPosition = new THREE.Vector3(0, 0, 0);
    const catScale = new THREE.Vector3(1, 1, 1);
    const catRotation = new THREE.Euler((-90 * Math.PI / 180), (0 * Math.PI / 180), (0 * Math.PI / 180));
    const catName = "cat";

    loader.load('06_media/cat/scene.gltf', gltf => onLoad(gltf,
        catPosition, catScale, catRotation, catName
    ),
        onProgress, onErr
    );

    //bat
    const batPosition = new THREE.Vector3(1.5, 1.5, -5);
    const batScale = new THREE.Vector3(0.05, 0.05, 0.05);
    const batRotation = new THREE.Euler((-90 * Math.PI / 180), (0 * Math.PI / 180), (90 * Math.PI / 180))
    const batName = "bat3D";

    loader.load('06_media/bat/scene.gltf', gltf => onLoad(gltf,
        batPosition, batScale, batRotation, batName
    ),
        onProgress, onErr
    );




}





