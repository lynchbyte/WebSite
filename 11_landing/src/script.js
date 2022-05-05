/**
 * @author Shauna Lynch <lynchbyte.com>
 **/


import {

    BoxBufferGeometry,
    Clock,
    Color,
    Euler,
    FileLoader,
    InstancedMesh,
    LoadingManager,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    Object3D,
    PerspectiveCamera,
    PlaneGeometry,
    RepeatWrapping,
    Quaternion,
    Scene,
    ShaderMaterial,
    Shape,
    ShapeGeometry,
    TextureLoader,
    Vector2,
    Vector3,
    WebGLRenderer,

    //Other Module Imports

    //EffectComposer
    BufferGeometry,
    //Clock,
    Float32BufferAttribute,
    //Mesh,
    OrthographicCamera,
    //Vector2,
    WebGLRenderTarget,

    //Pass
    //BufferGeometry,
    //Float32BufferAttribute,
    //OrthographicCamera,
    //Mesh,

    //Shader Pass
    //ShaderMaterial,
    UniformsUtils,


    //Unreal Bloom
    AdditiveBlending,
	// Color,
	// MeshBasicMaterial,
	// ShaderMaterial,
	// UniformsUtils,
	// Vector2,
	// Vector3,
	// WebGLRenderTarget


    //Orbit Controller
    EventDispatcher,
    MOUSE,
    //Quaternion,
    Spherical,
    TOUCH,
    //Vector2,
    //Vector3,


    //GLTF Loader
    AnimationClip,
    Bone,
    Box3,
    BufferAttribute,
    //BufferGeometry,
    ClampToEdgeWrapping,
    //Color,
    DirectionalLight,
    DoubleSide,
    //FileLoader,
    FrontSide,
    Group,
    ImageBitmapLoader,
    InterleavedBuffer,
    InterleavedBufferAttribute,
    Interpolant,
    InterpolateDiscrete,
    InterpolateLinear,
    Line,
    LineBasicMaterial,
    LineLoop,
    LineSegments,
    LinearFilter,
    LinearMipmapLinearFilter,
    LinearMipmapNearestFilter,
    Loader,
    LoaderUtils,
    Material,
    MathUtils,
    //Matrix4,
    //Mesh,
    //MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    MirroredRepeatWrapping,
    NearestFilter,
    NearestMipmapLinearFilter,
    NearestMipmapNearestFilter,
    NumberKeyframeTrack,
    //Object3D,
    //OrthographicCamera,
    //PerspectiveCamera,
    PointLight,
    Points,
    PointsMaterial,
    PropertyBinding,
    //Quaternion,
    QuaternionKeyframeTrack,
    //RepeatWrapping,
    Skeleton,
    SkinnedMesh,
    Sphere,
    SpotLight,
    TangentSpaceNormalMap,
    Texture,
    //TextureLoader,
    TriangleFanDrawMode,
    TriangleStripDrawMode,
    //Vector2,
    //Vector3,
    VectorKeyframeTrack,
    sRGBEncoding



} from 'https://unpkg.com/three@0.140.0/build/three.module.js';

import { GLTFLoader } from './jsm_R140/GLTFLoader.js';

import { EffectComposer } from './jsm_R140//EffectComposer.js';
import { RenderPass } from './jsm_R140/RenderPass.js';
import { UnrealBloomPass } from './jsm_R140/UnrealBloomPass.js';





//////////////  GLOBAL VARIABLES  /////////////////////

let shaderMaterial, mesh;  //shader plane
let mouseX = 0;
let mouseY = 0;
let marker;  //cameraTarget


let composer;

const params = {

    exposure: 0.92,
    bloomStrength: 0.4,  //oscillate between 0.4 and 1.5
    bloomThreshold: 0,
    bloomRadius: 2

};




//render update stars rotation
let dummy = new Object3D();
let mat4 = new Matrix4();

//html black screen and spinning circles
const blackOutElement = document.querySelector('.blackout');

///////////////  SCENE SETUP  /////////////////////

//Canvas
const canvas = document.querySelector('.webgl');

//Scene
const scene = new Scene();

//Clock
const clock = new Clock();
let previousTime = 0;

//canvas size
let sizes = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight
}

//Loading manager
const loadingManager = new LoadingManager(
    // Loaded
    () => {
        console.log('loaded');

        makeShaderPlane();

        removeFadeOut(blackOutElement, 2000);

        updateText();

    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {

        console.log(itemUrl, itemsLoaded, itemsTotal);

    }
)

//Loaders
const textureLoader = new TextureLoader(loadingManager);
const fileLoader = new FileLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);

//Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 1);
scene.add(camera);

//Renderer
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

//marker 0,0,0, for camera Target
const g = new BoxBufferGeometry(0.01, 0.01, 0.01);
const m = new MeshNormalMaterial();
marker = new Mesh(g, m);
marker.visible = false;
scene.add(marker);

//Lights
// const ambientLight = new  AmbientLight(0xffffff, 0.5);
// //scene.add(ambientLight);

// const light = new  PointLight(0xffffff, 1);
// light.position.x = 2;
// light.position.y = 3;
// light.position.z = -2;
// //scene.add(light);

///////////////  SHADERS  /////////////////////

//SHADER
//for shader plane
//based on https://stemkoski.github.io/ js/Shader-Animate.html
//galaxy photo 
//https://unsplash.com/photos/0o_GEzyargo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
const noiseTexture = textureLoader.load('./11_landing/src/media/cloud.png');
noiseTexture.wrapS = noiseTexture.wrapT = RepeatWrapping;
const waterTexture = textureLoader.load('./11_landing/src/media/Alex.webp');
waterTexture.wrapS = waterTexture.wrapT = RepeatWrapping;

let vertsh, fragsh;

fileLoader.load('./11_landing/src/shaders/galaxy/vertex.glsl', data => vertsh = data);
fileLoader.load('./11_landing/src/shaders/galaxy/fragment.glsl', data => fragsh = data);

// //SHADER
// //for text
// let vertshFr, fragshFr;

// fileLoader.load('./11_landing/shaders/fren/vertex.glsl', data => vertshFr = data);
// fileLoader.load('./11_landing/shaders/fren/fragment.glsl', data => fragshFr = data);

// //SHADER
// //for stars
// let vertshSt, fragshSt;
// fileLoader.load('./11_landing/shaders/glow/vertex.glsl', data => vertshSt = data);
// fileLoader.load('./11_landing/shaders/glow/fragment.glsl', data => fragshSt = data);


///////////////  MODELS  /////////////////////

//model of text
const onLoad = (gltf, position, scale, rotation) => {

    console.log(`GLTF`, gltf);

    const model = gltf.scene;

    model.position.copy(position);
    model.scale.copy(scale);
    model.setRotationFromEuler(rotation);

    model.traverse(function (o) {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
        }
    });

    scene.add(model);

};

const textPosition = new Vector3(0, 0.125, 0);
const textScale = new Vector3(0.35, 0.35, 0.35);
const textRotation = new Euler((90 * Math.PI / 180), (0 * Math.PI / 180), (0 * Math.PI / 180))

gltfLoader.load('./11_landing/src/media/lb.glb', gltf => onLoad(gltf,

    textPosition, textScale, textRotation,

),

);

///////////////  PARTICLES  /////////////////////

//PARTICLES
const count = 800;

//create star
const pts2 = [], numPts = 5;

for (let i = 0; i < numPts * 2; i++) {

    const l = i % 2 == 1 ? 10 : 20;

    const a = i / numPts * Math.PI;

    const scaleFactor = 0.00025;

    pts2.push(new Vector2(Math.cos(a) * l * scaleFactor, Math.sin(a) * l * scaleFactor));

}

const shp = new Shape(pts2);
const gS = new ShapeGeometry(shp);

// const shaderMaterialSt = new  ShaderMaterial({

//     vertexShader: vertshSt,
//     fragmentShader: fragshSt,
//     uniforms:
//     {
//         uFrequency: { value: new  Vector2(10, 5) },
//         uTime: { value: 0 },
//         uColor: { value: new  Color('orange') },

//     }
//    // transparent: true,

// });

//const starInsMesh = new  InstancedMesh(gS, shaderMaterialSt, count);

const starInsMesh = new InstancedMesh(gS, new MeshBasicMaterial(), count);

const matrix = new Matrix4();


let lightness = 25

for (let i = 0; i < count; i++) {

    randomizeMatrix(matrix);

    starInsMesh.setMatrixAt(i, matrix);

    let col = new Color(`hsl(64, 63%, ${lightness}% )`); //46

    starInsMesh.setColorAt(i, col);

    // starInsMesh.setColorAt(i, new  Color(0xabb337));

    //  console.log(`lightness`, col)

    lightness = lightness + 1;

    if (lightness == 90) { lightness = 25 }


}
console.log(starInsMesh);

scene.add(starInsMesh);



///////////////  EVENT LISTENERS  /////////////////////

//Event Listeners
window.addEventListener('resize', () => {

    sizes = {
        width: window.innerWidth * 0.9,
        height: window.innerHeight
    }

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);

});

document.addEventListener('mousemove', onDocumentMouseMove, false);//rotate scene

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function randomizeMatrix(matrix) {

    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3();

    position.x = (Math.random() * 10 - 5)
    // Math.random() * 40 - 20;
    position.y = (Math.random() * 5 - 2.5)
    //Math.random() * 40 - 20;
    position.z = -0;
    //position.z = -1 * (Math.random() * 11) - 9
    // Math.random() * 40 - 20;
    // console.log(position.z)

    rotation.x = 0
    //Math.random() * 2 * Math.PI;
    rotation.y = 0
    // Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler(rotation);

    scale.x = scale.y = scale.z = Math.random() * 3;

    return (matrix.compose(position, quaternion, scale));

};

function removeFadeOut(el, speed) {
    var seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";

    el.style.opacity = 0;
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, speed);
}

//update material of model to shader material
function updateText() {

    const tt = scene.getObjectByName(`Lynch_Byte`);

    const shaderMaterialNr = new MeshNormalMaterial();
    tt.material = shaderMaterialNr;

}

function makeShaderPlane() {

    const geometry = new PlaneGeometry(140, 140, 32, 32);

    shaderMaterial = new ShaderMaterial({

        vertexShader: vertsh,
        fragmentShader: fragsh,
        uniforms:
        {
            baseTexture: { value: waterTexture },
            baseSpeed: { value: 0.005 },
            noiseTexture: { value: noiseTexture },
            noiseScale: { value: 10 },
            alpha: { value: 0.4 },
            time: { value: 1 }

        }

    });
    shaderMaterial.transparent = true;


    mesh = new Mesh(geometry, shaderMaterial);
    mesh.position.set(0, 0, -20);
    scene.add(mesh);
    // console.log(`mesh added;`, mesh)

}

function onDocumentMouseMove(event) {

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerWidth) * 2 + 1;

}

//Animate
let bpStrength
let bpMax = 3

const animate = () => {

 

    //Draw calls
    console.log(`Draw Calls`, renderer.info.render.calls);

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // Update shader material 
    if (mesh != undefined) {

        shaderMaterial.uniforms.time.value = elapsedTime;

    }


    if (starInsMesh) {

        for (let i = 0; i < count; i++) {

            starInsMesh.getMatrixAt(i, mat4);
            mat4.decompose(dummy.position, dummy.quaternion, dummy.scale);

            //rotate star locally
            dummy.rotation.z += deltaTime * (i % 2 == 0 ? -2 * Math.random() : 1 * Math.random());

            dummy.updateMatrix();
            starInsMesh.setMatrixAt(i, dummy.matrix);

        }

        starInsMesh.instanceMatrix.needsUpdate = true;
    }


    //  sway scene with mouse position
    camera.lookAt(marker.position);
    camera.position.x += (mouseX - camera.position.x) * 0.0005;


    bpStrength = Number(Math.sin((elapsedTime)) + 1) / 2;

    let bpValue = bpStrength > bpMax ? bpMax : bpStrength
    bloomPass.strength = bpValue

    console.log(bloomPass.strength)

    // Render
    // renderer.render(scene, camera);
    composer.render();


    // Call animate again on the next frame
    window.requestAnimationFrame(animate);

}


animate();

