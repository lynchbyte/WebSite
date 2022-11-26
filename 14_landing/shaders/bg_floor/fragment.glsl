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

  vec3 violet = vec3(V(167.0), V(131.0), V(181.0));

  vec2 st = vec2(vUv.x, vUv.y)  ;

  float pct = 0.0;

  pct = distance(st,vec2(1.0));

  vec3 alpha = vec3(pct);
  
  gl_FragColor = vec4(violet, 1.0 - ( alpha));
   
}