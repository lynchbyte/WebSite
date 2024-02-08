/**
 * @author Shauna Lynch <lynchbyte.com>
 */
import { scene, clickRoom } from '../hang_app.js';
import { picNew } from '../../js/_picNewClass.mjs';

export async function addPicTitle() {

    const tp = new picNew(

        new THREE.PlaneBufferGeometry(1.8, 1.8, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'white' }),
        './04_media/hangManTitle.png',      //url
        0, (0 * (Math.PI / 180)), 0,        //rotX,rotY,rotZ (180 * (Math.PI / 180)
        0, 1.25, -1,                        //posX,posY,posZ
        'Title',                            //name
        true,                               //vis
        true,                               //recShad, 
        true                                //castShad,

    );

    scene.add(tp);

}

export async function addCredits1() {

    const cr1 =  new picNew(

        new THREE.PlaneBufferGeometry(1, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 'white' }),
        '../../01_media/lynchbyte.png',     //url
        0, (-45 * (Math.PI / 180)), 0,      //rotX,rotY,rotZ   
        3.5, 0.5, -3,                       //posX,posY,posZ
        'Credits1',                         //name
        true,                               //vis
        false,                              //recShad, 
        false                               //castShad,

    );

    scene.add(cr1);

}

export async function makePicReplay() {

    const picSz2 = 0.5;//size of button for group

    const rp =  new picNew(
        new THREE.PlaneBufferGeometry(picSz2, picSz2, 1, 1),     
        new THREE.MeshPhongMaterial({ color: 'green' }),     
        './04_media/hangManReplay.png',         //url
        0, (-45 * (Math.PI / 180)), 0,          //rotX,rotY,rotZ
        3.5, 1.5, -3,                           //posX,posY,posZ
        'rp',                                   //name
        true,                                   //vis
        false,                                  //recShad, 
        false,                                  //castShad,

    );
    const oldMat = rp.material;

    rp.material = new THREE.MeshPhongMaterial({
        color: oldMat.color,
        map: oldMat.map,
        transparent: true
    });

    scene.add(rp);
    clickRoom.push(rp);

}

export async function makePicCatSt() {

    const picSz3 = 1;//size of button for group

    const rcs = new picNew(
        new THREE.PlaneBufferGeometry(picSz3, 0.5 * picSz3, 1, 1),      
        new THREE.MeshPhongMaterial({ color: 'green' }),    
        './04_media/hangManCat2.jpg',       //url
        0, (0 * (Math.PI / 180)), 0,        //rotX,rotY,rotZ
        0, 1, -2,                           //posX,posY,posZ
        'tcs',                              //name
        true,                               //vis      
        false,                              //recShad, 
        false,                              //castShad,

    );

    scene.add(rcs);

}

export async function makePicCat() {

    const picSz3 = 1;

    const rc = new picNew(
        new THREE.PlaneBufferGeometry(picSz3, 0.5 * picSz3, 1, 1),     
        new THREE.MeshPhongMaterial({ color: 'green' }),     
        './04_media/hangManCat2.jpg',       //url
        0, (-45 * (Math.PI / 180)), 0,      //rotX,rotY,rotZ     
        3.5, 2.25, -3,                      //posX,posY,posZ
        'tc',                               //name
        true,                               //vis       
        false,                              //recShad, 
        false,                              //castShad,

    );

    scene.add(rc);

}

export async function makePicDrag() {

    const picSz5 = 1;

    const dp = new picNew(
        new THREE.PlaneBufferGeometry(picSz5, picSz5, 1, 1),      
        new THREE.MeshPhongMaterial({ color: 'green' }),     
        './04_media/hangManDrag.jpg',       //url
        0, (0 * (Math.PI / 180)), 0,        //rotX,rotY,rotZ
        0, 1.6, -4.0,                       //posX,posY,posZ
        'dragMesh',                         //name
        true,                               //vis
        false,                              //recShad, 
        false,                              //castShad,

    );

    scene.add(dp);

}

export async function makePicStart() {

    const picSz5 = 1;

    const sp = new picNew(
        new THREE.PlaneBufferGeometry(picSz5, picSz5, 1, 1),     
        new THREE.MeshPhongMaterial({ color: 'green' }),    
        './04_media/hangManStart.png',         //url
        0, (0 * (Math.PI / 180)), 0,           //rotX,rotY,rotZ
        0, 2, -2,                              //posX,posY,posZ
        'startMesh',                           //name
        true,                                  //vis
        false,                                 //recShad, 
        false,                                 //castShad,

    );

    const oldMat = sp.material;

    sp.material = new THREE.MeshPhongMaterial({
        color: oldMat.color,
        map: oldMat.map,
        transparent: true
    });

    scene.add(sp);
    clickRoom.push(sp);

}


export async function makePicExit() {

    const picSz6 = 0.5;

    const ex = new picNew(
        new THREE.PlaneBufferGeometry(picSz6,  picSz6, 1, 1),     
        new THREE.MeshPhongMaterial({ color: 'green' }),     
        './04_media/hangManExit.png',       //url
        0, (-45 * (Math.PI / 180)), 0,      //rotX,rotY,rotZ     
        3.5, -1, -3,                      //posX,posY,posZ
        'ex',                               //name
        true,                               //vis       
        false,                              //recShad, 
        false,                              //castShad,

    );

    scene.add(ex);

}