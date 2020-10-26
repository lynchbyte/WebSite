/**
 * @author Shauna Lynch <shaunalynch.com>
 */

import { scene, group, controller1} from '../wbp_app.js';

var pickerWidth = 0.425;
var pickerHeight = 0.425;
var pickPosX = -0.5
var pickPosY = 1.9;

export async function addColPick() {
    var pic = new Image();
    pic.src = './03_media/ColorWheel.png';

    var canvasColour = document.createElement('canvas');
    canvasColour.width = 512;
    canvasColour.height = 512;

    var ctxColour = canvasColour.getContext('2d');
    ctxColour.fillStyle = 'rgb(250, 235, 215)'; //antiqueWhite
    ctxColour.fillRect(0, 0, canvasColour.width, canvasColour.height);

    var pickerTexture = new THREE.Texture(canvasColour);
    pic.onload = function () {
        ctxColour.drawImage(pic, 0, 0);
        pickerTexture.needsUpdate = true;
    };

    var pickerMaterial = new THREE.MeshBasicMaterial({ map: pickerTexture });
    var pickerPlane = new THREE.PlaneGeometry(pickerWidth, pickerHeight, 1, 1);
    var picker = new THREE.Mesh(pickerPlane, pickerMaterial);
    picker.position.set(pickPosX, pickPosY, -1.7);
    picker.rotation.set(0, 0, 0);
    picker.name = 'CP';
    picker.visible = false;
    scene.add(picker);
    group.add(picker);


    var geometry = new THREE.PlaneGeometry(0.475, 0.475, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x43385d });//dark Purple
    var plane = new THREE.Mesh(geometry, material);
    plane.position.copy(picker.position);
    plane.translateZ(-0.01);
    plane.visible = false;
    plane.name = 'CPBorder';
    scene.add(plane);

}

export function pickColor(it) {
    var hitVec3 = it.point.clone();

    var lastX = hitVec3.x;
    var lastY = hitVec3.y;

    var canvasColour = scene.getObjectByName('CP').material.map.image;
    var ctxColour = canvasColour.getContext('2d');

    var canColourPoint = new THREE.Vector2;

    //convert 3D point to 2D canvas point
    canColourPoint.x = (lastX / pickerWidth * canvasColour.width);
    canColourPoint.y = (((pickPosY + pickerHeight / 2) - lastY) / pickerHeight * canvasColour.height);
    //max X of canvas
    var xMax = pickPosX - (pickerWidth / 2);
    canColourPoint.x = ((xMax * -1 - lastX * -1) / pickerWidth * canvasColour.width);
     canColourPoint.y = (((pickPosY + pickerHeight / 2) - lastY) / pickerHeight * canvasColour.height);

    var pixel = ctxColour.getImageData(canColourPoint.x, canColourPoint.y, 1, 1);
    var data = pixel.data;
    var inkColour = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ') ';

    //change dot Colour
    var object = scene.getObjectByName('MainInd', true);
    object.material.color.set(inkColour);

    //change wand colour
    controller1.children[0].material.color.set(inkColour);
}

