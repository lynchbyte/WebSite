/**
 * @author Shauna Lynch <lynchbyte.com.au>
 **/

import { scene, txtArr, mvDw } from '../hh01.js';

export function makeTextCentJus(content, name, sz, thk, color, posX, posY, posZ, rotX, rotY, rotZ) {
  const loader = new THREE.FontLoader();
  loader.load('./06_media/font/IM FELL English SC_Regular.json', function (font) {

    const geometry = new THREE.TextBufferGeometry(content, {
      font: font,
      size: sz,
      height: thk,
      bevelEnabled: true,
      bevelThickness: thk * 0.2,
      bevelSize: thk * 0.2,
      bevelSegments: 5
    });
   
    const materialText = new THREE.MeshPhongMaterial({
      color: color,
      specular: 0xe34a33,
      reflectivity: 0.5,
      shininess: 100,
      flatShading: true
    });
    const newTextCen = new THREE.Mesh(geometry, materialText);

    newTextCen.name = name;
    newTextCen.position.set(0, 0, 0);
    newTextCen.visible = true;
    scene.add(newTextCen);
    newTextCen.material.transparent = true;
    // newTextCen.material.opacity = 0.001;
    txtArr.push(newTextCen);
    mvDw.push(newTextCen);

    //find box size of text
    const box = new THREE.Box3().setFromObject(newTextCen);
    const textBoxSize = new THREE.Vector3();
    box.getSize(textBoxSize);

    newTextCen.rotation.set(rotX, rotY, rotZ);
    newTextCen.position.set(posX, posY, posZ);

    newTextCen.translateX(-textBoxSize.x / 2);
    newTextCen.translateY(-textBoxSize.y / 2);
    newTextCen.translateZ(-textBoxSize.z / 2);

    newTextCen.updateMatrixWorld();

  });
}