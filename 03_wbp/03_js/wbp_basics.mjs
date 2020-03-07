/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */

import { scene, camera } from '../wbp_app.js';


export async function addLights() {

    var hemi = new THREE.HemisphereLight(0x808080, 0x606060, 0.2);
    hemi.name = "hemi"
    scene.add(hemi);

    var light = new THREE.DirectionalLight(0xffffff, 0.1);
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

    var geometry = new THREE.PlaneBufferGeometry(20, 20);
    var material = new THREE.MeshStandardMaterial({
        color: 0X2f4f4f
    });
    var floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

}

export function lightbulb() {

    //sphere for lightbulb
    var geometry = new THREE.SphereBufferGeometry(0.05, 32, 32);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        transparent: true,
        opacity: 0.5
    })
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0.98, 1.73, -1.73);
    scene.add(sphere);

  
    //stemkosi glow shader
    var geometry2 = new THREE.SphereBufferGeometry(0.06, 32, 32);

    var customMaterial = new THREE.ShaderMaterial(
        {
            uniforms:
            {
                "c": { type: "f", value: 1.0 },
                "p": { type: "f", value: 1.4 },
                glowColor: { type: "c", value: new THREE.Color(0xffff00) },
                viewVector: { type: "v3", value: camera.position }
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
    var moonGlow = new THREE.Mesh(geometry2, customMaterial);

    moonGlow.position.set(0.98, 1.73, -1.73);
    moonGlow.scale.multiplyScalar(1.1);
    scene.add(moonGlow);

    //add spotlight
    var spotLight = new THREE.SpotLight(0xffffff, 3);
    spotLight.position.copy(sphere.position);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 40;
    spotLight.shadow.camera.fov = 30;

    spotLight.name = "spot";

    scene.add(spotLight);

    let lightTarget = new THREE.Object3D();
    lightTarget.position.set(-1,0,-1);
    scene.add(lightTarget);
    spotLight.target = lightTarget;
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