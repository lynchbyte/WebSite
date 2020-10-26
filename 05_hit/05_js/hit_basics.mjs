/**
 * @author Shauna Lynch <lynchbyte.com>
 */

import { scene } from '../hit_app.js';


export function addLights() {
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
    hemiLight.color.setHSL(0.6, 1, 0.6);  //MEDIUM BLUE #3385ff
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);//WARM PEACH #ffca80
    hemiLight.position.set(0, 10, 0);
    hemiLight.name = 'hemi';
    scene.add(hemiLight);

    var light = new THREE.SpotLight(0xf5f5a3, 1.25);  //WARM LIGHT YELLOW
    light.position.set(-5, 10, 5);
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024 * 4;
    light.shadow.mapSize.height = 1024 * 4;
    light.name = 'spot';
    scene.add(light);

    var light2 = new THREE.AmbientLight(0xe9eaa4, 0.5); // soft white light
    light2.name = 'amb';
    scene.add(light2);

}


export function addFloor() {

    // GROUND
    var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    var groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    groundMat.color.setHSL(0.095, 1, 0.75); //WARM PEACH #ffca80
    

    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = - 33;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    ground.name = 'ground';
    scene.add(ground);

}

export function markers() {

    var g = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    var m = new THREE.MeshNormalMaterial();

    var mesh = new THREE.Mesh(g, m);
    scene.add(mesh);

    var mesh2 = mesh.clone();
    mesh2.position.set(0, 1, 0);
    scene.add(mesh2);

    var mesh3 = mesh.clone();
    mesh3.position.set(0, 2, 0);
    scene.add(mesh3);

}