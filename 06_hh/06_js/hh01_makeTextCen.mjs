/**
 * @author Shauna Lynch <lynchbyte.com.au>
 **/

import {  scene , txtArr, mvDw } from '../hh01.js';

import * as THREE from '../../js/three.module.js';

export function makeTextCentJus(content, name, sz, thk, color, posX, posY, posZ, rotX, rotY, rotZ  ) {
  var loader = new THREE.FontLoader();
				loader.load( './06_media/font/IM FELL English SC_Regular.json', function ( font ) {
        //use http://gero3.github.io/facetype.js/ to make custom fonts

					var geometry = new THREE.TextBufferGeometry( content, {
						font: font,
						size: sz,
						height: thk,
            bevelEnabled: true,
            bevelThickness: thk*0.2,
            bevelSize: thk*0.2,
            bevelSegments: 5
					} );
					var materialText = new THREE.MeshPhongMaterial( {
						color: color,
				    specular: 0xe34a33,
						reflectivity: 0.5,
						shininess: 5,
								} );					
          var newTextCen= new THREE.Mesh( geometry, materialText );
          
         newTextCen.name = name;
          newTextCen.position.set(0,0,0);
          newTextCen.visible = true;
          scene.add(newTextCen);
          newTextCen.material.transparent = true;
         // newTextCen.material.opacity = 0.001;
          txtArr.push(newTextCen);
          mvDw.push(newTextCen);

          //find box size of text
          var box = new THREE.Box3().setFromObject(newTextCen);
          var textBoxSize = new THREE.Vector3();
          box.getSize( textBoxSize )
					//console.log( box.min, box.max, box.getSize( textBoxSize ) );
        
          newTextCen.rotation.set(rotX, rotY, rotZ);
          newTextCen.position.set(posX,posY,posZ);

          newTextCen.translateX (-textBoxSize.x/2);	
          newTextCen.translateY (-textBoxSize.y/2);
          newTextCen.translateZ (-textBoxSize.z/2);	

          newTextCen.updateMatrixWorld();
         
  });
}