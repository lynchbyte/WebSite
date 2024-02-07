/**
 * @author Shauna Lynch <lynchbyte.com>
 */
import { scene } from '../wbp_app.js';
import { modNew } from '../../js/_modelNewClassG.mjs';


 export async function addEasel() {

 	let path = '03_media/GLB/';
 	let glbFile = 'easel4.glb';

	const easel = new modNew(
		new THREE.PlaneBufferGeometry(0.01, 0.01, 1, 1),
		new THREE.MeshPhongMaterial({ color: 'green' }),
		path, glbFile, 
		(-18 * Math.PI / 180), 0, (-2 * Math.PI / 180),  						//modelRotX,modelRotY,modelRotZ (180 * Math.PI / 180)
		0.1, -0.18, -1.425,            	//modelPosX,modelPosY,modelPosZ
		5.2,                           	//modelScale
		'Easel' ,                       //name;

	)

	scene.add(easel);

 }

 
	