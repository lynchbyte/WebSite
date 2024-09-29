import * as THREE from "three";

import { scene } from "./script.js";

export function loadBackground() {

  const group_BG = new THREE.Group();



  const size = 5;

  const geo_bg = new THREE.PlaneGeometry(size, size, 32, 32);

  //Shader Background Walls
  const material_bg = new THREE.ShaderMaterial({

    transparent: true,
    side: THREE.DoubleSide,

    vertexShader: `
        varying vec2 vUv;

        void main()
        {

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;

        }
    `,
    fragmentShader: `
        varying vec2 vUv;


float V(float v) {

    return v/255.0;

  }

float thickLine( float y, vec2 st, float offset, float width) {

    float edge = y-(offset*width);
    return step(edge-width, st.y) - step(edge, st.y);

  }


void main()

{

   vec3 col1 = vec3(V(215.0), V(195.0), V(195.0));
   vec3 col2 = vec3(V(235.0), V(207.0), V(186.0));
   vec3 col3 = vec3(V(233.0), V(220.0), V(201.0));
   vec3 col4 = vec3(V(200.0), V(200.0), V(200.0));
   vec3 col5 = vec3(V(109.0), V(110.0), V(128.0));


   vec2 st = vec2(vUv.x, vUv.y)  ;

   float width = (1.0/5.0);
   float y = 1.0;

    vec3 color = mix(col1, col2, thickLine(y, st, 1.0, width));
    color = mix(color, col3, thickLine(y, st, 2.0, width));
    color = mix(color, col4, thickLine(y, st, 3.0, width));
    color = mix(color, col5, thickLine(y, st, 4.0, width));

    float z = smoothstep(0.00,0.5,st.x);

  gl_FragColor = vec4(color, z);

}
  `

  });

  const mesh_bg = new THREE.Mesh(geo_bg, material_bg);
  mesh_bg.position.set(size / 2, 0, 0);
  group_BG.add(mesh_bg);

  const mesh_bg2 = mesh_bg.clone();

  mesh_bg2.scale.set = (0, 0, -1);
  mesh_bg2.rotateY(90 * Math.PI / 180);
  mesh_bg.position.set(0, 0, size / -2);

  group_BG.add(mesh_bg2);


  //Shader Background Floor
  const material_bg_floor = new THREE.ShaderMaterial({

    transparent: true,
    side: THREE.DoubleSide,

    vertexShader: `
        varying vec2 vUv;

void main()
{

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

     vUv = uv;
     
}
`,
    fragmentShader:`
      varying vec2 vUv;

    float V(float v) {

      return v / 255.0;

    }


void main()
{

      vec3 col5 = vec3(V(109.0), V(110.0), V(128.0));

      vec2 st = vec2(vUv.x, vUv.y)  ;

      float pct = 0.0;

      pct = distance(st, vec2(1.0));

      float z = smoothstep(1.0, 0.5, pct);

      gl_FragColor = vec4(col5, z);

    }
  `

  });

const mesh_bg_floor = new THREE.Mesh(geo_bg, material_bg_floor);


mesh_bg_floor.rotateX(-90 * Math.PI / 180);
mesh_bg_floor.position.set(0, -size / 2 + 0.001, 0);

group_BG.add(mesh_bg_floor);

scene.add(group_BG);
group_BG.position.set(0, 0.5, 0);
group_BG.rotateY(45 * Math.PI / 180);

}