/**
 * @author Shauna Lynch <lynchbyte.com>
 **/

import * as THREE from 'https://unpkg.com/three@0.133.1/build/three.module.js';

import { ARButton } from './R133/ARButton.js';

import { makeBase, makeLanding, makeInstruct } from './loadModel.js';


const sound = new Howl({
    src: ['media/audio/o-christmas-tree.ogg'],
    volume: 0.25,
});

let controller;

let hitTestSource = null;
let hitTestSourceRequested = false;

//Clock
const clock = new THREE.Clock();
//let previousTime = 0;

// //Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene
export const scene = new THREE.Scene();

export const globeGroup = new THREE.Group;

export const boxSnowArray = [];

const shakeEvent = new Shake({ threshold: 5 });
shakeEvent.start();
if (!("ondevicemotion" in window)) { alert("Shaking Not Supported on this device"); }

//star movement
let still = true;
let clampHeight = 0.8//heightest y value
var friction = 0.001;

//Camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
camera.position.set(0, 0, 2);
scene.add(camera);

//Lights
const hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);//0.3 on start, 2.2 withtree
hemi.position.set(0.0, -1, 0);
scene.add(hemi);
hemi.name = `Hemi`;


const lightD = new THREE.DirectionalLight(0xfff0dd, 1.4);
lightD.position.set(2, 0, 1.5);
lightD.castShadow = true

lightD.shadow.mapSize.width = 1024
lightD.shadow.mapSize.height = 1024

lightD.shadow.camera.near = 1
lightD.shadow.camera.far = 6

lightD.shadow.camera.top = 2
lightD.shadow.camera.right = 2
lightD.shadow.camera.bottom = - 2
lightD.shadow.camera.left = - 2

scene.add(lightD);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

controller = renderer.xr.getController(0);
controller.addEventListener('select', onSelect);
scene.add(controller);

const reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2),
    new THREE.MeshBasicMaterial()
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;
reticle.name = `Reticle`;
scene.add(reticle);

makeLanding();
makeBase();

renderer.xr.addEventListener('sessionstart', onSesS);
renderer.xr.addEventListener('sessionend', onSesE);

window.addEventListener('resize', onWindowResize);

document.addEventListener('click', firstClick);

//shake time
window.addEventListener('shake', shaked);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

animate();

function onSesS(event) {

    console.log(`ar started`);

    //delete Instruct plane
    const object = scene.getObjectByName(`Instruct Plane`);
    scene.remove(object);

    const hl = scene.getObjectByName(`Hemi`);
    hl.intensity = 2.2;

}

function onSesE(event) {

    function stopShake() {
        shakeEvent.stop();
    }

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function firstClick() {

    //delete landing plane
    const object = scene.getObjectByName(`Landing Plane`);
    scene.remove(object);

    //add instruction plane
     makeInstruct();

    //AR Button
    document.body.appendChild(ARButton.createButton(renderer, {
        requiredFeatures: ['hit-test'],
        //  domOverlay: { root: document.body }
    }));

    //delete overlay
    document.getElementById("overlay").remove();

    //delete this event listener
    document.removeEventListener('click', firstClick);

}


function shaked() {

    console.log(`shaked...`);

    still = false;

    sound.play();

    window.removeEventListener("shaked")

    setTimeout(() => window.addEventListener('shake', shaked), 35000)

}

function onSelect() {

    if (reticle.visible) {

        const globe = scene.getObjectByName(`Globe`);
        const globeNext = globe.clone();

        globeNext.position.setFromMatrixPosition(reticle.matrix);
        globeNext.position.setFromMatrixPosition(reticle.matrix);
        globeNext.visible = true;

        scene.add(globeNext);

        const object = scene.getObjectByName(`Reticle`);
        scene.remove(object);

    }

}

function animate() {

    renderer.setAnimationLoop(render);

}


function render(timestamp, frame) {

    const deltaTime = clock.getDelta()

    //for hit test
    if (frame) {

        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {

            session.requestReferenceSpace('viewer').then(function (referenceSpace) {

                session.requestHitTestSource({ space: referenceSpace }).then(function (source) {

                    hitTestSource = source;

                });

            });

            session.addEventListener('end', function () {

                hitTestSourceRequested = false;
                hitTestSource = null;

            });

            hitTestSourceRequested = true;

        }

        if (hitTestSource) {

            const hitTestResults = frame.getHitTestResults(hitTestSource);

            if (hitTestResults.length) {

                const hit = hitTestResults[0];

                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

            } else {

                reticle.visible = false;

            }

        }

    }


    // Keep stars inside room
    clampHeight = clampHeight - 0.0001


    //if y value to low, reset stars to still
    if (clampHeight < 0.3) {
        //stop moving
        still = true;

        //settle stars on base
        for (let i = 0; i < boxSnowArray.length; i++) {
            const object = boxSnowArray[i];
            object.position.y = 0.2;
        }
    }

    if (still !== true) {

        for (let i = 0; i < boxSnowArray.length; i++) {

            const cube = boxSnowArray[i];

            let cuv = cube.userData.velocity.multiplyScalar(1 - (0.1 * deltaTime) * friction);  //normal speed

            //slow down stars
            friction += 0.000001

            cube.position.add(cuv);

            if (cube.position.x < - 0.2 || cube.position.x > 0.2) {

                cube.position.x = THREE.MathUtils.clamp(cube.position.x, - 0.2, 0.2);
                cuv.x = - cuv.x;

            }

            if (cube.position.y < 0.20 || cube.position.y > clampHeight) {

                cube.position.y = THREE.MathUtils.clamp(cube.position.y, 0, clampHeight);
                cuv.y = - cuv.y;

            }

            if (cube.position.z < - 0.2 || cube.position.z > 0.2) {

                cube.position.z = THREE.MathUtils.clamp(cube.position.z, - 0.2, 0.2);
                cuv.z = - cuv.z;

            }

            cube.rotation.x += cuv.x * 2 * deltaTime;
            cube.rotation.y += cuv.y * 2 * deltaTime;
            cube.rotation.z += cuv.z * 2 * deltaTime;

        }

    }

    renderer.render(scene, camera);

}







