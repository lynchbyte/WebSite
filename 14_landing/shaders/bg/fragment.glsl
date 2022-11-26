
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

   vec3 red = vec3(V(200.0), V(69.0), V(87.0));
   vec3 orange = vec3(V(249.0), V(100.0), V(45.0));
   vec3 yellow = vec3(V(255.0), V(166.0), V(52.0));
   vec3 green = vec3(V(168.0), V(182.0), V(101.0));
   vec3 blue = vec3(V(45.0), V(112.0), V(171.0));
   vec3 indigo = vec3(V(106.0), V(136.0), V(184.0));
   vec3 violet = vec3(V(167.0), V(131.0), V(181.0));

   vec2 st = vec2(vUv.x, vUv.y)  ;

   float width = (1.0/7.0);
   float y = 1.0;

    vec3 color = mix(red, orange, thickLine(y, st, 1.0, width));
    color = mix(color, yellow, thickLine(y, st, 2.0, width));
    color = mix(color, green, thickLine(y, st, 3.0, width));
    color = mix(color, blue, thickLine(y, st, 4.0, width));
    color = mix(color, indigo, thickLine(y, st, 5.0, width));
    color = mix(color, violet, thickLine(y, st, 6.0, width));

    float z = smoothstep(0.01,0.95,st.x);
  
  gl_FragColor = vec4(color, z);
   
}