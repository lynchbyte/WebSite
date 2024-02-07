/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 */

import { scene, controlArr, onSelectStart, onSelectEnd } from '../wbp_app.js'
import { addPaper } from '../03_js/wbp_paper.mjs';

let controller1, controller2;

var VRButton = {

	createButton: function (renderer, options) {

		if (options && options.referenceSpaceType) {

			renderer.xr.setReferenceSpaceType(options.referenceSpaceType);

		}

		function showEnterVR( /*device*/) {

			var currentSession = null;

			function onSessionStarted(session) {

				session.addEventListener('end', onSessionEnded);

				//	renderer.xr.setReferenceSpaceType('local-floor');//new

				renderer.xr.setSession(session);
				button.textContent = 'EXIT VR';

				currentSession = session;

				console.log('renderer xr', renderer.xr);

				// controllers helper
				var material = new THREE.LineBasicMaterial({ color: 0x000000 });
				var geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, - 1)]);
				var line = new THREE.Line(geometry, material);
				line.name = 'line';
				line.scale.z = 5;

				//add controllers here
				controller1 = renderer.xr.getController(0);
				controller1.add(line.clone());
				controller1.addEventListener('selectstart', onSelectStart);
				controller1.addEventListener('selectend', onSelectEnd);
				controlArr.push(controller1);
				scene.add(controller1)


				controller2 = renderer.xr.getController(1);
				controller2.add(line.clone());
				controller2.addEventListener('selectstart', onSelectStart);
				controller2.addEventListener('selectend', onSelectEnd);
				controlArr.push(controller2);
				scene.add(controller2);



			}

			function onSessionEnded( /*event*/) {

				currentSession.removeEventListener('end', onSessionEnded);

				button.textContent = 'ENTER VR';

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'ENTER VR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if (currentSession === null) {

					var sessionInit = { optionalFeatures: ['local-floor'] };
					navigator.xr.requestSession('immersive-vr', sessionInit)

						.then(onSessionStarted)

						///////////////////////////////////////////////////////////////////////////////////////////////////////////						
						.then(() => {

							console.log(`started...`);

							let visOn = [
								'Credits1',
								'Credits2',
								'Credits3',
								'ArrowUp',
								'ArrowDown',
								'Clear',
								'Exit',
								'CP',
								'CPBorder',
								'MainInd',
								'MainIndPlane',
								'MainIndPlaneBorder'
							];
							visOn.forEach((name) => {
								var object = scene.getObjectByName(name);
								object.visible = true;
							});

							let light = scene.getObjectByName('hemi');
							light.intensity = 0.5;

							let light2 = scene.getObjectByName('dir');
							light2.intensity = 0.5;

							let visOff = [
								'Title',
								"spot"
							];
							visOff.forEach((name) => {
								var object = scene.getObjectByName(name);
								scene.remove(object);


							});

							addPaper();

				
						}

						)
					///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

		function disposeButton() {


		}

		function showWebXRNotFound() {

			disableButton();

			button.textContent = 'VR NOT SUPPORTED';

		}

		function stylizeElement(element) {

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

		if ('xr' in navigator) {

			var button = document.createElement('button');
			//////////////////////////////////////////////////////////////////////////			
			button.id = 'butts1'
			/////////////////////////////////////////////////////////////////////////			
			button.style.display = 'none';

			stylizeElement(button);

			navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {

				supported ? showEnterVR() : showWebXRNotFound();

			});

			return button;

		} else {

			var message = document.createElement('a');
			message.href = 'https://immersiveweb.dev/';

			if (window.isSecureContext === false) {

				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement(message);

			return message;

		}

	}

};

export { VRButton };
