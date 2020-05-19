/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 */

import { scene } from '../hit_app.js'
import { worder } from './hit_Scaler.mjs';

var ARButton = {

	createButton: function (renderer, sessionInit = {}) {

		function showStartAR( /*device*/) {

			var currentSession = null;

			function onSessionStarted(session) {

				session.addEventListener('end', onSessionEnded);

				/*
				session.updateWorldTrackingState( {
					'planeDetectionState': { 'enabled': true }
				} );
				*/

				renderer.xr.setReferenceSpaceType('local');
				renderer.xr.setSession(session);
				button.textContent = 'STOP AR';

				currentSession = session;
				//////////////////////////////////////////////////////

				//turn off background color
				scene.background = null;

				//no show castle
				var object = scene.getObjectByName('Castle');
				object.visible = false;

			;
				//delete ground
				var grd = scene.getObjectByName('ground');
				scene.remove(grd);

				//change fog
				scene.fog.near = 50;
				scene.fog.far = 1000;


				var pw = scene.getObjectByName('Warn');
				pw.visible = true;
	
				setTimeout( () => {
					
					pw.visible = false;
				  }, 10000);


	

				/////////////////////////////////////////////////

			}

			function onSessionEnded( /*event*/) {

				currentSession.removeEventListener('end', onSessionEnded);

				button.textContent = 'START AR';

				currentSession = null;



			}

			//
			addAreaBut();

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = '2. START AR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if (currentSession === null) {

					navigator.xr.requestSession('immersive-ar', sessionInit).then(onSessionStarted);

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

		function stylizeElement(element) {

			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';

			element.style.color = 'blue';
			element.style.border = '1px solid #00f';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}

		if ('xr' in navigator) {

			var button = document.createElement('button');
			button.style.display = 'none';

			stylizeElement(button);
			button.style.left = 'calc(33% - 75px)';


			navigator.xr.isSessionSupported('immersive-ar').then(function (supported) {

				supported ? showStartAR() : showARNotSupported();

			}).catch(showARNotSupported);

			return button;

		} else {

			var message = document.createElement('a');

			if (window.isSecureContext === false) {

				message.href = document.location.href.replace(/^http:/, 'https:');
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement(message);

			return message;

		}
		//////////////////////////////////////////////



		function addAreaBut() {

			var buttonA = document.createElement('buttonA');
			buttonA.textContent = '1. SET FLOOR AREA';
			stylizeElement(buttonA);
			buttonA.style.top = "70px";
			buttonA.style.bottom = 'initial';
			buttonA.style.left = 'calc(50% - 60px)';

			document.body.appendChild(buttonA);

			buttonA.onmouseenter = function () {
				buttonA.style.opacity = '1.0';
			};

			buttonA.onmouseleave = function () {
				buttonA.style.opacity = '0.5';
			};

			buttonA.onclick = function () {

				//delete info div
				document.getElementById("info").remove();

				buttonA.remove();

				var Object1 = {
					name: "but_1",
					text: "1m x 1m - Table Top",
					top: "20px",
					modelSz: "0.01",
					press: 'console.log("Button1 pressed")'
				};
				var Object2 = {
					name: "but_2",
					text: "2m x 2m - Small Floor Space",
					top: "70px",
					modelSz: "0.04",
					press: 'console.log("Button2 pressed")'
				};
				var Object3 = {
					name: "but_3",
					text: "5m x 5m - Medium Floor Space",
					top: "120px",
					modelSz: "0.08",
					press: 'console.log("Button3 pressed")'
				};
				var Object4 = {
					name: "but_4",
					text: "10m x 10m - Large Floor Area",
					top: "170px",
					modelSz: "0.16",
					press: 'console.log("Button4 pressed")'
				};

				var Object5 = {
					name: "but_5",
					text: "Full Size",
					top: "220px",
					modelSz: "1",
					press: 'console.log("Button5 pressed")'
				};

				var ar = [Object1, Object2, Object3, Object4, Object5];

				ar.forEach(function (item) {

					var nB = document.createElement('button');
					nB.textContent = item.text;
					nB.id = item.name;
					stylizeElement(nB);
					nB.style.top = item.top;
					nB.style.bottom = 'initial';
					nB.style.left = 'calc(25% - 75px)';

					document.body.appendChild(nB);
					nB.onmouseenter = function () {
						nB.style.opacity = '1.0';
					};

					nB.onmouseleave = function () {
						nB.style.opacity = '0.5';
					};

					nB.onclick = function () {
						var factor = item.modelSz;
						worder.set(factor);

						//delete all size buttons
						for (var i = 0; i < ar.length; i += 1) {

							var x = ar[i].name;
							document.getElementById(x).remove();

						}

						
					}

				

				});

			////////////////////////////////////////////


		}
	}

	
	

}

};

export { ARButton };
