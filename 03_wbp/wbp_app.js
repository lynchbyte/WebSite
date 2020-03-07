/**
 * @author Shauna Lynch <lynchbyte.com>
 */

import * as THREE from '../../js/three.module.js';

import { OrbitControls } from '../../js/OrbitControls.mjs';

import { VRButton } from './03_js/wbp_VRButton.mjs';
import { addMainInd, sizeChange } from './03_js/wbp_szPick.mjs';
import { addColPick, pickColor } from './03_js/wbp_colPick.mjs';

import { addEasel } from './03_js/wbp_models.mjs';
import { addPicTitle, addCredits1, addCredits2, addCredits3,addArrowUp, addArrowDown, addClear, addExit } from './03_js/wbp_pics.mjs';
import { lightbulb, addLights, addFloor, markers } from './03_js/wbp_basics.mjs';

window.THREE = THREE;

export const scene = new THREE.Scene();
export const group = new THREE.Group();
export let camera;
export let controller1;

export const raycaster = new THREE.Raycaster();
export const intersected = [];
export const tempMatrix = new THREE.Matrix4();

export const paperWidth = 1.75;
export const paperHeight = 1;
export const paperYpos = 1.25;
export const paperZpos = -1.5;
export const paperXrot = -42 * (Math.PI / 180);

export let startPoint = new THREE.Vector2();
export let inkColour = 'rgb(0, 0, 0)';

export let isDrawing = false;
export let spIsSet = false;
export let lastX;
export let lastY;

let container;
let renderer;


let OrbControls;

var moonGlow;
var uniforms;

var cameraTarget

const soundClick = new Howl({ src: ['03_media/Audio/Beep.wav'], volume: 1, });

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene.background = new THREE.Color(0x6b5b95);//0x6b5b95
    scene.fog = new THREE.FogExp2(0x6b5b95, 0.15);

    scene.add(group);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.set(-0.25, 1.25, 2.5);
    cameraTarget = new THREE.Vector3(0, 1, -1);

    OrbControls = new OrbitControls(camera, container);
    OrbControls.target.set(0, 1.6, 0);
    OrbControls.update();

    //Basics
    addLights();
    addFloor();
    lightbulb();
    addPicTitle();

    //Models
    addEasel();

    //Credits
    addCredits1();
    addCredits2();
    addCredits3();

    addMainInd();
    addColPick();

    addArrowUp();
    addArrowDown();
    addClear();
    addExit();

    renderer = new THREE.WebGLRenderer({ antialias: true });//
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    document.body.appendChild(VRButton.createButton(renderer));

    // controllers
    controller1 = renderer.xr.getController(0);
    scene.add(controller1);

    // controllers helper
    var material = new THREE.LineBasicMaterial({ color: 0x000000 });
    var geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, - 1)]);
    var line = new THREE.Line(geometry, material);
    line.name = 'line';
    line.scale.z = 5;
    controller1.add(line.clone());

    //Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    controller1.addEventListener('selectstart', onSelectStart);
    controller1.addEventListener('selectend', onSelectEnd);

    console.log(scene);

}//finish init////////////////////////////////////////////////////////////////////////////////////////////

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onSelectStart(event) {
    soundClick.play();
    var controller = event.target;
    controller.userData.isSelecting = true;
    var intersections = getIntersections(controller);

}

function onSelectEnd(event) {
    isDrawing = false;
    spIsSet = false;
    var controller = event.target;
    controller.userData.isSelecting = false;

}

function getIntersections(controller) {

    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, - 1).applyMatrix4(tempMatrix);
    return raycaster.intersectObjects(group.children);

}

function intersectObjects(controller) {

    if (controller.userData.selected !== undefined) return;
    var intersections = getIntersections(controller);
    if (intersections.length > 0) {
        var intersection = intersections[0];
        var object = intersection.object;
    }
}

function cleanIntersected() {

    while (intersected.length) {
        var object = intersected.pop();
        object.material.transparent = false;
    }

}
function handleController(controller) {

    if (controller.userData.isSelecting) {

        var intersections = getIntersections(controller);

        if (intersections.length > 0) {
            var intersection = intersections[0];
            var object = intersection.object;
            var thing = intersection.object.name;

            ///////////
            //Switch///
            ///////////


            switch (thing) {
                case 'Paper':
                    isDrawing = true;
                    draw(intersection);
                    break;

                case 'CP':
                    pickColor(intersection);
                    break;

                case 'ArrowUp':
                    sizeChange(1);
                    break;

                case 'ArrowDown':
                    sizeChange(-1);
                    break;

                case 'Clear':
                    var canvas = scene.getObjectByName('Paper').material.map.image;
                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    var object = scene.getObjectByName('Paper', true);
                    object.material.map.needsUpdate = true;
                    //var inkC = scene.getObjectByName('MainInd').material.color;
                    //ctx.strokeStyle = 'rgb(' + Math.floor(inkC.r * 255) + ',' + Math.floor(inkC.g * 255) + ',' + Math.floor(inkC.b * 255) + ') ';
                    var spIsSet = false;
                    break;

                case 'Exit':
                    console.log(`exit`);

                    var s = renderer.xr.getSession();
                    s.end();

                    //remove VR button
                    var bt = document.getElementById('butts1');
                    bt.remove();
                    
                    var butRestart = document.createElement('button');
                    butRestart.className = "newButts";
                    butRestart.id = 'butR';
                    butRestart.textContent = 'Restart';
                    butRestart.style.left = 'calc(33% - 75px)';
                    document.body.appendChild(butRestart);
                    butRestart.onclick = function () { window.location.reload(true); };

                    var butExDwnld = document.createElement('button');
                    butExDwnld.className = "newButts";
                    butExDwnld.id = 'butE';
                    butExDwnld.textContent = 'Exit & Download';
                    butExDwnld.style.left = 'calc(66% - 75px)';
                    document.body.appendChild(butExDwnld);
                    butExDwnld.onclick = function () {

                        var canvas = scene.getObjectByName('Paper').material.map.image;
                        var dataURL = canvas.toDataURL('image/png');

                        var myDIV = document.createElement('div');
                        myDIV.id = "MyDiv";
                        myDIV.style.width = '250px';
                        myDIV.style.align = 'center';
                        myDIV.style.padding = '5px ';
                        myDIV.style.display = "none"

                        document.body.appendChild(myDIV);
                        var getDiv = document.getElementById('MyDiv');

                        var pic = document.createElement('img');
                        getDiv.appendChild(pic);
                        pic.src = dataURL;

                        getDiv.style.display = "block";

                        document.body.removeChild(container);
                        //remove  butExDwnld & butRestart
                        var bt = document.getElementById('butR');
                        bt.remove();
                        var bt = document.getElementById('butE');
                        bt.remove();
                        //is presenting false
                        renderer.xr.isPresenting = false;

                        //original camera
                        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);

                    }
                    break;

                default:
                    console.log('no hit');

            }

        }
    }

}

function draw(it) {
    var hitVec3 = it.point.clone();

    lastX = hitVec3.x;
    lastY = hitVec3.y;

    //3d coordinates to 2D canvas coordinates
    var canvas = scene.getObjectByName('Paper').material.map.image;

    var object = scene.getObjectByName('Paper', true);
    object.material.map.needsUpdate = true;

    var canPoint = new THREE.Vector2;

    if (lastX > 0) {

        canPoint.x = Math.round(canvas.width / 2 + ((lastX / (paperWidth / 2) * canvas.width / 2)));

    }

    if (lastX < 0) {

        canPoint.x = Math.round((paperWidth - (paperWidth / 2) - (lastX * -1)) / paperWidth * canvas.width);

    }

    canPoint.y = Math.round((((Math.cos(paperXrot) * paperHeight / 2) + paperYpos) - lastY) / Math.cos(paperXrot) / paperHeight * canvas.height);

    //to stop startPoint being 0,0
    if (!spIsSet) {

        startPoint.x = canPoint.x;
        startPoint.y = canPoint.y;

    }

    if (spIsSet) {

        setTimeout(function () {

            startPoint.x = canPoint.x;
            startPoint.y = canPoint.y;
            //StartPoint is set

        });

    }

    var ctx = canvas.getContext('2d');

    //set color based on Indicator colour
    var inkC = scene.getObjectByName('MainInd').material.color;
    ctx.strokeStyle = 'rgb(' + Math.floor(inkC.r * 255) + ',' + Math.floor(inkC.g * 255) + ',' + Math.floor(inkC.b * 255) + ') ';

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    //set pen size basedon MainInd scale size
    var deltaDist = 10;
    var sphere = scene.getObjectByName('MainInd');
    var inkSize = sphere.scale.x;
    ctx.lineWidth = parseInt(inkSize * deltaDist);

    ctx.beginPath();

    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(canPoint.x, canPoint.y);

    ctx.stroke();

    spIsSet = true;

}

function animate() {

    renderer.setAnimationLoop(render);

}

function render() {

    cleanIntersected();

    handleController(controller1);

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);

}



