
import * as THREE from "three";

import { GLTFLoader } from "https://unpkg.com/three@0.143.0/examples/jsm/loaders/GLTFLoader.js";

import { scene, gui, debugObject, morphArr } from "./script.js";


// no loading Mangaer for GLTF loader;
//https://discourse.threejs.org/t/gltf-file-loaded-twice-when-loading-is-initiated-in-loadingmanager-inside-onprogress-callback/27799
const gltfLoader = new GLTFLoader();


const group_Box = new THREE.Group();
group_Box.name = "Text Group"


export function loadGLTF() {

    console.log('loading gltf')

  
    const url = './18_landing/media/LynchByte_Cinzel.glb';

    const textPosition = new THREE.Vector3(0, 1, 0);
    const textScale = new THREE.Vector3(1.5, 1.5, 1.5);
    const textRotation = new THREE.Euler((90 * Math.PI / 180), (0 * Math.PI / 180), (0 * Math.PI / 180));

    const textName = "Text Model";

    const material_st = new THREE.MeshStandardMaterial({
        
        color: 0xad6565,
    
    })


    gltfLoader.load(url, gltf => onLoad(gltf, textScale, textName),
        onProgress, onError
    );


    const onLoad = (gltf, scale, name) => {

        // const model = gltf.scene.children[0];
        const model = gltf.scene

        console.log(`model,`, model,);

        model.scale.copy(scale);

        // assign materials
        model.traverse(function (o) {
            if (o.isMesh) {

                o.material = material_st;
                o.castShadow = true;
                o.receiveShadow = true;
          
            }
        });

    

        model.name = name;

        console.log(model)

        group_Box.add(model);

        morphArr.push(model)

    };

    scene.add(group_Box);
    group_Box.position.copy(textPosition);
    group_Box.setRotationFromEuler(textRotation);

    scene.add(group_Box);
  

}

const onProgress = (z) => { console.log(`${z.loaded / z.total * 100}%`); };
const onError = (errorMessage) => { console.log(errorMessage); };

