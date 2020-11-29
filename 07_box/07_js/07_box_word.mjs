/**
 * @author Shauna Lynch <lynchbyte.com>
 * 
 */

import { scene, fall, pts } from '../box.dev.js';

export function makeMesh() {

    const mp = new THREE.MeshLambertMaterial({
        color: 0xff5a3f,
       //color: 'orange',
    });

    const gp = new THREE.BoxBufferGeometry(1, 1, 1);

    for (let i = 0; i < pts.length; i++) {

        let a = pts[i];
        const mesh = new THREE.Mesh(gp, mp);
        mesh.position.set(a.x, a.y, a.z);
        mesh.rotation.set(0, 0, 0);
        mesh.userData = { homePosX: a.x, homePosY: a.y, homePosZ: a.z, homeRotX: 0, homeRotY: 0, homeRotZ: 0 };
        mesh.name = "mesh" + i;
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        scene.add(mesh);
        fall.push(mesh);

    }

}




