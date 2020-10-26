/**
 * @author Shauna Lynch <lynchbyte.com>
 */

import { AlphaGrp, clickRoom } from '../hang_app.js';
import { picNew } from '../../js/_picNewClass.mjs';

const picLet = 0.4;

const path = './04_media/letters/';

const alphabet1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',];

export async function makePicAlpha1() {

    for (var i = 0; i < alphabet1.length; i++) {
        const incrX = 0.45;
        const farX = ((alphabet1.length + 1) * incrX - 1) / -2
        const xPos = farX + ((i) * incrX)
        const picAlpha1 = await new picNew(
            new THREE.PlaneBufferGeometry(picLet, picLet, 1, 1),    //geometry
            new THREE.MeshPhongMaterial({ color: 'green' }),        //material,
            `${path + alphabet1[i]}.png`,                           //url
            0, (0 * (Math.PI / 180)), 0,                                                //rotX,rotY,rotZ      
            xPos, 3.5, -4,                                         //posX,posY,posZ                                  
            `${alphabet1[i]}`,                                      //name
            true,                                                   //vis
            false,                                                  //recShad, 
            false                                                   //castShad,

        );

        const oldMat = picAlpha1.material;

        picAlpha1.material = new THREE.MeshPhongMaterial({
            color: oldMat.color,
            map: oldMat.map,
            transparent: true
        });

        AlphaGrp.add(picAlpha1);
        clickRoom.push(picAlpha1);

    }
}

const alphabet2 = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];

export async function makePicAlpha2() {

    for (var i = 0; i < alphabet2.length; i++) {
        const incrX = 0.45;
        const farX = ((alphabet2.length + 1) * incrX - 1) / -2
        const xPos = farX + ((i) * incrX)
        const picAlpha2 = await new picNew(
            new THREE.PlaneBufferGeometry(picLet, picLet, 1, 1),    //geometry
            new THREE.MeshPhongMaterial({ color: 'green' }),        //material,
            `${path + alphabet2[i]}.png`,                           //url
            0, (0 * (Math.PI / 180)), 0,                                                //rotX,rotY,rotZ  
            xPos, 3, -4,                                       //posX,posY,posZ
            `${alphabet2[i]}`,                                     //name
            true,                                                   //vis
            false,                                                  //recShad, 
            false                                                   //castShad,

        );
        const oldMat = picAlpha2.material;

        picAlpha2.material = new THREE.MeshPhongMaterial({
            color: oldMat.color,
            map: oldMat.map,
            transparent: true
        });

        AlphaGrp.add(picAlpha2);
        clickRoom.push(picAlpha2);

    }
}

const alphabet3 = ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export async function makePicAlpha3() {

    for (var i = 0; i < alphabet3.length; i++) {
        const incrX = 0.45;
        const farX = ((alphabet3.length + 1) * incrX - 1) / -2
        const xPos = farX + ((i) * incrX)
        const picAlpha3 = await new picNew(
            new THREE.PlaneBufferGeometry(picLet, picLet, 1, 1),    //geometry
            new THREE.MeshPhongMaterial({ color: 'green' }),        //material,
            `${path + alphabet3[i]}.png`,                           //url
            0, (0 * (Math.PI / 180)), 0,                                                //rotX,rotY,rotZ
            xPos, 2.5, -4,                                         //posX,posY,posZ
            `${alphabet3[i]}`,                                      //name
            true,                                                   //vis
            false,                                                  //recShad, 
            false                                                   //castShad,

        );
        const oldMat = picAlpha3.material;

        picAlpha3.material = new THREE.MeshPhongMaterial({
            color: oldMat.color,
            map: oldMat.map,
            transparent: true
        });

        AlphaGrp.add(picAlpha3);
        clickRoom.push(picAlpha3);

    }
}