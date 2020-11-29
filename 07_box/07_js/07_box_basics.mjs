/**
 * @author Shauna Lynch <lynchbyte.com>
 * 
 */

import { scene } from '../box.dev.js';

export function addLights() {

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
    dirLight.position.set(- 0, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 40;
    dirLight.shadow.camera.bottom = - 30;
    dirLight.shadow.camera.left = - 50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 80;
  scene.add(dirLight);

}

export function addFloor() {

    const gF = new THREE.PlaneBufferGeometry(200, 100, 1, 1);

    const colFlr = new THREE.Color(0x3c0628);//purple
    //  const colFlr = new THREE.Color( 0Xcf0e42 ); //hot pink
    const mF = new THREE.MeshPhongMaterial({ color: colFlr });

    const nwGrnd = new THREE.Mesh(gF, mF);
    nwGrnd.rotation.set((-90 * (Math.PI / 180)), 0, 0,);
    nwGrnd.position.set(0, 0, -35);
    nwGrnd.receiveShadow = true;

    nwGrnd.name = "Floor";
    scene.add(nwGrnd);

}


export function addMarkers() {

    const g = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
    const m = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(g, m);
    mesh.name = "Marker";
    scene.add(mesh);

    const mesh2 = mesh.clone();
    mesh2.position.set(0, 1, 0);
    scene.add(mesh2);

    const mesh3 = mesh.clone();
    mesh3.position.set(0, 2, 0);
    scene.add(mesh3);

    const mesh4 = mesh.clone();
    mesh4.position.set(0, 0, -25);
    scene.add(mesh4);

    const mesh5 = mesh.clone();
    mesh5.position.set(0, -10, -25);
    scene.add(mesh5);
}



