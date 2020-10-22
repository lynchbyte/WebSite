/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */

import * as THREE from '../../js/three.module.js';

import { XRSuppQry } from './06_js/hh01_buttonsXR.mjs';

import { OrbitControls } from '../../js/OrbitControls.mjs';

import { addLights, addFloor, addMoon, markers2 } from './06_js/hh01_basics.mjs';

import { loadModels } from './06_js/hh01_cat.mjs';

import { makeTextCentJus } from './06_js/hh01_makeTextCen.mjs';

import { addSparkle, addBat } from './06_js/hh01_particle.mjs';

window.THREE = THREE;

export const scene = new THREE.Scene();

//export const group = new THREE.Group();

export const main = new THREE.Group();

//export const main = [];

//export const stars1 = [];
//export const stars2 = [];
//export const stars3 = [];
export const sparkle = [];

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

const clock = new THREE.Clock();

export let reflectionspark;
export const mixers = [];

const soundAmb = new Howl({ src: ['06_media/audio/PorchCat_-_Moon_Shadow_Grin.mp3'], volume: 0.05, });
const soundClick = new Howl({ src: ['06_media/audio/LV-HTIS Beeps Simple 03.wav'], volume: 0.05, });

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene.background = new THREE.Color(0x15141f);//dark purple

    //  scene.background = new THREE.Color(0x090b10);//indigo


    //  scene.background = new THREE.Color(0x303030);//light grey

    // scene.fog = new THREE.Fog( 0x444466, 100, 400 );
    //  	scene.background = new THREE.Color( 0x444466 ); //light purple

    //scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01 );
    // scene.fog = new THREE.Fog( scene.background, 50, 150 );

    //scene.fog = new THREE.FogExp2( scene.background, 0.02 );

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1200);
    camera.position.set(0, 1.6, 1.5);


    scene.add(main);
    main.name = "main";
    main.position.set(0, 0, -5);
    mvDw.push(main);

    //markers2();

    addLights();

    addFloor();

    addMoon();

    loadModels();

    addSparkle();
    addBat();

    makeTextCentJus('Happy', 'hhTxt1', 0.5, 0.07, 0xFFA500, -2, 4, -5, 0, 0, 0);
    makeTextCentJus('Halloween', 'hhTxt2', 0.5, 0.07, 0xFFA500, -2, 3.275, -5, 0, 0, 0);



  //  soundAmb.play();

    const OrbControls = new OrbitControls(camera, container);
    OrbControls.target.set(0, 1.6, 0);
    OrbControls.update();

    renderer = new THREE.WebGLRenderer({ antialias: true });//
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // document.body.appendChild(bothButton.createSession(renderer));

    //manyButton(renderer);

    XRSuppQry();


    // controllers
    controller = renderer.xr.getController(0);
    controller.name = 'controller';
    scene.add(controller);

    // controllers helper
    var material = new THREE.LineBasicMaterial({ color: 0x000000 });
    var geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, - 1)]);
    var line = new THREE.Line(geometry, material);
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


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}


function intersectObjects(controller) {

    // Do not highlight when already selected
    if (controller.userData.selected !== undefined) return;

    var line = controller.getObjectByName('line');
    var intersections = getIntersections(controller);

    if (intersections.length > 0) {

        var intersection = intersections[0];

        var object = intersection.object;
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

        var object = intersected.pop();
        //   object.material.emissive.b = 0;

    }

}

function onSelectStart(event) {


    soundClick.play();

    var controller = event.target;

    var intersections = getIntersections(controller);

    if (intersections.length > 0) {

        var intersection = intersections[0];

        tempMatrix.getInverse(controller.matrixWorld);

        var object = intersection.object;


        switch (object.name) {

            case 'exit':

                scene.remove(object);
                window.location.href = window.location.href;

                // var v = renderer.xr.getSession();

                //  v.end();
                //    console.log('v', v);
                //renderer.xr.enabled = false;

                // renderer.xr.onend() ;


                break;

            //else
            default:

        }
    }
}


function onSelectEnd(event) {

    var controller = event.target;
    // var object = controller.userData.selected;
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
    const slow2 = 0.0005;


    //for text
    for (var i = 0; i < txtArr.length; i++) {

        let tx = txtArr[i];

        tx.material.opacity = 0 + Math.sin(now * slow1);
    }

    //for main
    main.rotation.y = now * slow1;

    //for sparkles
    for (var i = 0; i < sparkle.length; i++) {

        var spark = sparkle[i];

        if (spark.name == 'sprk') {
            
            // spark.material.rotation = now * slow2;
           spark.material.rotation += 0.015;
        }

        spark.position.add(spark.userData.velocity);

        if (spark.position.x < - 25 || spark.position.x > 25) {

            spark.position.x = THREE.Math.clamp(spark.position.x, - 25, 25);
            spark.userData.velocity.x = - spark.userData.velocity.x;

        }
        //stay positive!
        //TODO change to suit viewer pos +1.5
        if (spark.position.y < -0.5 || spark.position.y > 25) {

            spark.position.y = THREE.Math.clamp(spark.position.y, 5, 25);
            spark.userData.velocity.y = - spark.userData.velocity.y;

        }

        if (spark.position.z < - 25 || spark.position.z > 25) {

            spark.position.z = THREE.Math.clamp(spark.position.z, 0, 25);
            spark.userData.velocity.z = - spark.userData.velocity.z;

        }

    }

}

function render() {

    update();

    cleanIntersected();

    intersectObjects(controller);

    renderer.render(scene, camera);

}
