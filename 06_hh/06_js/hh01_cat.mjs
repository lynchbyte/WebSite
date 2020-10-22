/**
 * @author Shauna Lynch <lynchbyte.com.au>
 * and
 * loader script;
 * https://discoverthreejs.com/book/first-steps/load-models/ (modified)
 * and
 * halloween model;
 * https://sketchfab.com/3d-models/hh-a12f747dbcbe4e43879ef24ea48f10b0 (modified)
 */

import { scene, mixers, main, mvDw} from '../hh01.js';

import { GLTFLoader } from '../../js/GLTFLoader.mjs';


export function loadModels() {

    const loader = new GLTFLoader();

    const onLoad = (gltf, position, scale, rotation) => {

        const model = gltf.scene.children[0];
        model.position.copy(position);
        model.scale.copy(scale);
        model.setRotationFromEuler(rotation);
        model.name = 'gf';

        model.traverse(function (o) {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        // const animation = gltf.animations[0];

        // const mixer = new THREE.AnimationMixer(model);
        // mixers.push(mixer);

        // const action = mixer.clipAction(animation);
        // if (pingPong === true) {
        //     action.setLoop(THREE.LoopPingPong);
        // }
        // action.play();
        // action.timeScale = ts;

       // scene.add(model);
        main.add(model);
       // const mod = gltf.scene;
       // mod.name = "gltf";
       // mvDw.push(mod);

       var ob = scene.getObjectByName("moon");
       ob.visible = false;

    };

    const onProgress = (z) => { console.log(`${z.loaded / z.total * 100}%`); };

    const onError = (errorMessage) => { console.log(errorMessage); };

  
    const catPosition = new THREE.Vector3(0,0,0);
    const catScale = new THREE.Vector3(1,1,1);
    const catRotation = new THREE.Euler((-90 * Math.PI / 180),(0 * Math.PI / 180),(0 * Math.PI / 180))
    const catPlaySpeed = 0.4;
    const catPingPong = true;
    const catName = "cat"

    loader.load('06_media/cat/scene.gltf', gltf => onLoad(gltf,
        catPosition, catScale, catRotation,
        catPlaySpeed, catPingPong, catName
    ), onProgress, onError);






}
