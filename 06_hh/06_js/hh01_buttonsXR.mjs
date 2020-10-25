
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

// var sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor'] };
// navigator.xr.requestSession('immersive-vr', sessionInit)


//step 1 - Query XR mode is supported //

export async function XRSuppQry() {


    if ('xr' in navigator) {

        const immersiveVROK = await navigator.xr.isSessionSupported("immersive-vr");
        if (immersiveVROK) {


            //step 2 - advertise XR functionality //
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

    var nB = document.createElement('button');

    nB.textContent = item.text;
    nB.id = item.name;
    stylizeElement(nB);

    nB.style.width = '25%';
    nB.font = 'IM Fell English SC';

    overlay.appendChild(nB);
    //step 3 - user-activation event//
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
            mkFg();
            moveDown();
            makeExit3DPlane();
            break;
        case 'immersive-ar':
            
            moveDown();
            makeExitDOM();
            //makeExit3DCube();
            break;
        case 'inline':
            mkFg();
            moveDown();
            makeExitDOM();
            break;
        case 'deskMobile':
            mkFg();
            makeExitDOM();
            // makeExit3DCube();
            return
            break;
        case 'deskDesk':
            mkFg();
            makeExitDOM();
            // makeExit3DCube();
            return;
            break;
    }

    try {

        //step 4 - request an immersive session from the device//
        //for inline
        if (type == 'inline') {

            var session = await navigator.xr.requestSession(type, {

                optionalFeatures: ['local']
            });

            var xrSession = session;

            onSessionStarted(xrSession, type);
        }
        //for immersive
        else {

            var session = await navigator.xr.requestSession(type);


            var xrSession = session;

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

    //step 5 - use the session to run a render loop //
    renderer.xr.setSession(session);

}

async function onSessionEnded() {

    console.log(`to do add end`);
   // location.reload();

}

async function makeExit3DPlane() {

    const ex = await new picNew(
        new THREE.PlaneBufferGeometry(1, 1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 'green' }),
        './06_media/exiit.png',         //url
        0, (-45 * (Math.PI / 180)), 0,          //rotX,rotY,rotZ
        3, 1.5, -3,                           //posX,posY,posZ
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

async function makeExit3DCube() {

    var texture = new THREE.TextureLoader().load('./06_media/exiit.png');

    var geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
    var material = new THREE.MeshBasicMaterial({ map: texture });

    var mesh = new THREE.Mesh(geometry, material);
    //to do add wireframe outline
    mesh.name = 'exit';
    mesh.position.set(7.5, 1.5, -3)
    scene.add(mesh);

}

async function makeExitDOM() {

    var x = document.getElementById("overlay2");

    x.style.display = "flex";

    var nB = document.createElement('button');

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


    for (var i = 0; i < mvDw.length; i++) {
        let ob = mvDw[i];
        console.log(ob);
        if (ob.name == "hhTxt1") { console.log(ob.position.y); }
        ob.translateY(-3);
        if (ob.name == "hhTxt1") { console.log(ob.position.y); }
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

function mkFg(){
    scene.fog = new THREE.FogExp2( scene.background, 0.02 );
}













