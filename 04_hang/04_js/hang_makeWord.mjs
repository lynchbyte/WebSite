/**
 * @author Shauna Lynch <lynchbyte.com>
 */
import { scene, cities } from '../hang_app.js';

export const worder = (function () {

    const holder = [`hello`];

    return {
        get: function () {

            return holder[0];
        },

        set: function () {

            holder.pop();
            var num = Math.floor(Math.random() * cities.length);
            var theWord = cities[num];
            cities.splice(num, 1);

            console.log(theWord);
            console.log(cities);
   
            //make spacers
            for (var i = 0; i < theWord.length; i++) {

                const incrX = 0.5;
                const farX = (theWord.length - 1) * incrX / -2;
                const xPos = farX + ((i) * incrX)
                const spacerGeo = new THREE.PlaneBufferGeometry(0.45, 0.45, 1, 1);
                const spacerMat = new THREE.MeshBasicMaterial({ color: 0x696969, side: THREE.DoubleSide });
                const spacerMesh = new THREE.Mesh(spacerGeo, spacerMat);
                spacerMesh.userData = ({ isSpacer: true });
                spacerMesh.name = (`spacerMesh${i}`);
                spacerMesh.rotation.set(0, (0 * (Math.PI / 180)), 0);
                spacerMesh.position.set(xPos, 0.7, -4);
                scene.add(spacerMesh);

            }

            holder.push(theWord);

        },

        }
  
}());