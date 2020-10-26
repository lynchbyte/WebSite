
/**
 * @author Shauna Lynch <lynchbyte.com>
 * 
 */

import { scene, camera, clickRoom, renderer, mvDw } from '../hh01.js'
import { picNew } from '../../js/_picNewClass.mjs';

let xrSession = null;

const Object1 = {
    name: "but_1",
    text: "VR",
    top: "20px",
    xrType: 'immersive-vr'
};

const Object2 = {
    name: "but_2",
    text: "AR",
    top: "80px",
    xrType: 'immersive-ar'

};

const Object3 = {
    name: "but_3",
    text: "Magic Window",
    top: "140px",
    xrType: 'inline'

};

const Object4 = {
    name: "but_4",
    text: "Desktop",
    top: "200px",
    xrType: 'deskMobile'

};

const Object5 = {
    name: "but_5",
    text: "Desktop Only - No WebXR",
    top: "260px",
    xrType: 'deskDesk'

};

//1 - Query XR mode is supported //
export async function XRSuppQry() {

    if ('xr' in navigator) {

        const immersiveVROK = await navigator.xr.isSessionSupported("immersive-vr");
        if (immersiveVROK) {

            //2 - advertise XR functionality //
            makeButton(Object1)
        }

        const immersiveAROK = await navigator.xr.isSessionSupported('immersive-ar');
        if (immersiveAROK) {

            makeButton(Object2);

            makeButton(Object3);

            makeButton(Object4);

        }

        else {

            makeButton(Object5);

        }

    }
}

function makeButton(item) {

    const nB = document.createElement('button');

    nB.textContent = item.text;
    nB.id = item.name;
    stylizeElement(nB);

    nB.style.width = '25%';
    nB.font = 'IM Fell English SC';

    overlay.appendChild(nB);

    //3 - user-activation event//
    nB.onclick = function () {

        overlay.remove();

        if (item.xrType == null) { return }
        else {

            startSession(item.xrType);

        }
    }
}

async function startSession(type) {

    switch (type) {
        case 'immersive-vr':            
            moveDown();
            makeExit3DPlane();
            infOff();
            break;

        case 'immersive-ar':
            arEnv();
            moveDown();
            makeExitDOM();
            infOff();            
            break;

        case 'inline':            
            moveDown();
            makeExitDOM();
            infOff();
            break;

        case 'deskMobile':            
            makeExitDOM();
            infOff();            
            return
            break;

        case 'deskDesk':            
            makeExitDOM();
            infOff();            
            return;
            break;
    }

    try {

        //4 - request an immersive session from the device//
        //for inline
        if (type == 'inline') {

            const session = await navigator.xr.requestSession(type, {

                optionalFeatures: ['local']
            });

            const xrSession = session;

            onSessionStarted(xrSession, type);
        }
        //for immersive
        else {

            const session = await navigator.xr.requestSession(type);


            const xrSession = session;

            onSessionStarted(xrSession);
        }

    } catch (error) {

        console.log(error);
        alert("Failed to start Web XR session.", error);

    }

}

function onSessionStarted(session) {

    session.addEventListener('end', onSessionEnded);
    console.log(`session started`, session);
    console.log(camera.position);
    console.log(scene);
    console.log(renderer);

    renderer.xr.setReferenceSpaceType('local');

    //5 - use the session to run a render loop //
    renderer.xr.setSession(session);

}

async function onSessionEnded() {

    console.log(`ended`);

}

async function makeExit3DPlane() {

    const ex = await new picNew(
        new THREE.PlaneBufferGeometry(1, 1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 'green' }),
        './06_media/exiit.png',         //url
        0, (-45 * (Math.PI / 180)), 0,          //rotX,rotY,rotZ
        5, 0.5, -3,                           //posX,posY,posZ
        'exit',                                   //name
        true,                                   //vis
        false,                                  //recShad, 
        false,                                  //castShad,

    );
    const oldMat = ex.material;

    ex.material = new THREE.MeshPhongMaterial({
        color: oldMat.color,
        map: oldMat.map,
        transparent: true
    });

    scene.add(ex);
    clickRoom.push(ex);

}

async function makeExitDOM() {

    const x = document.getElementById("overlay2");

    x.style.display = "flex";

    const nB = document.createElement('button');

    nB.textContent = 'EXIT';

    stylizeElement(nB);
    nB.style.marginBottom = '0';
    nB.style.padding = '5px 5px ';
    nB.style.fontSize = '10px';

    x.appendChild(nB);

    nB.onclick = function () {
        location.reload();
    }

}

function moveDown() {

    for (let i = 0; i < mvDw.length; i++) {
        let ob = mvDw[i];
        console.log(ob);

        //fix
        if (ob.name == "hhTxt1") { console.log(ob.position.y); }
        ob.translateY(-3);
        if (ob.name == "hhTxt2") { console.log(ob.position.y); }
        ob.updateMatrixWorld();
    }

}

function stylizeElement(element) {

    element.style.marginBottom = '20px';
    element.style.padding = '16px 16px ';
    element.style.border = '2px solid black';
    element.style.background = 'orange';
    element.style.color = 'black';
    element.style.textAlign = 'center';
    element.style.outline = 'none';
    element.style.zIndex = '4';

}

function arEnv() {

    const ob1 = scene.getObjectByName('SkyDome');
    scene.remove(ob1);

    const ob2 = scene.getObjectByName('Floor');
    scene.remove(ob2);

    const ob3 = scene.getObjectByName("LFlight", true);
    scene.remove(ob3);

    scene.fog.near = 0.1;
    scene.fog.far = 0;

}

function infOff(){
const x = document.getElementById("info");

x.style.display = "none";
}














