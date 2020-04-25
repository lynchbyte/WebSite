import { scene , crosses} from '../hang_app.js';


export function makeCross(){
        
    
            //make crosses
            for (var i = 0; i < 8; i++) {
                const url = './04_media/hangManCross.png'

                const incrX = 0.5;
                const farX = (7) * incrX / -2;
                const xPos = farX + ((i) * incrX)
                const crossGeo = new THREE.PlaneBufferGeometry(0.45, 0.45, 1, 1);
                const texxture = new THREE.TextureLoader().load(url);

      
                const crossMat = new THREE.MeshBasicMaterial({ map: texxture ,  transparent: true , opacity: 0.1});
                const crossMesh = new THREE.Mesh(crossGeo, crossMat);
                crossMesh.userData = ({ iscross: true });
                crossMesh.name = (`Cross${i}`);
                crossMesh.rotation.set(0, (0 * (Math.PI / 180)), 0);
                crossMesh.position.set(xPos, 0.1, -4);
                scene.add(crossMesh);
                crosses.push(crossMesh);

            }
        }