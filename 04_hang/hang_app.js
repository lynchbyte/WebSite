/**
 * @author Shauna Lynch <lynchbyte.com>
 */

import * as THREE from '../../js/three.module.js';

import { VRButton } from './04_js/hang_VRButton.mjs';

import { OrbitControls } from '../../js/OrbitControls.mjs';

import { addPicTitle, makePicReplay, makePicCat, makePicDrag } from './04_js/hang_pics.mjs';
import { addLights } from './04_js/hang_basics.mjs';

import { makePicAlpha1, makePicAlpha2, makePicAlpha3 } from './04_js/hang_makeAlpha.mjs';

import { worder } from './04_js/hang_makeWord.mjs';

import { makeCross } from './04_js/hang_cross.mjs';

window.THREE = THREE;

export const scene = new THREE.Scene();

export let camera;
//export let controller1, controller2;
export const controlArr = [];

export var wrdArr = [];

export let theWord;

export const cities = ['AMSTERDAM', 'ATHENS', 'BARCELONA', 'BERLIN', 'CASABLANCA', 'CHICAGO', 'COPENHAGEN',
    'DUBROVNIK', 'DUBLIN', 'EDINBURGH', 'FLORENCE', 'GLASGOW', 'HAVANA', 'HELSINKI', 'HOUSTON', 'ISTANBUL',
    'JAKARTA', 'KATHMANDU', 'LONDON', 'MELBOURNE', 'MOMBASA', 'MONTREAL', 'MOSCOW', 'MUMBAI', 'NEWCASTLE',
    'PARIS', 'PRAGUE', 'SANTIAGO', 'SEATTLE', 'SEOUL', 'SHANGHAI', 'STOCKHOLM', 'TOKYO', 'TORONTO', 'VANCOUVER'];

export let nextNum = 0;
export let clickRoom = [];
var cloneCR = [];
export var crosses = [];
export const AlphaGrp = new THREE.Group();
export const groupBlackHole = new THREE.Group();

const raycaster = new THREE.Raycaster();
const intersected = [];
export const tempMatrix = new THREE.Matrix4();


const sparklers = [];
var cameraTarget;
let container;
let renderer;

const soundClick = new Howl({ src: ['04_media/audio/LV-HTIS Beeps Simple 03.wav'], volume: 0.05, });
const soundCorrect = new Howl({ src: ['04_media/audio/hangManCorrect.wav'], volume: 0.05, });
const soundWrong = new Howl({ src: ['04_media/audio/hangManWrong.wav'], volume: 0.05, });
const soundWin = new Howl({ src: ['04_media/audio/hangManWin.mp3'], volume: 0.2, });
const soundWin2 = new Howl({ src: ['04_media/audio/hangManWin2.mp3'], volume: 0.05, });
const soundLose = new Howl({ src: ['04_media/audio/hangManLose.mp3'], volume: 0.2, });

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene.background = new THREE.Color(0xdcdcdc);

    scene.add(AlphaGrp);
    scene.add(groupBlackHole);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.25, 2.5);
    cameraTarget = new THREE.Vector3(0, 1.65, 1);

    addLights();

    addPicTitle();

    //  var OrbControls = new OrbitControls(camera, container);
    //  OrbControls.target.set(0, 1.6, 0);
    //  OrbControls.update();

    renderer = new THREE.WebGLRenderer({ antialias: true });//
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    document.body.appendChild(VRButton.createButton(renderer));


    //Event Listeners
    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener('click', () => {



    });


}//finish init////////////////////////////////////////////////////////////////////////////////////////////


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function checkForWin() {

    var winStr = "";
    for (var i = 0; i < theWord.length; i++) {
        winStr += "z";
    }

    var chkWrd = wrdArr.join('');

    if (winStr === chkWrd) {
        console.log(`win`);
        soundWin2.play();
        soundWin.play();
        nextNum = 0;
        clickRoom.length = 0;
        var rpp = scene.getObjectByName('rp');
        clickRoom.push(rpp);

        scene.traverse(function (object) {
            if (object.userData.isSpacer === true)

                sparklers.push(object);
        });

    }
    if (sparklers.length > 0) {
        setTimeout(function () {
            sparklers.length = 0
        }, 5000);
    }

}

function intersectObjects(controller) {

    // Do not highlight when already selected
    if (controller.userData.selected !== undefined) return;

    var line = controller.getObjectByName('line');
    var intersections = getIntersections(controller);

    if (intersections.length > 0) {

        var intersection = intersections[0];

        var object = intersection.object;
        object.material.emissive.b = 1;
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
        object.material.emissive.b = 0;

    }

}

export function onSelectStart(event) {

    soundClick.play();

    var controller = event.target;

    var intersections = getIntersections(controller);

    if (intersections.length > 0) {

        var intersection = intersections[0];

        tempMatrix.getInverse(controller.matrixWorld);

        var object = intersection.object;


        switch (object.name) {

            //start
            case 'startMesh':

                makePicAlpha1();
                makePicAlpha2();
                makePicAlpha3();

                makePicReplay();
                makePicCat();
                makePicDrag();

                makeCross();

                var tcs = scene.getObjectByName('tcs');
                scene.remove(tcs);

                var sm = scene.getObjectByName('startMesh');
                sm.position.set(0, -2, 5)
                sm.scale.set(0.001, 0.001, 0.01);

                renderer.renderLists.dispose()

                worder.set();
                theWord = worder.get();

                wrdArr = Array.from(theWord);

                break;

            //replay
            case 'rp': //replay button

                nextNum = 0;

                //move AlphaGrp letters back to home pos
                setTimeout(function () {

                    var ltNum = AlphaGrp.children.length;
                    for (var i = 0; i < ltNum; i++) {

                        var lt = AlphaGrp.children[i];
                        var homePos = new THREE.Vector3(lt.userData.homePosX, lt.userData.homePosY, lt.userData.homePosZ);
                        lt.position.set(homePos.x, homePos.y, homePos.z)
                        lt.scale.set(1, 1, 1);
                        lt.material.transparent = false;
                    }
                }, 1500);

                //move doubles to the black hole
                if (groupBlackHole.children.length > 0) {
                    var bhNum = groupBlackHole.children.length;
                    for (var i = 0; i < bhNum; i++) {

                        var bh = groupBlackHole.children[i];
                        bh.position.set(0, -2, 1)
                        bh.scale.set(0.001, 0.001, 0.01);

                    }
                }

                //delete existing spacers
                for (var i = 0; i < wrdArr.length; i++) {
                    var spacerOld = scene.getObjectByName(`spacerMesh${i}`);
                    scene.remove(spacerOld);

                }

                worder.set();
                theWord = worder.get();
                wrdArr = Array.from(theWord);

                //add all alphaletters to CR arr
                for (var i = 0; i < AlphaGrp.children.length; i++) {
                    clickRoom.push(AlphaGrp.children[i])
                }

                //make crosses transparent
                crosses.forEach(function (item) {
                    const mt = item.material
                    item.material = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: 0.1,
                        map: mt.map

                    });

                });

                break;

                case 'ex': //exit button

                window.open('http://www.lynchbyte.com','_blank',)

                break;
                
            //else
            default:

                object.matrix.premultiply(tempMatrix);
                object.matrix.decompose(object.position, object.quaternion, object.scale);
                object.material.emissive.b = 1;
                object.material.color.setHex = 0xffffff;

                controller.add(object);
                controller.userData.selected = object;
        }
    }

}

export function onSelectEnd(event) {

    var controller = event.target;

    if (controller.userData.selected !== undefined) {

        var object = controller.userData.selected;
        object.matrix.premultiply(controller.matrixWorld);
        object.matrix.decompose(object.position, object.quaternion, object.scale);
        object.material.emissive.b = 0;
        AlphaGrp.add(object);

        controller.userData.selected = undefined;

        switch (object.name) {

            case 'startMesh':

                console.log(`on select end start`);

                // AlphaGrp.remove(object);

                break;

            case 'rp':

                console.log(`on select end replay`);

                break;

            default:

                var dragBox = scene.getObjectByName('dragMesh');
                object.position.copy(dragBox.position);
                object.rotation.set(0, (0 * Math.PI / 180), 0);
                object.translateZ(0.01);

                var homePos = new THREE.Vector3(object.userData.homePosX, object.userData.homePosY, object.userData.homePosZ);

                var n = wrdArr.includes(object.name)//boolean

                if (n === true) {

                    soundCorrect.play();

                    console.log(`object name`, object.name, typeof object.name);
                    //find how many times letter occurs
                    const match = wrdArr.filter(ltr => ltr === object.name);
                    console.log(`match`, match, match.length);

                    //for first match instance
                    var instance = wrdArr.findIndex((element) => element === object.name);
                    console.log(`inst`, instance);
                    scene.getObjectByName(`spacerMesh${instance}`).material.color.setHex(0xa9a9a9);
                    wrdArr.splice(instance, 1, 'z');
                    console.log(`splice`, wrdArr);
                    //relocate letter
                    var tarCoords = (scene.getObjectByName(`spacerMesh${instance}`).position);
                    console.log(`tarCoords`, tarCoords);

                    var tween = new TWEEN.Tween(object.position)
                        .to({ x: tarCoords.x, y: tarCoords.y, z: tarCoords.z + 0.01 }, 1000)
                        .start();

                    //if quantity greater than 1
                    if (match.length > 1) {
                        for (var i = 0; i < match.length - 1; i++) {

                            //clone new instances of the letter
                            var newLet = object.clone();
                            groupBlackHole.add(newLet);
                            //scene.add(newLet);
                            newLet.name = (`newLet${i + 1}`);
                            newLet.position.x = 0.0025 * i;
                            // newLet.position.y = 1;
                            // newLet.position.z = -2;

                            //change color of remaining correct spacers
                            var instSec = wrdArr.findIndex((element) => element === object.name);

                            scene.getObjectByName(`spacerMesh${instSec}`).material.color.setHex(0xa9a9a9);
                            wrdArr.splice(instSec, 1, 'z');

                            //relocate remaining letters
                            var tarCoords2 = scene.getObjectByName(`spacerMesh${instSec}`).position;
                            var tween = new TWEEN.Tween(newLet.position)
                                .to({ x: tarCoords2.x, y: tarCoords2.y, z: tarCoords2.z + 0.01 }, 1000)
                                .start();
                        }
                    }

                    setTimeout(function () {
                        checkForWin();

                    }, 1200);

                }

        }

        if (n === false) {

            console.log(n);//= false
            soundWrong.play();

            //move wrong letter back to home position
            var tween = new TWEEN.Tween(object.position)
                .to({ x: homePos.x, y: homePos.y, z: homePos.z }, 1000)
                .start();
            object.scale.set(0.5, 0.5, 0.5);
            object.material.transparent = true;
            object.material.opacity = 0.25;
            AlphaGrp.add(object);

            //show cross
            nextNum = nextNum + 1;

            scene.getObjectByName(`Cross${nextNum - 1}`).material.transparent = false

            //loser time   
            setTimeout(function () {
                if (nextNum === 8) {

                    soundLose.play();

                    nextNum = 0;

                    console.log(`loser time 1`);

                    //empty clickRoom

                    clickRoom.length = 0;
                    var rpp = scene.getObjectByName('rp');
                    clickRoom.push(rpp);

                    //loop thru every letter of word to see if equal z
                    for (var i = 0; i < wrdArr.length; i++) {

                        //instance = z
                        if (wrdArr[i] === 'z') { console.log(`z here`, wrdArr[i], i) }

                        //instance not = z
                        else {

                            console.log(`wrdArr[i]`, wrdArr[i]);

                            var OrigI = wrdArr[i];

                            //move letter to spot
                            var Let_2Mov = scene.getObjectByName(wrdArr[i]);

                            //change color of spacer
                            scene.getObjectByName(`spacerMesh${i}`).material.color.setHex(0xa9a9a9);
                            wrdArr.splice(i, 1, 'z');


                            var tarCoords3 = scene.getObjectByName(`spacerMesh${i}`).position;
                            var tween = new TWEEN.Tween(Let_2Mov.position)
                                .to({ x: tarCoords3.x, y: tarCoords3.y, z: tarCoords3.z + 0.01 }, 1000)
                                .start();

                            //does this letter occur again
                            if (wrdArr.includes(OrigI) === true) {

                                var Let_2Mov2 = scene.getObjectByName(OrigI);
                                //clone new instances of the letter
                                var newLet = Let_2Mov2.clone();
                                groupBlackHole.add(newLet);

                                var tarCoords4 = (scene.getObjectByName(`spacerMesh${i}`).position);
                                newLet.position.set(tarCoords4.x, tarCoords4.y, tarCoords4.z + 0.01);

                            }
                            else {
                                console.log(`all done`);
                            }
                        }

                    }

                }


            }
                , 500);
        }
    }
}

function animate() {

    renderer.setAnimationLoop(render);

}

function render() {
    TWEEN.update();

    cleanIntersected();

    if (controlArr.length > 0) {

        intersectObjects(controlArr[0]);

        if (controlArr[1]) {

            intersectObjects(controlArr[1]);

        }
    }

    renderer.render(scene, camera);

    //for winning scenario
    if (sparklers.length > 0) {

        for (var i = 0; i < sparklers.length; i++) {
            var object = sparklers[i];
            object.material.color.setHex(Math.random() * 0xffffff);
        }

    }

}