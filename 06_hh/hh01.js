/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */

import * as THREE from '../../js/three.module.js';

import { XRSuppQry } from './06_js/hh01_buttonsXR.mjs';

import { OrbitControls } from '../../js/OrbitControls.mjs';

import { addLights, addFloor, addMoon, addSkyDome } from './06_js/hh01_basics.mjs';

import { loadModels } from './06_js/hh01_loadModels.mjs';

import { makeTextCentJus } from './06_js/hh01_makeTextCen.mjs';

import { addSparkle, addBat } from './06_js/hh01_particle.mjs';

window.THREE = THREE;

export const scene = new THREE.Scene();

export const main = new THREE.Group();

export const sparkle = [];

export const batAnim = [];

export const mvDw = [];

export const txtArr = [];

export let camera;

export let controller;

export const clickRoom = [];

const raycaster = new THREE.Raycaster();
const intersected = [];
export const tempMatrix = new THREE.Matrix4();

let container;
export let renderer;

export let mixer;
export const mixers = [];

const clock = new THREE.Clock();

const soundAmb = new Howl({ src: ['06_media/audio/PorchCat_MSG.ogg'], volume: 0.05, });
const soundClick = new Howl({ src: ['06_media/audio/LV-HTIS Beeps Simple 03.wav'], volume: 0.05, });


init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    const clrfg = new THREE.Color(0x15141f);//dark purple
    scene.fog = new THREE.Fog(clrfg, 10, 150);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1200);
    camera.position.set(0, 1.6, 1.5);

    scene.add(main);
    main.name = "main";
    main.position.set(0, 0, -5);
    mvDw.push(main);

    addLights();

    addFloor();

    addMoon();

    addSkyDome();

    //add 3D models
    loadModels();

    //add Particles
    addSparkle();
    addBat();

    makeTextCentJus('Happy', 'hhTxt1', 0.5, 0.07, 0xFFA500, -2, 4, -5, 0, 0, 0);
    makeTextCentJus('Halloween', 'hhTxt2', 0.5, 0.07, 0xFFA500, -2, 3.275, -5, 0, 0, 0);

    // soundAmb.play();


    const OrbControls = new OrbitControls(camera, container);
    OrbControls.target.set(0, 1.6, 0);
    OrbControls.update();

    renderer = new THREE.WebGLRenderer({ antialias: true });//
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    XRSuppQry();

    // controllers
    controller = renderer.xr.getController(0);
    controller.name = 'controller';
    scene.add(controller);

    // controllers helper
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, - 1)]);
    const line = new THREE.Line(geometry, material);
    line.name = 'line';
    line.scale.z = 5;
    controller.add(line.clone());

    //Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);
    document.addEventListener('click', () => {



    });



    console.log(scene);


}//finish init////////////////////////////////////////////////////////////////////////////////////////////

function onPlayLoop() {
    actions.runLeft.playLoop();
};


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}


function intersectObjects(controller) {

    // Do not highlight when already selected
    if (controller.userData.selected !== undefined) return;

    const line = controller.getObjectByName('line');
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {

        const intersection = intersections[0];

        const object = intersection.object;
        // object.material.emissive.b = 1;
        intersected.push(object);

        line.scale.z = intersection.distance;

    } else {

        line.scale.z = 5;

    }

}

function getIntersections(controller) {

    tempMatrix.identity().extractRotation(controller.matrixWorld);

    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, - 1).applyMatrix4(tempMatrix);

    return raycaster.intersectObjects(clickRoom, true);

}

function cleanIntersected() {

    while (intersected.length) {

        const object = intersected.pop();
        //   object.material.emissive.b = 0;

    }

}

function onSelectStart(event) {

    soundClick.play();

    const controller = event.target;

    const intersections = getIntersections(controller);

    if (intersections.length > 0) {

        const intersection = intersections[0];

        tempMatrix.getInverse(controller.matrixWorld);

        const object = intersection.object;


        switch (object.name) {

            case 'exit':

                scene.remove(object);
                window.location.href = window.location.href;

                break;

            default:

        }
    }
}


function onSelectEnd(event) {

    const controller = event.target;
    // const object = controller.userData.selected;
    // object.matrix.premultiply(controller.matrixWorld);
    // object.matrix.decompose(object.position, object.quaternion, object.scale);
    // object.material.emissive.b = 0;
    // AlphaGrp.add(object);
}

function animate() {

    renderer.setAnimationLoop(render);

}

function update() {

    const now = new Date().getTime();
    const slow1 = 0.00005;

    const delta = clock.getDelta();

    //for text
    for (let i = 0; i < txtArr.length; i++) {

        let tx = txtArr[i];

        tx.material.opacity = 0 + Math.sin(now * slow1);

    }

    //for main
   main.rotation.y = now * slow1;

    //for sparkles
    for (let i = 0; i < sparkle.length; i++) {

        const spark = sparkle[i];

        if (spark.name == 'sprk') {

            spark.material.rotation += 0.015;
        }

        spark.position.add(spark.userData.velocity);

        if (spark.position.x < - 25 || spark.position.x > 25) {

            spark.position.x = THREE.Math.clamp(spark.position.x, - 25, 25);
            spark.userData.velocity.x = - spark.userData.velocity.x;

        }

        if (spark.position.y < -0.5 || spark.position.y > 25) {

            spark.position.y = THREE.Math.clamp(spark.position.y, 5, 25);
            spark.userData.velocity.y = - spark.userData.velocity.y;

        }

        if (spark.position.z < - 25 || spark.position.z > 25) {

            spark.position.z = THREE.Math.clamp(spark.position.z, 0, 25);
            spark.userData.velocity.z = - spark.userData.velocity.z;

        }

    }

    //for bat gltf animation
    for (let i = 0; i < mixers.length; ++i) {

        mixers[i].update(delta);

    }

    //for bat move
    for (let i = 0; i < batAnim.length; i++) {

        const bt = batAnim[i];

        bt.translateX(0.001);
        bt.translateY(0.0025);
        bt.translateZ(-0.01);

        if (bt.position.z < -29) {
            bt.visible = false;
        }

    }

}

function render() {

    update();

    cleanIntersected();

    intersectObjects(controller);

    renderer.render(scene, camera);

}