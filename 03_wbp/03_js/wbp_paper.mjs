/**
 * @author Shauna Lynch <lynchbyte.com>
 */
import { scene, group, paperWidth, paperHeight, paperYpos, paperZpos, paperXrot  } from '../wbp_app.js';

export async function addPaper() {

    var canvas = document.createElement('canvas');
    canvas.width = 1.5 * 512;
    canvas.height = 512;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var paperTexture = new THREE.Texture(canvas);
    var paperMaterial = new THREE.MeshBasicMaterial({ map: paperTexture });
    var paperPlane = new THREE.PlaneGeometry(paperWidth, paperHeight, 1, 1);
    var paper = new THREE.Mesh(paperPlane, paperMaterial);
    paper.position.set(0, paperYpos, paperZpos);
    paper.rotation.set(paperXrot, 0, 0);
    paper.name = 'Paper';

    scene.add(paper);
    paperMaterial.map.needsUpdate = true;

    var ob = scene.getObjectByName('Paper');
    // ob.material = new THREE.MeshBasicMaterial({ map: paperTexture });
    ob.material.map.needsUpdate = true;

    group.add(paper);
    
}



