/**
 * @author Shauna Lynch <lynchbyte.com>
 * 
 */

import { scene, mvDw } from '../hh01.js';

import { Lensflare, LensflareElement } from '../../js/Lensflare.js';


export function addLights() {

    const light = new THREE.AmbientLight('#ffffff', 0.25);
    light.name = "ambLight";
    scene.add(light);

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.25 );
    dirLight.position.set( 0, 0, 1 ).normalize();
    scene.add( dirLight );

}

export function addFloor() {

    const gF = new THREE.PlaneBufferGeometry(150, 150, 1, 1);
    const mF = new THREE.MeshBasicMaterial({ color: 'black' });

    const nwGrnd = new THREE.Mesh(gF, mF);
    nwGrnd.rotation.set((-90 * (Math.PI / 180)), 0, 0,);
    nwGrnd.position.set(0, 0.05, -5);
    // nwGrnd.recieve.shadow = true;
    nwGrnd.name = "Floor";
    scene.add(nwGrnd);
    mvDw.push(nwGrnd);

}

export async function addMoon() {

    const moonPosX = 4.5;
    const moonPosY = 8;
    const moonPosZ = -30;

    //sphere for moon
    const gM = new THREE.CylinderBufferGeometry(0.1, 1, 0.01, 32);

    const tM = new THREE.TextureLoader().load('06_media/moon.png');
    const mM = new THREE.MeshBasicMaterial({ map: tM, side: THREE.BackSide });

    const sphere = new THREE.Mesh(gM, tM);
    sphere.position.set(moonPosX - 0.1, moonPosY - 0.2, moonPosZ - 0.1);
    sphere.rotation.set((-90 * Math.PI / 180), (10 * Math.PI / 180), (0 * Math.PI / 180));
    sphere.name = 'NewMoon';
    scene.add(sphere);

    // lensflares
    const textureLoader = new THREE.TextureLoader();
    const textureFlare0 = textureLoader.load('06_media/lensflare/lensflare0.png');
    const textureFlare3 = textureLoader.load('06_media/lensflare/lensflare3.png');

    addLight(0.55, 0.9, 0.5);
   // addLight(0.08, 0.8, 0.5);
   // addLight(0.995, 0.5, 0.9);

    function addLight(h, s, l,) {

        const light = new THREE.PointLight(0xffffff, 0.25);
        light.color.setHSL(h, s, l);
        light.position.set(moonPosX, moonPosY, moonPosZ);
        light.name = "LFlight"
        scene.add(light);
      

        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.06));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.07));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.09));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.1));
        light.add(lensflare);

    }
}

export function markers() {

    const g = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const m = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(g, m);
    scene.add(mesh);

    const mesh2 = mesh.clone();
    mesh2.position.set(0, 1, 0);
    scene.add(mesh2);

    const mesh3 = mesh.clone();
    mesh3.position.set(0, 2, 0);
    scene.add(mesh3);
}

export function addSkyDome() {

    const skyGeo = new THREE.SphereGeometry(100, 25, 25);
    const clr = new THREE.Color(0x15141f);//dark purple
    const skyMat = new THREE.MeshBasicMaterial({ color: clr })
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.material.side = THREE.BackSide;
    sky.name = 'SkyDome';
    scene.add(sky);

}