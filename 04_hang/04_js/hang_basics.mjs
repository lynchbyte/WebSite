/**
 * @author Shauna Lynch <lynchbyte.com>
 */

import { scene } from '../hang_app.js';


export async function addLights() {

    var hemi = new THREE.HemisphereLight(0xffffff,0xffffff, 1);
    hemi.name = "hemi"
    scene.add(hemi);

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0.5, 2, 2);
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = - 2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = - 2;
    light.shadow.mapSize.set(4096, 4096);
    light.name = "dir"
    scene.add(light);
}

export async function addFloor() {

    var geometry = new THREE.CylinderBufferGeometry(2, 2, 0.2, 32);

    const texture = new THREE.TextureLoader().load('./04_media/vellum.png');

    var material = new THREE.MeshBasicMaterial({ map: texture });

    //var material = new THREE.MeshNormalMaterial();
 
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, -0.5, 0);
    //cylinder.position.set(0, 0, -3);
    //cylinder.rotation.set(3.14 / 2, 0, 0);
    cylinder.name = 'FirePit';

    scene.add(cylinder);

}

export function markers(){

    var g = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	var m = new THREE.MeshNormalMaterial();

    var mesh = new THREE.Mesh( g, m );
    scene.add( mesh );

    var mesh2 = mesh.clone();
    mesh2.position.set(0,1,0);
    scene.add(mesh2);

    var mesh3 = mesh.clone();
    mesh3.position.set(0,2,0);
    scene.add(mesh3);

}