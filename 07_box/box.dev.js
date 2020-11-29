/**
 * @author Shauna Lynch <lynchbyte.com>
 */

import * as THREE from '../../js/threeR123.mod.js';
//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.module.js';

import { OrbitControls } from '../../js/OrbitControls.mjs';

import { addLights, addFloor, addMarkers } from './07_js/07_box_basics.mjs';

import { makePts } from './07_js/07_box_points.mjs';

import { makeMesh } from './07_js/07_box_word.mjs';

window.THREE = THREE;

export const scene = new THREE.Scene();

export const pts = [];
export const fall = [];
const bodys = [];

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1200);

const renderer = new THREE.WebGLRenderer({ antialias: true });

const clock = new THREE.Clock();
var world, mass, body, shape, timeStep = 1 / 60;
let hometime = false;
let currentTime = 0;

init();

animate();

setTimeout(function () { initCannon(); }, 3000);//3000

function initCannon() {

    world = new CANNON.World();
    world.gravity.set(0, -50, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.name = "World";

    var plane = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(plane);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(groundBody);

    //Create imposters
    var shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));

    for (var i = 0; i < pts.length; i++) {

        let a = pts[i];

        var body = new CANNON.Body({ mass: 1 });
        body.addShape(shape);
        body.position.set(a.x, a.y, a.z);
        world.add(body);
        bodys.push(body);

    }

    setTimeout(function () { goHome(); }, 5000);//6000

}
function goHome() {
    for (var i = 0; i < bodys.length; i++) {
        let a = bodys[i];
        world.remove(a);
    }

    hometime = true;
    console.log('go home');
}

function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera.position.set(0, 21.1, 18);

    const OrbControls = new OrbitControls(camera, container);
    OrbControls.target.set(0, 20, 0);
    OrbControls.update();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
   // renderer.gammaOutput = true;
//renderer.gammaFactor = 1.5;

    renderer.shadowMap.enabled = true;
   // renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const col = new THREE.Color(0x3c0628);
    scene.background = new THREE.Color(col);

    addLights();
    addFloor();
   // addMarkers();
    makePts();
    makeMesh();

    //Event Listeners
    window.addEventListener('resize', onWindowResize, false);

    console.log(scene);

}
//finish init////////////////////////////////////////////////////////////////////////////////////////////

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    renderer.setAnimationLoop(render);

}


function update() {

    const delta = clock.getDelta();

    //crumble
    if (world == undefined) {

        return;

    }

    world.step(timeStep);

    for (let i = 0; i < fall.length; i++) {

        var mesh = fall[i];
        var body = bodys[i];

        // Copy coordinates from Cannon.js to Three.js
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
        mesh.receiveShadow = true;
    }

    //lerp home
    if (hometime == false) {

        return;

    }

    else {

        lerpit(delta);
    }

}

function lerpit(d) {

    for (let i = 0; i < fall.length; i++) {

        let a = fall[i];

        let V3 = new THREE.Vector3();

        let startPos = new THREE.Vector3(a.position.x, a.position.y, a.position.z);

        let endPos = new THREE.Vector3(a.userData.homePosX, a.userData.homePosY, a.userData.homePosZ);

        let lerpTime = 400;

        currentTime = currentTime + d;

        let perc = currentTime / lerpTime;

        if (perc < 0.99) {

            V3.lerpVectors(startPos, endPos, perc);

            a.position.copy(V3);
        }

        else {

            a.position.set(a.userData.homePosX, a.userData.homePosY, a.userData.homePosZ);
            a.receiveShadow = false;

        }

        a.rotation.set(a.userData.homeRotX, a.userData.homeRotY, a.userData.homeRotZ);
    }
}
function render() {

    update();

    renderer.render(scene, camera);

}