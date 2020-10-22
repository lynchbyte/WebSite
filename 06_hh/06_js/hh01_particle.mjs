/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */

import { scene, sparkle } from '../hh01.js';

export async function addSparkle() {

    const count = 50;

    for (var i = 0; i < count; i++) {

        // const vol = 100;

        var spriteMap = new THREE.TextureLoader().load("06_media/spark2.png");
        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
        var sprk = new THREE.Sprite(spriteMaterial);
        sprk.name = "sprk";
        scene.add(sprk);

        //between -50 and 50
        let randomNumberX = (Math.random() * 101) - 50;
        let randomNumberZ = (Math.random() * 101) - 50;
        //stay positive
        let randomNumberY = (Math.random() * 10) + 1;

        sprk.position.x = randomNumberX;
        sprk.position.y = randomNumberY+1.5;
        sprk.position.z = randomNumberZ;

        sprk.userData.velocity = new THREE.Vector3();
        sprk.userData.velocity.x = Math.random() * 0.0075;
        sprk.userData.velocity.y = Math.random() * 0.005;
        sprk.userData.velocity.z = Math.random() * 0.0065;

        //TODO add random rotation userdata

        scene.add(sprk);
        sparkle.push(sprk);
    }

}

export async function addBat() {


    const count = 50;

    for (var i = 0; i < count; i++) {

        //  const vol = 100;

        var spriteMap = new THREE.TextureLoader().load("06_media/bat1.png");
        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
        var bat = new THREE.Sprite(spriteMaterial);
        bat.name = 'bat';
        scene.add(bat);

        //between -25 and 25
        let randomNumberX = (Math.random() * 51) - 25;
        let randomNumberZ = (Math.random() * 51) - 25;

        //stay positive
        let randomNumberY = (Math.random() * 10) + 1;

        bat.position.x = randomNumberX;
        bat.position.y = randomNumberY;
        bat.position.z = randomNumberZ;

        bat.userData.velocity = new THREE.Vector3();
        bat.userData.velocity.x = Math.random() * 0.1 - 0.05;
        bat.userData.velocity.y = Math.random() * 0.1 - 0.05;
        bat.userData.velocity.z = Math.random() * 0.1 - 0.05;

        //bat.castShadow = true;

        scene.add(bat);
        sparkle.push(bat);
    }
}


