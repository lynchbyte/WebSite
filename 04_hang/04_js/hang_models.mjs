/**
 * @author Shauna Lynch <lynchbyte.com>
 */
import { scene } from '../hang_app.js';
import { modNew } from '../../js/_modelNewClassG.mjs';

 export async function addBoots() {

 	let path = '04_media/glb/';
 	let glbFile = 'CowboyBoots.glb';

	const boots = await new modNew(
		new THREE.PlaneBufferGeometry(0.01, 0.01, 1, 1),
		new THREE.MeshPhongMaterial({ color: 'green' }),
		path, glbFile, 
		(90 * Math.PI / 180), 0,(180 * Math.PI / 180),  //RotX,RotY,RotZ (180 * Math.PI / 180)
		0,0,0,            								//PosX,PosY,PosZ
		1,                           					//Scale
		'Boots' ,                       				//name;

	)

	scene.add(boots);

 }