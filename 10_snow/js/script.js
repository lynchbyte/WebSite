/**
 * @author Shauna Lynch <lynchbyte.com>
 **/

import * as THREE from 'https://unpkg.com/three@0.133.1/build/three.module.js';

import { GLTFLoader } from './GLTFLoader.js'

const gltfLoader = new GLTFLoader();

const textureLoader = new THREE.TextureLoader();
const glbScl = 0.3;


const sound = new Howl({
    src: ['media/audio/o-christmas-tree.ogg'],
    volume: 0.25,
});

let controller;

let hitTestSource = null;
let hitTestSourceRequested = false;

//Clock
const clock = new THREE.Clock();


// //Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene
export const scene = new THREE.Scene();

export const globeGroup = new THREE.Group;

export const boxSnowArray = [];

const shakeEvent = new Shake({ threshold: 5 });
shakeEvent.start();
if (!("ondevicemotion" in window)) { alert("Shaking Not Supported on this device"); }

//star movement
let still = true;
let clampHeight = 0.3//heightest y value
var friction = 0.001;
let stars = false;

let globeNext;


//Camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
camera.position.set(0, 0, 2);
scene.add(camera);


//Lights
const hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);//0.3 on start, 2.2 withtree
hemi.position.set(0.0, -1, 0);
scene.add(hemi);
hemi.name = `Hemi`;

const lightD = new THREE.DirectionalLight(0xfff0dd, 1.4);
lightD.position.set(2, 0, 1.5);
lightD.castShadow = true

lightD.shadow.mapSize.width = 1024
lightD.shadow.mapSize.height = 1024

lightD.shadow.camera.near = 1
lightD.shadow.camera.far = 6

lightD.shadow.camera.top = 2
lightD.shadow.camera.right = 2
lightD.shadow.camera.bottom = - 2
lightD.shadow.camera.left = - 2

scene.add(lightD);



//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
//renderer.outputEncoding = THREE.sRGBEncoding;
//container.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);



controller = renderer.xr.getController(0);
controller.addEventListener('select', onSelect);
scene.add(controller);

const reticle = new THREE.Mesh(
    new THREE.RingGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2),
    new THREE.MeshBasicMaterial()
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;
reticle.name = `Reticle`;
scene.add(reticle);

//

makeLanding();
makeBase();


renderer.xr.addEventListener('sessionstart', onSesS);
renderer.xr.addEventListener('sessionend', onSesE);

window.addEventListener('resize', onWindowResize);

document.addEventListener('click', firstClick);

//shake time
window.addEventListener('shake', shaked);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

animate();

function onSesS(event) {

    console.log(`ar started`);

    //delete Instruct plane
    const object = scene.getObjectByName(`Instruct Plane`);
    scene.remove(object);

    const hl = scene.getObjectByName(`Hemi`);
    hl.intensity = 2.2;


}


function onSesE(event) {

    function stopShake() {
        shakeEvent.stop();
    }

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function firstClick() {

    //delete landing plane
    const object = scene.getObjectByName(`Landing Plane`);
    scene.remove(object);

    //add instruction plane
    makeInstruct();

    //AR Button
    document.body.appendChild(ARButton.createButton(renderer, {
        requiredFeatures: ['hit-test'],
        //  domOverlay: { root: document.body }
    }));

    //delete overlay
    document.getElementById("overlay").remove();

    //delete this event listener
    document.removeEventListener('click', firstClick);


}


function shaked() {

    console.log(`shaked...`);

    still = false;

    sound.play();

    window.removeEventListener("shaked", shaked)

    setTimeout(() => window.addEventListener('shake', shaked), 35000)

}

function onSelect() {

    if (reticle.visible) {

        const globe = scene.getObjectByName(`Globe`);
        globeNext = globe.clone();

        globeNext.position.setFromMatrixPosition(reticle.matrix);
        //  globeNext.position.setFromMatrixPosition(reticle.matrix);
        globeNext.visible = true;

        scene.add(globeNext);
        console.log(globeNext.position.x, globeNext.position.y, globeNext.position.z);

        addStars(globeNext.position.x, globeNext.position.y, globeNext.position.z);
        stars = true;

        const object = scene.getObjectByName(`Reticle`);
         scene.remove(object);
        //object.translateZ = -50;

    }

}

function animate() {

 

    renderer.setAnimationLoop(render);

}


function render(timestamp, frame) {

    const deltaTime = clock.getDelta()

    //for hit test
    if (frame) {

        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {

            session.requestReferenceSpace('viewer').then(function (referenceSpace) {

                session.requestHitTestSource({ space: referenceSpace }).then(function (source) {

                    hitTestSource = source;

                });

            });

            session.addEventListener('end', function () {

                hitTestSourceRequested = false;
                hitTestSource = null;

            });

            hitTestSourceRequested = true;

        }

        if (hitTestSource) {

            const hitTestResults = frame.getHitTestResults(hitTestSource);

            if (hitTestResults.length) {

                const hit = hitTestResults[0];

                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

            } else {

                reticle.visible = false;

            }

        }

    }

    if (stars !== false) {

        // Keep stars inside room
        clampHeight = clampHeight - 0.0001
        //console.log(clampHeight);


        //if y value to low, reset stars to still
        if (clampHeight < globeNext.position.y) {  //<0.3
            //stop moving
            still = true;

            //settle stars on base
            for (let i = 0; i < boxSnowArray.length; i++) {
                const object = boxSnowArray[i];
                object.position.y = globeNext.position.y + 0.02;
            }
        }

        if (still !== true) {

            //   console.log(`true`);

            for (let i = 0; i < boxSnowArray.length; i++) {

                const star = boxSnowArray[i];

                const gnx = globeNext.position.x;
                const gny = globeNext.position.y;
                const gnz = globeNext.position.z;

                // const star10 = boxSnowArray[9];
                // star.rotation.x += 0.1;

                // console.log(star10.rotation.x);
                // star.rotation.needsUpdate = true;

                // let cuv = star.userData.velocity.multiplyScalar(1 - (0.1 * deltaTime) * friction);  //normal speed

                let cuv = star.userData.velocity.multiplyScalar(1 - (0.1 * deltaTime));

                //slow down stars
               // friction += 0.000001

                star.position.add(cuv);

                if (star.position.x < gnx - 0.075 || star.position.x > gnx + 0.075) {

                    star.position.x = THREE.MathUtils.clamp(star.position.x, gnx - 0.075,  gnx + 0.075);
                    cuv.x = - cuv.x;

                }

                if (star.position.y < gny || star.position.y > gny + clampHeight) {

                    star.position.y = THREE.MathUtils.clamp(star.position.y, gny , gny + clampHeight);
                    cuv.y = - cuv.y;

                }

                if (star.position.z < gnz - 0.075 || star.position.z > gnz + 0.075) {

                    star.position.z = THREE.MathUtils.clamp(star.position.z, gnz - 0.075, gnz + 0.075);
                    cuv.z = - cuv.z;

                }

                star.rotation.x += cuv.x * 2 * deltaTime;
                star.rotation.y += cuv.y * 2 * deltaTime;
                star.rotation.z += cuv.z * 2 * deltaTime;

            }
        }

    }

    renderer.render(scene, camera);

}












   function makeBase() {

    //base lathe
    const points = [];
    points.push(new THREE.Vector2(0.4, 0));
    points.push(new THREE.Vector2(0.4, 0.08));
    points.push(new THREE.Vector2(0.35, 0.08));
    points.push(new THREE.Vector2(0.35, 0.12));
    points.push(new THREE.Vector2(0.375, 0.12));
    points.push(new THREE.Vector2(0.375, 0.18));

    const geometryL = new THREE.LatheGeometry(points);
    const materialL = new THREE.MeshLambertMaterial({ color: 0x4d2600 });
    const lathe = new THREE.Mesh(geometryL, materialL);
    lathe.castShadow = true;
    lathe.receiveShadow = true;
    globeGroup.add(lathe);

    const baseCyG = new THREE.CylinderGeometry(0.4, 0.4, 0.0002, 32);
    const baseCy = new THREE.Mesh(baseCyG, materialL);
    globeGroup.add(baseCy);

    const topCyG = new THREE.CylinderGeometry(0.375, 0.375, 0.0002, 32);
    const topCy = new THREE.Mesh(topCyG, materialL);
    topCy.position.set(0, 0.18, 0);
    globeGroup.add(topCy);

    //sphere
    const geometryS = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, 2.4);
    const materialS = new THREE.MeshPhysicalMaterial({
        // metalness: 0,  
        //roughness: 0.9,
        roughness: 0,
        transmission: 1,
        thickness: 0.5,
    });

    const sphere = new THREE.Mesh(geometryS, materialS);
    sphere.position.set(0, 0.55, 0);
    globeGroup.add(sphere);


    //Load Tree
    //const gltfLoader = new GLTFLoader();

    const onLoad = (gltf, position, scale, rotation, modelName) => {

        console.log(`GLTF`, gltf);

        const model = gltf.scenes[0].children[0];

        model.position.copy(position);
        model.scale.copy(scale);
        model.setRotationFromEuler(rotation);
        model.name = modelName

        model.traverse(function (o) {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        globeGroup.add(model);

    };

    const onProgress = (z) => { console.log(`${z.loaded / z.total * 100}%`); };
    const onError = (errorMessage) => { console.log(errorMessage); };

    const treePosition = new THREE.Vector3(0, 0.3, 0);
    const treeScale = new THREE.Vector3(0.04, 0.04, 0.04);
    const treeRotation = new THREE.Euler((-90 * Math.PI / 180), (0 * Math.PI / 180), (90 * Math.PI / 180))
    const treeName = "Tree"

    gltfLoader.load('./media/Tree/scene.gltf', gltf => onLoad(
        gltf, treePosition, treeScale, treeRotation, treeName
    ), onProgress, onError);




    globeGroup.scale.set(glbScl, glbScl, glbScl);
    globeGroup.visible = false;
    globeGroup.name = `Globe`;

    scene.add(globeGroup);
    console.log(`globe Group; `, globeGroup);


}
   function addStars(rctlX, rctlY, rctlZ) {

    //star shape
    for (let i = 0; i < 150; i++) {


        const pts2 = [], numPts = 5;

        for (let i = 0; i < numPts * 2; i++) {

            const l = i % 2 == 1 ? 10 : 20;

            const a = i / numPts * Math.PI;

            pts2.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));

        }

        const shp = new THREE.Shape(pts2);
        const gS = new THREE.ShapeGeometry(shp);
        gS.scale(0.001, 0.001, 0.001);

        const object = new THREE.Mesh(gS, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        //     object.position.x = (Math.random() * 0.4 - 0.2) * glbScl;
        //    // object.position.y = Math.random() * 4;
        //     object.position.y = 0.2;
        //     object.position.z = (Math.random() * 0.4 - 0.2) * glbScl;

        object.position.x = rctlX;
        object.position.y = rctlY - 0.05;
        object.position.z = rctlZ;

        object.rotation.x = rctlX + Math.random() * 2 * Math.PI;
        object.rotation.y = rctlY + Math.random() * 2 * Math.PI;
        object.rotation.z = rctlZ + Math.random() * 2 * Math.PI;

        object.scale.x = (Math.random() + 0.5) * glbScl;
        object.scale.y = (Math.random() + 0.5) * glbScl;
        object.scale.z = (Math.random() + 0.5) * glbScl;

        object.userData.velocity = new THREE.Vector3();
        object.userData.velocity.x = Math.random() * 0.0025//Math.random() * 0.01 - 0.005;
        object.userData.velocity.y = Math.random() * 0.0025//Math.random() * 0.01 - 0.005;
        object.userData.velocity.z = Math.random() * 0.0025//Math.random() * 0.01 - 0.005;

        boxSnowArray.push(object);

        scene.add(object);
    }

}

   function makeLanding() {

    const landTexture = textureLoader.load('media/landing.webp');
    const landGeo = new THREE.PlaneGeometry(1, 1, 32, 32);
    const landMat = new THREE.MeshLambertMaterial({ map: landTexture });
    const landMesh = new THREE.Mesh(landGeo, landMat);
    landMesh.position.set(0, 0, 0.5);
    landMesh.name = `Landing Plane`;
    scene.add(landMesh)

}


   function makeInstruct() {

    const instructTexture = textureLoader.load('media/instruct.webp');
    const instructGeo = new THREE.PlaneGeometry(1, 1, 32, 32);
    const instructMat = new THREE.MeshLambertMaterial({ map: instructTexture });
    const instructMesh = new THREE.Mesh(instructGeo, instructMat);
    instructMesh.position.set(0, 0, 0.5);
    instructMesh.name = `Instruct Plane`;
    scene.add(instructMesh)


}

class ARButton {

	static createButton( renderer, sessionInit = {} ) {

		const button = document.createElement( 'button' );

		function showStartAR( /*device*/ ) {

			if ( sessionInit.domOverlay === undefined ) {

				var overlay = document.createElement( 'div' );
				overlay.style.display = 'none';
				document.body.appendChild( overlay );

				var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
				svg.setAttribute( 'width', 38 );
				svg.setAttribute( 'height', 38 );
				svg.style.position = 'absolute';
				svg.style.right = '20px';
				svg.style.top = '20px';
				svg.addEventListener( 'click', function () {

					currentSession.end();

				} );
				overlay.appendChild( svg );

				var path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
				path.setAttribute( 'd', 'M 12,12 L 28,28 M 28,12 12,28' );
				path.setAttribute( 'stroke', '#fff' );
				path.setAttribute( 'stroke-width', 2 );
				svg.appendChild( path );

				if ( sessionInit.optionalFeatures === undefined ) {

					sessionInit.optionalFeatures = [];

				}

				sessionInit.optionalFeatures.push( 'dom-overlay' );
				sessionInit.domOverlay = { root: overlay };


			}

			//

			let currentSession = null;

			async function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setReferenceSpaceType( 'local' );

				await renderer.xr.setSession( session );

				button.textContent = 'STOP AR';
				sessionInit.domOverlay.root.style.display = '';

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'START AR';
				sessionInit.domOverlay.root.style.display = 'none';

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'START AR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if ( currentSession === null ) {

					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		function stylizeElement( element ) {

			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}

		if ( 'xr' in navigator ) {

			button.id = 'ARButton';
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotSupported );

			return button;

		} else {

			const message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

		}

	}

}

export { ARButton };
