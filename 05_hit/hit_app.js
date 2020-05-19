/**
 * @author Shauna Lynch <shaunalynch.com.au>
 */

import * as THREE from '../../js/three.module.js';

import { OrbitControls } from '../../js/OrbitControls.mjs';

import { ARButton } from './05_js/hit_ARButton.mjs';

import { GLTFLoader } from '../../js/GLTFLoader.mjs';

import { worder } from './05_js/hit_Scaler.mjs';

import { addLights, addFloor, markers } from './05_js/hit_basics.mjs';

window.THREE = THREE;

export const scene = new THREE.Scene();

let camera;

let container;
let renderer;

var clock;
var mixer;

let OrbControls;

var reticle;

var model;

var controller;

var hitTestSource = null;
var hitTestSourceRequested = false;

const soundAmb = new Howl({ src: ['05_media/audio/_ghost_-_Reverie_(small_theme).mp3'], loop: true, volume: 0.2, });

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    scene.background = new THREE.Color().setHSL(0.6, 0, 1);  //light yellow, 0 saturation, noise
    scene.fog = new THREE.Fog(scene.background, 25, 500);

    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 7.5, 15);

    //GazePoint
    var gazePoint = new THREE.Mesh(new THREE.BoxBufferGeometry(0.002, 0.002, 0.002, 1, 1, 1), new THREE.MeshNormalMaterial());
    gazePoint.name = 'gazePoint';


    //Warning						
    var geometryWarn = new THREE.PlaneGeometry(2, 2, 4, 4);
    var materialWarn = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("05_media/warn.PNG") });
    var planeWarn = new THREE.Mesh(geometryWarn, materialWarn);
    planeWarn.material.side = THREE.DoubleSide;
    planeWarn.position.set(0, 0, 0);
    planeWarn.name = 'Warn';
    planeWarn.visible = false;

    gazePoint.add(planeWarn);
    camera.add(gazePoint);
    gazePoint.position.set(0, 0, -3);
    scene.add(camera);

    OrbControls = new OrbitControls(camera, container);
    OrbControls.target.set(0, 1.6, 0);
    OrbControls.update();

    //Basics
    addLights();
    addFloor();
    // markers();

    addCastle();

    renderer = new THREE.WebGLRenderer({ antialias: true });//
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

    soundAmb.play();



    function onSelect() {

        if (reticle.visible) {

            //move castle to retcile
            var object = scene.getObjectByName('Castle');
            object.position.setFromMatrixPosition(reticle.matrix);

            //show castle
            object.visible = true;
            //stop castle rotating
            object.userData.size = 'Big';
            //set castle size
            var factor = worder.get();

            { object.scale.set(factor, factor, factor) }

            //adjust lightas
            var h = scene.getObjectByName('hemi');
            scene.remove(h);

            var sp = scene.getObjectByName('spot');
            //scene.remove(sp);

            var a = scene.getObjectByName('amb');
            a.intensity = 1;

            //delete recticle
            var r = scene.getObjectByName('Recticle');
            scene.remove(r);





        }

    }

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    reticle = new THREE.Mesh(
        new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2),
        new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    reticle.name = 'Recticle';
    scene.add(reticle);

    //Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', function (event) {


    });

    console.log(scene);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}


async function addCastle() {

    let path = '05_media/model/';
    let glbFile = 'scene.gltf';

    const manager = initLoadingManager();

    var loader = new GLTFLoader(manager).setPath(path);
    loader.load(glbFile, function (gltf) {

        gltf.scene.scale.set(0.15, 0.15, 0.15);
        gltf.scene.position.set(0, 1, 0);

        gltf.scene.traverse(function (o) {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        mixer = new THREE.AnimationMixer(gltf.scene);

        var action = mixer.clipAction(gltf.animations[0]);
        action.play();

        gltf.scene.name = 'Castle';
        gltf.scene.userData.size = 'Small';

        scene.add(gltf.scene);

        model = gltf.scene;

        console.log(`castle = gltf.scene`, model);

    }, manager.onProgress, manager.onError);



}

function initLoadingManager() {

    ////loading manager by looeee https://codepen.io/discoverthreejs/pen/JMrOey

    const manager = new THREE.LoadingManager();
    const progressBar = document.querySelector('#progress');
    const loadingOverlay = document.querySelector('#loading-overlay');

    let percentComplete = 1;
    let frameID = null;

    const updateAmount = 0.5; // in percent of bar width, should divide 100 evenly

    const animateBar = () => {
        percentComplete += updateAmount;

        // if the bar fills up, just reset it.
        if (percentComplete >= 100) {

            //  progressBar.style.backgroundColor = 'blue'
            percentComplete = 1;

        }

        progressBar.style.width = percentComplete + '%';

        frameID = requestAnimationFrame(animateBar)

    }

    manager.onStart = () => {

        // prevent the timer being set again, if onStart is called multiple times
        if (frameID !== null) return;

        animateBar();

    };

    manager.onLoad = function () {

        loadingOverlay.classList.add('loading-overlay-hidden');

        // reset the bar in case we need to use it again
        percentComplete = 0;
        progressBar.style.width = 0;
        cancelAnimationFrame(frameID);

    };

    manager.onError = function (e) {

        console.error(e);

        progressBar.style.backgroundColor = 'red';

    }

    return manager;
}

function animate() {

    renderer.setAnimationLoop(render);

}

function render(timestamp, frame) {

    if (frame) {

        var referenceSpace = renderer.xr.getReferenceSpace();
        var session = renderer.xr.getSession();

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

            var hitTestResults = frame.getHitTestResults(hitTestSource);

            if (hitTestResults.length) {

                var hit = hitTestResults[0];

                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

            } else {

                reticle.visible = false;

            }

        }

    }

    var delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    if (model && model.userData.size === 'Small') model.rotation.y -= 0.0075;

    renderer.render(scene, camera);

}