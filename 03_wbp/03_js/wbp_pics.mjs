/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */
import { scene, group } from '../wbp_app.js';
import { picNew } from '../../js/_picNewClass.mjs';

export async function addPicTitle() {

    const tp = await new picNew(

        new THREE.PlaneBufferGeometry(0.9,0.9, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'white' }),
        './03_media/wbp_title.png',     //url
        -42 * (Math.PI / 180), 0, 0,    //rotX,rotY,rotZ (180 * (Math.PI / 180)
        0, 1.26,-1.55,                  //posX,posY,posZ
        'Title',                        //name
        true,                           //vis
        true,                           //recShad, 
        true                            //castShad,
       
    );

   scene.add(tp);
 
  const oldMat = tp.material;
  
  tp.material = new THREE.MeshPhongMaterial( {
    color: oldMat.color,
    map: oldMat.map,
   });
}

export async function addCredits1() {

    const cr1 = await new picNew(

        new THREE.PlaneBufferGeometry(0.5, 0.5, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'white' }),
        './03_media/Credits/wbpCredit01.png',       //url
        0, (90 * Math.PI / 180), 0,                 //rotX,rotY,rotZ (180 * (Math.PI / 180)
        -1.4, 2, 0.75,                                 //posX,posY,posZ
        'Credits1',                                 //name
        false,                                      //vis
        false,                                      //recShad, 
        false                                       //castShad,

    );

    scene.add(cr1);
}

export async function addCredits2() {

    const cr2 = await new picNew(

        new THREE.PlaneBufferGeometry(0.5, 0.5, 1, 1),
        new THREE.MeshLambertMaterial({ color: 'white' }),
        './03_media/Credits/wbpCredit02.png',     //url
        0, (90 * Math.PI / 180), 0,               //rotX,rotY,rotZ (180 * (Math.PI / 180)
        -1.4, 1.4, 0.75,                             //posX,posY,posZ
        'Credits2',                               //name
        false,                                    //vis
        false,                                    //recShad, 
        false                                     //castShad,

    );

    scene.add(cr2);
}

export async function addCredits3() {

    const cr3 = await new picNew(

        new THREE.PlaneBufferGeometry(0.75, 0.75, 1, 1),
        new THREE.MeshLambertMaterial({ color: 'white' }),
        './03_media/Credits/wbpCredit03.png',       //url
        0, (90 * Math.PI / 180), 0,                 //rotX,rotY,rotZ (180 * (Math.PI / 180)
        -1.4, 1.7, 0,                            //posX,posY,posZ
        'Credits3',                                 //name
        true,                                      //vis
        false,                                      //recShad, 
        false                                       //castShad,

    );

    scene.add(cr3);
}

export async function addArrowUp() {

    const aUp = await new picNew(

        new THREE.PlaneBufferGeometry(0.2, 0.2, 1, 1),
        new THREE.MeshLambertMaterial({ color: 'white' }),
        './03_media/arrowUp.png',           //url
        0, (0 * Math.PI / 180), 0,          //rotX,rotY,rotZ (180 * (Math.PI / 180)
        0.375, 2.025, -1.7,                 //posX,posY,posZ
        'ArrowUp',                          //name
        false,                              //vis
        false,                              //recShad, 
        false                               //castShad,

    );

    scene.add(aUp);
    group.add(aUp);
}


export async function addArrowDown() {

    const aDown = await new picNew(

        new THREE.PlaneBufferGeometry(0.2, 0.2, 1, 1),
        new THREE.MeshLambertMaterial({ color: 'white' }),
        './03_media/arrowDown.png',         //url
        0, (0 * Math.PI / 180), 0,          //rotX,rotY,rotZ (180 * (Math.PI / 180)
        0.375, 1.775, -1.7,                 //posX,posY,posZ
        'ArrowDown',                        //name
        false,                              //vis
        false,                              //recShad, 
        false                               //castShad,

    );

    scene.add(aDown);
    group.add(aDown);
}

export async function addClear() {

    const clr = await new picNew(

        new THREE.PlaneBufferGeometry(0.2, 0.2, 1, 1),
        new THREE.MeshLambertMaterial({ color: 'white' }),
        './03_media/clear.png',     //url
        0, (0 * Math.PI / 180), 0,                       //rotX,rotY,rotZ (180 * (Math.PI / 180)
        0.625, 2.025, -1.7,                      //posX,posY,posZ
        'Clear',                        //name
        false,           //vis
        false,                           //recShad, 
        false                            //castShad,

    );

    scene.add(clr);
    group.add(clr);
}


export async function addExit() {

    const ext = await new picNew(

        new THREE.PlaneBufferGeometry(0.2, 0.2, 1, 1),
        new THREE.MeshLambertMaterial({ color: 'white' }),
        './03_media/download.png',     //url
        0, (0 * Math.PI / 180), 0,                       //rotX,rotY,rotZ (180 * (Math.PI / 180)
        0.625, 1.775, -1.7,                      //posX,posY,posZ
        'Exit',                        //name
        false,                   //vis
        false,                           //recShad, 
        false                            //castShad,

    );

    scene.add(ext);
    group.add(ext);
}



