/**
 * @author Shauna Lynch <lynchbyte.com>
 */
import { scene, inkColour } from '../wbp_app.js';

export function addMainInd() {

    const dia = 0.1;
    const mainInd = new THREE.Mesh(new THREE.SphereBufferGeometry(dia, 32, 32), new THREE.MeshBasicMaterial({ color: inkColour }));
    mainInd.position.x = 0;
    mainInd.position.y = 1.9;
    mainInd.position.z = -1.7;
    mainInd.name = 'MainInd';
    mainInd.material.needsUpdate = true;
    mainInd.visible = false;
    scene.add(mainInd);

    var geometry = new THREE.PlaneGeometry(0.425, 0.425);
    var material = new THREE.MeshBasicMaterial({ color: 0xfaebd7 });//antiqueWhte
    var plane = new THREE.Mesh(geometry, material);
    plane.position.copy(mainInd.position);
    plane.name = 'MainIndPlane';
    plane.visible = false;
    scene.add(plane);


    var geometry = new THREE.PlaneGeometry(0.475, 0.475);
    var material = new THREE.MeshBasicMaterial({ color: 0x43385d });//dark Purple
    var plane = new THREE.Mesh(geometry, material);
    plane.position.copy(mainInd.position);
    plane.translateZ(-0.01);
    plane.name = 'MainIndPlaneBorder';
    plane.visible = false;
    scene.add(plane);

}

export function sizeChange(direction) {
    var sphere = scene.getObjectByName('MainInd');
    var size = sphere.scale.x;
    var maxSz = 2.0;
    var minSz = 0.25;
    var icrem = 0.05;

    if (direction > 0) {

        if (size < maxSz) {
            size = size + icrem;
            sphere.scale.x += 0.1;
            sphere.scale.y += 0.1;
            sphere.scale.z += 0.1;

        }
    }
    if (direction < 0) {

        if (size > minSz) {
            size = size - icrem;
            sphere.scale.x -= 0.1;
            sphere.scale.y -= 0.1;
            sphere.scale.z -= 0.1;

        }
    }


}