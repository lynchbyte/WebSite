/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */
import { Mesh } from '../js/three.module.js'

class picNew extends Mesh {
    constructor( geometry, material, url,  rotX, rotY, rotZ, posX, posY, posZ,  name, vis, recShad, castShad, ) {

        super(geometry, material);

        this.geometry = geometry,  
        this.material = material,      
        this.url = url;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.name = name;
        this.vis = vis;
        this.recShad = recShad;
        this.castShad = castShad;
        
        const texxture = new THREE.TextureLoader().load(url);

        this.material = new THREE.MeshBasicMaterial({ map: texxture });//

        
        const newPicMesh = new THREE.Mesh(this.geometry, this.material);
        
        newPicMesh.rotation.set(this.rotX, this.rotY, this.rotZ);
        newPicMesh.position.set(this.posX, this.posY, this.posZ);
        newPicMesh.userData = { homePosX: this.posX, homePosY: this.posY, homePosZ: this.posZ }
        newPicMesh.visible = true;
        newPicMesh.material.side = THREE.DoubleSide;
        newPicMesh.name = this.name;
        newPicMesh.visible = this.vis;
        newPicMesh.receiveShadow = this.recShad;
        newPicMesh.castShadow = this.castShad;   

       return newPicMesh;        

    }
}

export  {picNew};





