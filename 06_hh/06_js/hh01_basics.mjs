/**
 * @author Shauna Lynch <lynchbyte.com.au>
 * 

 */

import { scene, mvDw } from '../hh01.js';

import * as THREE from '../../js/three.module.js';
import { Lensflare, LensflareElement } from '../../js/Lensflare.js';


export async function addLights() {

    var light = new THREE.AmbientLight('#ffffff');
    light.name = "ambLight";
    scene.add(light);

    var spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(100, 1000, 100);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

  //  scene.add(spotLight);

}

export async function addFloor() {

    const geometry = new THREE.CylinderBufferGeometry(50, 50, 0.01, 32);

    const material = new THREE.MeshBasicMaterial({color: 0x001100});

    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 0, 0);

    cylinder.name = 'Floor';

    scene.add(cylinder);

    mvDw.push(cylinder);

}

export function addMoon() {

    const moonPosX = 5;
    const moonPosY = 5;
    const moonPosZ = -7.5;

    //sphere for moon
   // var geometry = new THREE.SphereBufferGeometry(2, 32, 32);
   var geometry = new THREE.CylinderBufferGeometry(0.05, 0.5, 0.01, 32);
   
   const txtr = new THREE.TextureLoader().load('06_media/moon.png');
   const material = new THREE.MeshBasicMaterial({ map: txtr, side: THREE.BackSide });


    // var material = new THREE.MeshBasicMaterial({
    //     color: 0xffff00,
    //     // emissive: 0xffff00,
    //     // transparent: true,
    //     // opacity: 0.5
    // })
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(moonPosX - 0.1, moonPosY - 0.2, moonPosZ - 0.1);
    sphere.rotation.set((-90 * Math.PI / 180),(10 * Math.PI / 180),(0 * Math.PI / 180));
    sphere.name = 'NewMoon';
    scene.add(sphere);
    mvDw.push(sphere);




    // lensflares
    var textureLoader = new THREE.TextureLoader();

    var textureFlare0 = textureLoader.load('06_media/lensflare/lensflare0.png');
    var textureFlare3 = textureLoader.load('06_media/lensflare/lensflare3.png');

    addLight(0.55, 0.9, 0.5);
  //  addLight(0.08, 0.8, 0.5);
  //  addLight(0.995, 0.5, 0.9);

    function addLight(h, s, l,) {

        var light = new THREE.PointLight(0xffffff, 1.5, 2000);
        light.color.setHSL(h, s, l);
        light.position.set(moonPosX, moonPosY, moonPosZ);
        light.name = "LFlight"
        scene.add(light);
        mvDw.push(light);

        var lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.06));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.07));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.09));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.1));
        light.add(lensflare);
        console.log(lensflare);
        console.log(light);

    }
}



export function markers2() {

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


export async function addSkyBox() {


    const txtr = new THREE.TextureLoader().load('06_media/cube/starbox.png');
    const skyMat = new THREE.MeshBasicMaterial({ map: txtr, side: THREE.BackSide });

    const skyboxGeo = new THREE.BoxGeometry(2000, 2000, 2000);
    const skybox = new THREE.Mesh(skyboxGeo, skyMat);
    //   scene.add(skybox);


}