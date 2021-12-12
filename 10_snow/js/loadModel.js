import * as THREE from 'https://unpkg.com/three@0.133.1/build/three.module.js';
import { scene, boxSnowArray, globeGroup } from './script.js';
import { GLTFLoader } from './R133/GLTFLoader.js'

const gltfLoader = new GLTFLoader();

const textureLoader = new THREE.TextureLoader();

export function makeBase() {

    //base lathe
    const points = [];
    points.push(new THREE.Vector2(0.4, 0));
    points.push(new THREE.Vector2(0.4, 0.08));
    points.push(new THREE.Vector2(0.35, 0.08));
    points.push(new THREE.Vector2(0.35, 0.12));
    points.push(new THREE.Vector2(0.375, 0.12));
    points.push(new THREE.Vector2(0.375, 0.18));

    const geometryL = new THREE.LatheGeometry(points);
    const materialL = new THREE.MeshLambertMaterial({ color: 0x4d2600 });
    const lathe = new THREE.Mesh(geometryL, materialL);
    lathe.castShadow = true;
    lathe.receiveShadow = true;
    globeGroup.add(lathe);

    const baseCyG = new THREE.CylinderGeometry(0.4, 0.4, 0.0002, 32);
    const baseCy = new THREE.Mesh(baseCyG, materialL);
    globeGroup.add(baseCy);

    const topCyG = new THREE.CylinderGeometry(0.375, 0.375, 0.0002, 32);
    const topCy = new THREE.Mesh(topCyG, materialL);
    topCy.position.set(0, 0.18, 0);
    globeGroup.add(topCy);

    //sphere
    const geometryS = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, 2.4);
    const materialS = new THREE.MeshPhysicalMaterial({
        // metalness: 0,  
        //roughness: 0.9,
        roughness: 0,
        transmission: 1,
        thickness: 0.5,
    });

    const sphere = new THREE.Mesh(geometryS, materialS);
    sphere.position.set(0, 0.55, 0);
    globeGroup.add(sphere);


    //Load Tree
    const gltfLoader = new GLTFLoader();

    const onLoad = (gltf, position, scale, rotation, modelName) => {

        console.log(`GLTF`, gltf);

        const model = gltf.scenes[0].children[0];

        model.position.copy(position);
        model.scale.copy(scale);
        model.setRotationFromEuler(rotation);
        model.name = modelName

        model.traverse(function (o) {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

       globeGroup.add(model);

    };

    const onProgress = (z) => { console.log(`${z.loaded / z.total * 100}%`); };
    const onError = (errorMessage) => { console.log(errorMessage); };

    const treePosition = new THREE.Vector3(0, 0.3, 0);
    const treeScale = new THREE.Vector3(0.04, 0.04, 0.04);
    const treeRotation = new THREE.Euler((-90 * Math.PI / 180), (0 * Math.PI / 180), (90 * Math.PI / 180))
    const treeName = "Tree"

    gltfLoader.load('./media/Tree/scene.gltf', gltf => onLoad(
        gltf, treePosition, treeScale, treeRotation, treeName
    ), onProgress, onError);


    //star shape
    for (let i = 0; i < 150; i++) {


        const pts2 = [], numPts = 5;

        for (let i = 0; i < numPts * 2; i++) {

            const l = i % 2 == 1 ? 10 : 20;

            const a = i / numPts * Math.PI;

            pts2.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));

        }

        const shp = new THREE.Shape(pts2);
        const gS = new THREE.ShapeGeometry(shp);
        gS.scale(0.001, 0.001, 0.001);

        const object = new THREE.Mesh(gS, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        object.position.x = Math.random() * 0.4 - 0.2;
       // object.position.y = Math.random() * 4;
        object.position.y = 0.2;
        object.position.z = Math.random() * 0.4 - 0.2;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        object.userData.velocity = new THREE.Vector3();
        object.userData.velocity.x = Math.random() * 0.0025//Math.random() * 0.01 - 0.005;
        object.userData.velocity.y = Math.random() * 0.0025//Math.random() * 0.01 - 0.005;
        object.userData.velocity.z = Math.random()  * 0.0025//Math.random() * 0.01 - 0.005;

        boxSnowArray.push(object);

        globeGroup.add(object);

    }

    globeGroup.scale.set(0.3, 0.3, 0.3);
    globeGroup.visible = false;
    globeGroup.name = `Globe`;

    scene.add(globeGroup);
    console.log(`globe Group; `, globeGroup);


}

export function makeLanding() {

    const landTexture = textureLoader.load('media/landing.webp');
    const landGeo = new THREE.PlaneGeometry(1, 1, 32, 32);
    const landMat = new THREE.MeshLambertMaterial({ map: landTexture });
    const landMesh = new THREE.Mesh(landGeo, landMat);
    landMesh.position.set(0, 0, 1);
    landMesh.name = `Landing Plane`;
    scene.add(landMesh)

}


export function makeInstruct() {

    const instructTexture = textureLoader.load('media/instruct.webp');
    const instructGeo = new THREE.PlaneGeometry(1, 1, 32, 32);
    const instructMat = new THREE.MeshLambertMaterial({ map: instructTexture });
    const instructMesh = new THREE.Mesh(instructGeo, instructMat);
    instructMesh.position.set(0, 0, 1);
    instructMesh.name = `Instruct Plane`;
    scene.add(instructMesh)


}
