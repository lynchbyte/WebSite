/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */

import { Mesh } from '../js/three.module.js';
import { GLTFLoader } from './../js/GLTFLoader.mjs';

class modNew extends Mesh {
    constructor(geometry, material, path, glbFile,
        modelRotX, modelRotY, modelRotZ,
        modelPosX, modelPosY, modelPosZ,
        modelScale, name) {

        super(geometry, material);

        this.geometry = geometry;
        this.material = material;

        this.path = path;
        this.glbFile = glbFile;

        this.modelRotX = modelRotX;
        this.modelRotY = modelRotY;
        this.modelRotZ = modelRotZ;
        this.modelPosX = modelPosX;
        this.modelPosY = modelPosY;
        this.modelPosZ = modelPosZ;
        this.modelScale = modelScale;
        this.name = name;

        const gltfLoader = new GLTFLoader();

        const Mesh = new THREE.Mesh(this.geometry, this.material);
        Mesh.name = 'Dummy';
        //TO DO
        //Mesh not visible

        gltfLoader.load(path+glbFile, (gltf) => {
            const root = gltf.scene;
            root.traverse( function( node ) {

                if ( node instanceof THREE.Mesh ) { node.castShadow = true; }
                if ( node instanceof THREE.Mesh ) { node.recieveShadow = true; }
        
            } );

            root.rotation.set(modelRotX, modelRotY, modelRotZ);
            root.position.set(modelPosX, modelPosY, modelPosZ);
            root.scale.set(modelScale, modelScale, modelScale);
            root.name = name;

            Mesh.add(root);
     
        });

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Scene
        // gltf.scenes; // Array<THREE.Scene>
        // gltf.cameras; // Array<THREE.Camera>
        // gltf.asset; // Object

        return Mesh;

    }

}

export { modNew };

