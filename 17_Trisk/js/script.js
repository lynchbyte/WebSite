import*as THREE from"three";let altVar,tiltVar,levelsVar,hudsPlane;const hudVarsArr=[];function addXR_UI(){const e=new THREE.PlaneGeometry(.01,.01),t=new THREE.PlaneGeometry(1.5,2.2),n=new THREE.MeshStandardMaterial({color:"grey",side:THREE.DoubleSide}),o=new THREE.MeshStandardMaterial({color:16777215,side:THREE.DoubleSide,transparent:!0,opacity:.5}),r=new THREE.Mesh(e,n);r.name="UI_UIplane";const a=new THREE.Mesh(e,n);a.position.set(-1.5,.1,0),r.add(a);const i=createText("🏠",.4,"Courier New",!0);i.position.set(0,0,0),i.name="home",a.add(i),clickable_3D.push(i);const s=createText("⏫",.4,"Courier New",!0);s.position.set(0,.5,0),s.name="altUp",a.add(s),clickable_3D.push(s);const l=createText("⏬",.4,"Courier New",!0);l.position.set(0,-.5,0),l.name="altDown",a.add(l),clickable_3D.push(l);const d=createText("↪️",.4,"Courier New",!0);d.position.set(0,1,0),d.rotation.set(0,0,-Math.PI/2),d.name="tiltUp",a.add(d),clickable_3D.push(d);const c=createText("↩️",.4,"Courier New",!0);c.position.set(0,-1,0),c.rotation.set(0,0,-Math.PI/2),c.name="tiltDown",a.add(c),clickable_3D.push(c);const E=new THREE.CircleGeometry(.3,32,0,6.28),u=new THREE.MeshStandardMaterial({color:"orange"}),T=new THREE.Mesh(E,u);T.position.set(-.8,0,0),T.name="Launch",a.add(T),clickable_3D.push(T);const h=createText("Launch",.15,"Courier New",!1);h.position.set(-.8,0,.01),a.add(h),hudsPlane=new THREE.Mesh(t,o),hudsPlane.position.set(1.5,0,0),r.add(hudsPlane);const m=createText("Altitude (m)",.2,"Courier New",!1);m.position.set(0,.9,.01),hudsPlane.add(m),altVar=createText(`${balloonStats.Altitude}`,.2,"Courier New",!1),altVar.position.set(0,.6,.01),altVar.name="altVar",hudsPlane.add(altVar);const w=createText("Tilt (deg)",.2,"Courier New",!1);w.position.set(0,.15,.01),hudsPlane.add(w),tiltVar=createText(`${THREE.MathUtils.radToDeg(balloonStats.Tilt)}`,.2,"Courier New",!1),tiltVar.position.set(0,-.15,.01),tiltVar.name="tiltVar",hudsPlane.add(tiltVar);const p=createText("Level",.2,"Courier New",!1);p.position.set(0,-.6,.01),hudsPlane.add(p),levelsVar=createText(`${balloonStats.Level}`,.2,"Courier New",!0),levelsVar.position.set(0,-.9,.01),levelsVar.name="levelsVar",hudsPlane.add(levelsVar),hudVarsArr.push(altVar,tiltVar,levelsVar);const R=createText("Exit",.2,"Courier New",!1);R.position.set(2.75,0,.01),R.name="exitVR",r.add(R),clickable_3D.push(R),r.position.set(0,0,-3.5),vehicle.add(r)}let newAngle;function upDateHuds(){0!=renderer.xr.isPresenting&&(newAngle=THREE.MathUtils.radToDeg(balloonStats.Tilt).toFixed(1),switcheroo(altVar,balloonStats.Altitude.toFixed(0),altVar.position,"altVar"),switcheroo(tiltVar,newAngle,tiltVar.position,"tiltVar"),switcheroo(levelsVar,balloonStats.Level,levelsVar.position,"levelsVar"))}function switcheroo(e,t,n,o){removeOb(o,hudsPlane),(e=createText(`${t}`,.2,"Courier New",!1)).position.set(n.x,n.y,n.z),e.name=o,hudsPlane.add(e)}function addBalloon(){const e=new THREE.Mesh(new THREE.SphereGeometry(.005,32,16),new THREE.MeshStandardMaterial);vehicle.add(e),e.visible=!1;const t=new THREE.Group,n=new THREE.Group,o=new THREE.MeshStandardMaterial({color:new THREE.Color(16711782),side:THREE.DoubleSide,flatShading:!0}),r=new THREE.SphereGeometry(2.5,16,32,0,6.283185,0,.5*Math.PI),a=new THREE.SphereGeometry(2.5,16,32,0,6.283185,.1*Math.PI,.4*Math.PI),i=new THREE.Mesh(r,o);t.add(i);const s=new THREE.Mesh(a,o);s.rotation.set(Math.PI/180*180,0,0),s.scale.set(1,1.15,1),t.add(s),vehicle.add(t);const l=new THREE.RingGeometry(1,.9,32,1,0,THREE.MathUtils.degToRad(330)),d=new THREE.MeshBasicMaterial({color:new THREE.Color(6697728),side:THREE.DoubleSide}),c=new THREE.Mesh(l,d);c.position.set(0,-1,0),c.rotation.set(THREE.MathUtils.degToRad(90),0,THREE.MathUtils.degToRad(-75));for(let e=0;e<8;e++){const t=c.clone();t.position.set(0,-.1*e,0);const o=1+-.05*(e+1);t.scale.set(o,o,o),n.add(t)}vehicle.add(n),t.translateY(3.5),n.translateY(-.5),vehicle.traverse((function(e){e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)})),dummyOb.add(vehicle)}function addBalloonOther(){const e=[new THREE.Vector2(0,0),new THREE.Vector2(1,0),new THREE.Vector2(1.5,1),new THREE.Vector2(.1,1),new THREE.Vector2(.1,2),new THREE.Vector2(2,2),new THREE.Vector2(6.81,9.8),new THREE.Vector2(7.69,11.8),new THREE.Vector2(7.99,13.8),new THREE.Vector2(7.79,15.8),new THREE.Vector2(7.04,17.8),new THREE.Vector2(5.51,19.8),new THREE.Vector2(1.77,21.8),new THREE.Vector2(0,21.8)],t=new THREE.LatheGeometry(e),n=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,flatShading:!0}),o=new THREE.Matrix4,r=new THREE.InstancedMesh(t,n,15);for(let e=0;e<15;e++){randomizeMatrix_bo(o,e),r.setMatrixAt(e,o);const t=(new THREE.Color).setHSL(Math.random(),1,.6);r.setColorAt(e,t)}scene.add(r),theOthers.push(r);const a=r.clone();a.scale.set(-1,1,1),a.rotation.set(0,1.57,0),r.position.set(0,10,0),scene.add(a),theOthers.push(a)}const position=new THREE.Vector3,quaternion=new THREE.Quaternion,scale=new THREE.Vector3;let scaleFactor=10*(Math.random()+.1);const randomizeMatrix_bo=function(e,t){position.x=t%2==0?80*Math.random()-40+45:-1*(80*Math.random()-40)-45,position.y=20*Math.random()+15,position.z=80*Math.random()-40,scaleFactor=10*(Math.random()+.1);let n=remap(scaleFactor,1,10,3,5)/20;scale.x=scale.y=scale.z=n,e.compose(position,quaternion,scale)};function sleep(e){return new Promise((t=>setTimeout(t,e)))}function createText(e,t,n,o=!1){const r=document.createElement("canvas"),a=r.getContext("2d",{});let i=null;const s=100;a.font="normal 100px "+n,i=a.measureText(e);const l=i.width;r.width=l,r.height=s,r.border="10px solid blue",a.font=0==o?"normal 100px "+n:"normal 75px "+n,a.textAlign="center",a.textBaseline="middle",a.fillText(e,l/2,50);const d=new THREE.Texture(r);d.needsUpdate=!0;const c=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,map:d,transparent:!0}),E=new THREE.PlaneGeometry(t*l/s,t);return new THREE.Mesh(E,c)}function removeOb(e,t){let n=sgobn(e);t.remove(n,!0)}function sgobn(e){return scene.getObjectByName(e)}function gradientMateriail(e,t){return new THREE.ShaderMaterial({side:THREE.DoubleSide,uniforms:{color1:{value:new THREE.Color(e)},color2:{value:new THREE.Color(t)}},vertexShader:"\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}\n",fragmentShader:"\nuniform vec3 color1;\nuniform vec3 color2;\n\nvarying vec2 vUv;\n\nvoid main() {\n  \n  gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);\n}\n"})}function addSkySphere(){const e=new THREE.SphereGeometry(80,32,16,0,2*Math.PI,0,.5*Math.PI),t=gradientMateriail("peachpuff","blue"),n=new THREE.Mesh(e,t);n.position.set(0,-4,0),n.name="Sky",scene.add(n)}const extrudeSettings={steps:4,depth:.1,bevelEnabled:!0,bevelThickness:.05,bevelSize:.02,bevelOffset:0,bevelSegments:4};function addArrow(){const e=(new THREE.Shape).moveTo(-2,16).lineTo(-8,14).lineTo(0,26).lineTo(8,14).lineTo(2,16).lineTo(2,0).lineTo(-2,0).lineTo(-2,16),t=new THREE.ExtrudeGeometry(e,extrudeSettings);return t.center(),t}function addCross(){const e=.2,t=.1,n=(new THREE.Shape).moveTo(0,e).lineTo(e,e).lineTo(e,0).lineTo(e+t,0).lineTo(e+t,e).lineTo(.5,e).lineTo(.5,e+t).lineTo(e+t,e+t).lineTo(e+t,.5).lineTo(e,.5).lineTo(e,e+t).lineTo(0,e+t),o=new THREE.ExtrudeGeometry(n,extrudeSettings);return o.center(),o.rotateZ(Math.PI/4),o}function addCactus(){const e=(new THREE.Shape).moveTo(.18,.76).lineTo(.16,.72).lineTo(.09,.67).lineTo(.12,1.2).lineTo(.13,1.2).lineTo(.09,1.29).lineTo(0,1.33).lineTo(-.09,1.29).lineTo(-.13,1.2).lineTo(-.12,1.2).lineTo(-.1,.77).lineTo(-.16,.82).lineTo(-.18,.86).lineTo(-.17,1.1).lineTo(-.2,1.17).lineTo(-.27,1.2).lineTo(-.34,1.17).lineTo(-.37,1.1).lineTo(-.34,.83).lineTo(-.28,.74).lineTo(-.09,.62).lineTo(-.06,0).lineTo(.06,0).lineTo(.08,.53).lineTo(.29,.65).lineTo(.34,.73).lineTo(.35,.98).lineTo(.33,1.04).lineTo(.26,1.07).lineTo(.19,1.04).lineTo(.17,.98),t=new THREE.ExtrudeGeometry(e,extrudeSettings);return t.center(),t.scale(4,4,4),t}function addCheck(){const e=(new THREE.Shape).moveTo(30,40).lineTo(0,0).lineTo(-15,15).lineTo(-10,20).lineTo(0,10).lineTo(25,45),t=new THREE.ExtrudeGeometry(e,extrudeSettings);return t.center(),t}function addCloud(){const e=(new THREE.Shape).moveTo(.88,-.15).lineTo(.99,-.07).lineTo(1.01,.03).lineTo(.97,.14).lineTo(.86,.21).lineTo(.75,.19).lineTo(.68,.3).lineTo(.56,.37).lineTo(.35,.37).lineTo(.28,.29).lineTo(.23,.23).lineTo(.12,.27).lineTo(.03,.2).lineTo(-.05,.1).lineTo(-.05,-.02).lineTo(0,-.09).lineTo(.12,-.2).lineTo(.25,-.17).lineTo(.28,-.24).lineTo(.37,-.28).lineTo(.44,-.27).lineTo(.49,-.24).lineTo(.58,-.3).lineTo(.7,-.28).lineTo(.81,-.27),t=new THREE.ExtrudeGeometry(e,extrudeSettings);return t.center(),t}function addJason(){const e=(new THREE.Shape).moveTo(16.16,60.89).lineTo(9.48,64.64).lineTo(4.92,65.49).lineTo(3.93,61).lineTo(0,60.78).lineTo(0,41.02).lineTo(9.34,43.3).lineTo(-.03,37.19).lineTo(4.99,35.7).lineTo(5.59,37.4).lineTo(8.49,39.02).lineTo(10.65,38.92).lineTo(12.66,38.6).lineTo(13.72,36.94).lineTo(13.44,34.93).lineTo(11.71,32.42).lineTo(9.94,31.29).lineTo(8.49,31.32).lineTo(7.08,31.71).lineTo(5.84,33.41).lineTo(5.06,35.21).lineTo(0,36.96).lineTo(0,21.78).lineTo(1.48,21.85).lineTo(2.16,21.69).lineTo(2.33,20.93).lineTo(1.63,20.2).lineTo(0,19.72).lineTo(0,0).lineTo(3.81,.54).lineTo(10.53,3.88).lineTo(15.89,9.5).lineTo(21.22,18.48).lineTo(23.98,28.1).lineTo(25.45,35.74).lineTo(25.54,37.58).lineTo(23.21,37.03).lineTo(23.21,43.85).lineTo(25.35,44.39).lineTo(23.12,50.75).lineTo(19.94,57.18),t=new THREE.ExtrudeGeometry(e,extrudeSettings);return t.scale(.008,.008,.008),t}function remap(e,t,n,o,r){return(r-o)*((e-t)/(n-t))+o}function clamp(e,t,n){return Math.max(t,Math.min(n,e))}const randomizeMatrix_OG=function(){const e=new THREE.Vector3,t=new THREE.Quaternion,n=new THREE.Vector3;return function(o){e.x=40*Math.random()-20,e.y=40*Math.random()-20,e.z=40*Math.random()-20,t.random(),n.x=n.y=n.z=1*Math.random(),o.compose(e,t,n)}}();function addLicense(){const e=new THREE.Group,t=new THREE.PlaneGeometry(1.7,1),n=new THREE.MeshBasicMaterial({color:14596231,side:THREE.DoubleSide}),o=new THREE.Mesh(t,n);e.add(o);const r=addJason(),a=new THREE.MeshStandardMaterial({color:new THREE.Color(13421747),flatShading:!0}),i=new THREE.Mesh(r,a),s=i.clone();s.scale.set(-1,1,1),i.add(s),i.position.set(-.5,-.4,0),e.add(i);const l=createText("Triskatopia",.1,"Courier New",!1);l.position.set(0,.4,.01),e.add(l);const d=createText("Balloon Driver License",.1,"Courier New",!1);d.position.set(0,.26,.01),e.add(d);const c=createText("Number: 123456",.1,"Courier New",!1);c.position.set(.22,0,.01),e.add(c);const E=createText("Date: Friday",.1,"Courier New",!1);E.position.set(.22,-.2,.01),e.add(E);const u=createText("XXth 2024",.1,"Courier New",!1);u.position.set(.22,-.32,.01),e.add(u),e.position.set(-.25,0,0),e.visible=!1,e.name="license",sgobn("UI_UIplane").add(e)}function addParticles(){const e=textureLoader.load("media/1.png"),t=new Float32Array(900),n=new Float32Array(900),o=new THREE.BufferGeometry;for(let e=0;e<900;e++)t[e]=100*(Math.random()-.5),n[e]=Math.random();o.setAttribute("position",new THREE.BufferAttribute(t,3)),o.setAttribute("color",new THREE.BufferAttribute(n,3));const r=new THREE.PointsMaterial;r.size=1,r.sizeAttenuation=!0,r.color=new THREE.Color("#ff88cc"),r.transparent=!0,r.alphaMap=e,r.blending=THREE.AdditiveBlending,r.vertexColors=!0;const a=new THREE.Points(o,r);a.position.set(0,50,0),a.name="star",scene.add(a)}let t,n,q;const A=new AudioContext,gainNode=A.createGain();gainNode.gain.value=.2;const sound=(e,n=96e3,o,r,a,i)=>{for(t=(e,t)=>(t-e)/t,a=(r=A.createBuffer(1,n,48e3)).getChannelData(0),o=n;o--;)a[o]=e(o);(i=A.createBufferSource()).buffer=r,i.connect(gainNode),gainNode.connect(A.destination),i.start()},soundEnterVR=e=>{var n=16e3,o=n/7;if(e>n)return null;var r=Math.pow(t(e,n),2.1);return(e<o?e+10*Math.sin(-e/900)&16:13&e)?r:-r},soundAltUp=e=>{if(e>5e4)return null;var n=t(e,5e4);return Math.sin(.03*-e*Math.sin(.09*e+Math.sin(e/200))+Math.sin(e/100))/n/(e>5e4?e/8e3:5)},soundAltDown=e=>{if(e>3e4)return null;var n=t(e,3e4);return Math.sin(.001*e*Math.sin(.009*e+Math.sin(e/200))+Math.sin(e/100))*n*n},soundTilt=e=>{if(e>2e4)return null;var n=t(e,2e4);return e*=.04,Math.sin(.03*-e*Math.sin(.09*e+Math.sin(e/200))+Math.sin(e/100))*n},soundHome=e=>{if(e>5e4)return null;e=6*Math.pow(e,1.2-Math.sin(2*e/1e5));var n=Math.sin(e/30+Math.sin(e/1500));return Math.pow(n,9)*t(e,5e4)},soundNextLevel=e=>{var n=11e4;if(e>n)return null;var o=t(e,n);return Math.sin(.001*e*Math.sin(.009*e+Math.sin(e/200))+Math.sin(e/100))*o*o},soundError=e=>e>5e4?null:(200&Math.pow(e,.9)?1:-1)*Math.pow(t(e,5e4),3),soundLaunch=e=>{if(e>2e4)return null;var n=t(e,2e4);return 33&Math.pow(5e5*e,.3)?n:-n},soundWin=e=>{var n=[0,4,7,12,void 0,7,12],o=35e3;if(e>o)return null;var r=n[n.length*e/o|0];if(void 0===r)return 0;var a=.8*Math.pow(2,r/12),i=t(e*n.length%o,o);return e*a&64?i:-i},soundLoose=e=>{if(e>6e4)return null;e=7*Math.pow(e,1.2-Math.sin(e/1e5));var n=Math.sin(e/30+Math.sin(e/1500));return Math.pow(n,9)*t(e,6e4)};function addTarget(){const e=new THREE.Group,t=new THREE.RingGeometry(1.8,2.2,32),n=new THREE.MeshBasicMaterial({color:new THREE.Color(6697728),side:THREE.DoubleSide}),o=new THREE.Mesh(t,n);o.rotation.set(Math.PI/180*90,0,0),e.add(o);const r=addCross(),a=new THREE.Mesh(r,n);a.scale.set(5,5,.01),a.rotateX(Math.PI/2),e.add(a);const i=addArrow(),s=new THREE.MeshStandardMaterial({color:"orange"}),l=new THREE.Mesh(i,s);l.scale.set(.1,.1,1),l.rotateZ(Math.PI),l.position.set(0,3,0),arrowArr.push(l),e.add(l),e.name="Target",e.position.set(targetOb.position.x,targetOb.position.y,targetOb.position.z),e.scale.set(1.5,1.5,1.5),worldGroup.add(e),targetOb.box.setFromObject(e),targetOb.box.translate(new THREE.Vector3(0,-5,0));new THREE.Box3Helper(targetOb.box,"green")}const count=500;function addFireworks(){const e=new THREE.BoxGeometry(.5,.5,.5),t=textureLoader.load("media/blurPic.png");t.minFilter=THREE.NearestFilter,t.magFilter=THREE.LinearFilter;const n=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,map:t}),o=new THREE.Matrix4,r=new THREE.InstancedMesh(e,n,count);for(let e=0;e<count;e++)randomizeMatrix_OG(o),r.setMatrixAt(e,o);r.position.copy(targetOb.position),r.name="Fireworks",scene.add(r);const a=new THREE.AnimationMixer(r);mixerArr.push(a);const i=new THREE.VectorKeyframeTrack(".scale",[0,1,2,3,4,5,6],[.2,.2,.2,1,1,1,.1,.1,.1,5,5,5,.2,.2,.2,8,8,8,.2,.2,.2]),s=new THREE.AnimationClip("Action",2,[i]),l=a.clipAction(s);l.setLoop(0,2),l.play(),sleep(5e3).then((()=>{targetOb.winTime=!0,sound(soundWin)})),sleep(15e3).then((()=>{targetOb.winTime=!1,scene.remove(r),r.dispose(),e.dispose(),n.dispose()}))}function addClouds(){const e=new THREE.Group,t=addCloud();t.rotateY(Math.PI/2);const n=new THREE.MeshStandardMaterial({color:"lavender",flatShading:!0,transparent:!0,opacity:.35,roughness:.5,metalness:.4});let o;for(let r=0;r<12;r++)o=new THREE.Mesh(t,n),o.rotation.set(0,.5*r,0),o.translateX(50),o.translateY(Math.max(12,60*Math.random())),o.scale.set(5,5,Math.max(6,15*Math.random())),e.add(o);worldGroup.add(e)}function addMountain(){const e=new THREE.IcosahedronGeometry(6,0),t=new THREE.MeshPhysicalMaterial({roughness:0,transmission:.7,thickness:.5}),n=new THREE.MeshStandardMaterial({vertexColors:!0,flatShading:!0,transparent:!0,opacity:.1,alphaTest:!1}),o=new THREE.Mesh(e,t);o.receiveShadow=!0,o.position.set(0,0,-15),o.rotateX(-Math.PI/2);const r=new THREE.Mesh(e,n);r.castShadow=!0,o.add(r),o.name="Rock";const a=o.clone();a.translateX(-6),a.translateZ(-2),a.rotateY(Math.PI/2),a.name="Rock2";const i=o.clone();i.translateX(8),i.translateZ(-1.5),i.rotateY(-Math.PI/2),i.name="Rock3",worldGroup.add(o,a,i),clashBoxMountain.setFromObject(o),clashBoxMountain.expandByScalar(-1.2),clashBoxMountain.translate(new THREE.Vector3(0,1,0));new THREE.Box3Helper(clashBoxMountain,"red")}function addBuildings(){const e=new THREE.CylinderGeometry(5,5,20,5),t=new THREE.MeshStandardMaterial({color:"indigo",flatShading:!0,transparent:!0,opacity:.5,alphaTest:!1}),n=new THREE.Mesh(e,t);n.receiveShadow=!0,n.position.set(0,0,-15),n.name="Building",worldGroup.add(n),clashBoxMountain.setFromObject(n)}function addCactusMountain(){const e=addCactus(),t=new THREE.MeshStandardMaterial({color:"lightgreen",flatShading:!0,transparent:!0,opacity:.5,alphaTest:!1}),n=new THREE.Mesh(e,t);n.receiveShadow=!0,n.position.set(0,5,-15),n.scale.set(3,3,3),n.name="Cactus",worldGroup.add(n),clashBoxMountain.setFromObject(n)}function addTerrain(e){let t,n;"One"==e?(t=new THREE.Color(52326),n=new THREE.Color(1769394)):"Two"==e?(t=new THREE.Color(2097152),n=new THREE.Color(3145728)):"Three"==e&&(t=new THREE.Color(13808780),n=new THREE.Color(16768685));const o=new THREE.PlaneGeometry(world.width,world.width,15,15);o.rotateX(-Math.PI/2);const r=o.attributes.position.array,a=new Float32Array(r.length),i=new THREE.Vector3,s=new THREE.Color;for(let e=0;e<r.length;e+=3){i.fromArray(r,e),i.x+=10*Math.random()-5,i.z+=10*Math.random()-5;const o=i.distanceTo(worldGroup.position)/5-world.flatZone;i.y=Math.random()*Math.max(0,.75*o),i.toArray(r,e),s.fromArray(a,e),i.y>1.5?(s.r=t.r,s.g=t.g,s.b=t.b):(s.r=n.r,s.g=n.g,s.b=n.b),s.toArray(a,e)}o.setAttribute("color",new THREE.BufferAttribute(a,3)),o.computeVertexNormals();const l=new THREE.MeshStandardMaterial({vertexColors:!0,flatShading:!0}),d=new THREE.Mesh(o,l);d.name="Ground",d.position.set(0,world.moveDown,0),d.receiveShadow=!0,worldGroup.add(d)}function addTrees(e){let t,n,o;"One"==e&&(t=new THREE.ConeGeometry(.5,2,8),n=new THREE.MeshStandardMaterial({color:"seagreen",flatShading:!0}),o=2e3),"Two"==e&&(t=new THREE.CylinderGeometry(2.5,2.5,10,5),n=new THREE.MeshStandardMaterial({color:"indigo",flatShading:!0}),o=700),"Three"==e&&(t=addCactus(),n=new THREE.MeshStandardMaterial({color:"seagreen",flatShading:!0}),o=100);const r=new THREE.Mesh(t,n),a=new THREE.Matrix4,i=new THREE.InstancedMesh(r.geometry,r.material,o);i.castShadow=!0;for(let t=0;t<o;t++)randomizeMatrix(a),i.setMatrixAt(t,a),"Three"==e&&i.rotateY(Math.random()*THREE.MathUtils.degToRad(10*t));i.name="Trees",worldGroup.add(i)}const randomizeMatrix=function(){const e=new THREE.Vector3,t=new THREE.Quaternion,n=new THREE.Vector3;return function(o){e.x=Math.sin(360*Math.random())*world.width/2,e.y=4*Math.random()-2+1,e.z=Math.cos(360*Math.random())*world.width/2;Math.sqrt(Math.abs(e.x*e.x+Math.abs(e.z*e.z)))<5*world.flatZone&&(e.x=10*e.x+3,e.z=10*e.z+3),t.y=Math.random(),n.x=n.y=n.z=Math.random(),o.compose(e,t,n)}}(),increment=2,tiltIncrDeg=2,tiltIncr=THREE.MathUtils.degToRad(2);function clickedOn(e){if(0!=e.length&&1!=balloonStats.isMoving&&1!=balloonStats.isLaunched)switch(e[0].object.name){case"enterVR":startSession("immersive-vr"),removeOb("enterVR",scene),sleep(5).then((()=>{sound(soundEnterVR)}));break;case"exitVR":console.log("exit VR text clicked ");shutdownXR(renderer.xr.getSession());break;case"home":if(1!=renderer.xr.isPresenting)return;console.log("home clicked"),sound(soundHome),balloonStats.startingSpot.y=balloonStats.Altitude,balloonStats.Altitude=0,balloonStats.Tilt=0,balloonStats.isMoving=!0,balloonStats.isMmovingInY=!0,balloonStats.isMmovingRot=!0,balloonStats.isGoingHome=!0,balloonStats.timeRequired=3,updateCarrotSpace(),clock.start();break;case"altUp":if(1!=renderer.xr.isPresenting)return;if(dummyOb.position.y>world.height-2)return void sound(soundError);sound(soundAltUp),balloonStats.startingSpot.y=balloonStats.Altitude,balloonStats.Altitude+=increment,balloonStats.isMoving=!0,balloonStats.isMmovingInY=!0,balloonStats.timeRequired=1.5,updateCarrotSpace(),clock.start();break;case"altDown":if(1!=renderer.xr.isPresenting)return;if(dummyOb.position.y<.9)return void sound(soundError);sound(soundAltDown),balloonStats.startingSpot.y=balloonStats.Altitude,balloonStats.Altitude-=increment,balloonStats.isMoving=!0,balloonStats.isMmovingInY=!0,balloonStats.timeRequired=1.5,updateCarrotSpace(),clock.start();break;case"tiltUp":if(1!=renderer.xr.isPresenting)return;if(dummyOb.position.y<2.9)return void sound(soundError);sound(soundTilt),balloonStats.startingTilt.x=balloonStats.Tilt,balloonStats.Tilt+=tiltIncr,balloonStats.isMoving=!0,balloonStats.isMmovingRot=!0,balloonStats.timeRequired=3,updateCarrotSpace(),clock.start();break;case"tiltDown":if(1!=renderer.xr.isPresenting)return;if(dummyOb.position.y<2.9)return void sound(soundError);sound(soundTilt),balloonStats.startingTilt.x=balloonStats.Tilt,balloonStats.Tilt-=tiltIncr,balloonStats.isMoving=!0,balloonStats.isMmovingRot=!0,balloonStats.timeRequired=3,updateCarrotSpace(),clock.start();break;case"Launch":if(1!=renderer.xr.isPresenting)return;console.log("LAUNCHED"),sound(soundLaunch),balloonStats.isMoving=!0,balloonStats.timeRequired=5,balloonStats.isLaunched=!0;break;default:console.log("switch default .....")}}async function shutdownXR(e){e&&await e.end()}function updateCarrotSpace(){carrot.rotation.set(balloonStats.Tilt,0,0),carrot.position.set(0,balloonStats.Altitude,0),carrotBox.setFromObject(carrot),carrotBox.expandByVector(new THREE.Vector3(5,.05,5));new THREE.Box3Helper(carrotBox,16776960)}function winnerTime(){sound(soundWin),targetOb.winTime=!0,balloonStats.isMoving=!1,balloonStats.isLaunched=!1,sgobn("Target").visible=!1,addFireworks(),targetOb.winTime=!0,sleep(7500).then((()=>{removeOb("Fireworks",scene)})),sleep(8e3).then((()=>{if(1==balloonStats.Level)return l1tol2(),targetOb.winTime=!1,void reset();if(2==balloonStats.Level)l2tol3(),targetOb.winTime=!1,reset();else if(3==balloonStats.Level){sgobn("license").visible=!0}}))}function looserTime(){sound(soundLoose),balloonStats.isMoving=!1,balloonStats.isLaunched=!1;const e=addCross(),t=new THREE.MeshStandardMaterial({color:"red",flatShading:!0}),n=new THREE.Mesh(e,t);n.scale.set(2.5,2.5,.01),n.position.set(0,0,-2),n.name="Crosx",camera.add(n),sleep(3e3).then((()=>{removeOb("Crosx",camera),reset()}))}function reset(){console.log("reset"),dummyOb.rotation.set(0,0,0),dummyOb.position.set(0,0,0);moveIt({x:0,y:0,z:0,w:1},new THREE.Quaternion),balloonStats.startingSpot=new THREE.Vector3(0,0,0),balloonStats.startingTilt=new THREE.Euler(0,0,0,"XYZ"),balloonStats.Altitude=0,balloonStats.Tilt=0,upDateHuds(),sgobn("Target").visible=!0}function l1tol2(){sound(soundNextLevel);const e=sgobn("Sky"),t=gradientMateriail("lightslategrey","black");e.material=t,world.flatZone=10,removeOb("Ground",worldGroup),addTerrain("Two"),removeOb("Trees",worldGroup),addTrees("Two"),removeOb("Rock",worldGroup),removeOb("Rock2",worldGroup),removeOb("Rock3",worldGroup),addBuildings(),addParticles();sgobn("Light").intensity=.25,balloonStats.Level=2,upDateHuds()}function l2tol3(){sound(soundNextLevel);const e=sgobn("Sky"),t=gradientMateriail("lightcyan","lightskyblue");e.material=t,world.flatZone=5,removeOb("Ground",worldGroup),addTerrain("Three"),removeOb("Trees",worldGroup),addTrees("Three"),removeOb("Building",worldGroup),addCactusMountain(),removeOb("star",scene),balloonStats.Level=3,upDateHuds()}function XRSuppQry(){console.log("navigator; ",navigator.xr),navigator.xr&&navigator.xr.isSessionSupported("immersive-vr").then((e=>{e&&addVROKButton(),e||addNoVRButton()}))}async function startSession(e){try{onSessionStarted(await navigator.xr.requestSession(e,{}))}catch(e){alert("Failed to start Web XR session.",e),console.log("error",e)}}async function onSessionStarted(e){renderer.xr.setReferenceSpaceType("local"),await renderer.xr.setSession(e)}function addVROKButton(){const e=createText("Enter VR",3,"Courier New",!1);e.position.set(targetOb.position.x,targetOb.position.y+10,targetOb.position.z),e.name="enterVR",scene.add(e),clickable_2D.push(e)}function addNoVRButton(){const e=createText("VR Not Found :(",2.5,"Courier New",!1);e.position.set(targetOb.position.x,targetOb.position.y+11,targetOb.position.z),scene.add(e)}function introClicked(){document.getElementById("introID").style.visibility="visible"}function aboutClicked(){document.getElementById("aboutID").style.visibility="visible"}function closeClicked(){document.getElementById("introID").style.visibility="hidden",document.getElementById("aboutID").style.visibility="hidden"}function removeElemFn(){document.getElementById("title").remove(),document.getElementById("start").remove(),document.getElementById("introButton").remove(),document.getElementById("aboutButton").remove(),document.getElementById("introID").remove(),document.getElementById("aboutID").remove(),camera.position.set(-7,4,10),camera.lookAt(new THREE.Vector3(-2,3,-5))}document.getElementById("start").addEventListener("click",removeElemFn),document.getElementById("introButton").addEventListener("click",introClicked),document.getElementById("aboutButton").addEventListener("click",aboutClicked),document.getElementById("close1").addEventListener("click",closeClicked),document.getElementById("close2").addEventListener("click",closeClicked);const testArr=[],clickable_2D=[],clickable_3D=[],vehicle=new THREE.Group,clock=new THREE.Clock,textureLoader=new THREE.TextureLoader;let baseReferenceSpace;const balloonStats={Altitude:0,Tilt:0,Level:1,isMoving:!1,isMmovingInY:!1,isMmovingRot:!1,isGoingHome:!1,isLaunched:!1,timeRequired:null,startingSpot:new THREE.Vector3(0,0,0),startingTilt:new THREE.Euler(0,0,0,"XYZ")},world={width:150,height:75,flatZone:5,moveDown:-1.5},worldGroup=new THREE.Group,targetOb={position:new THREE.Vector3(0,.5,-40),winTime:!1,box:new THREE.Box3},arrowArr=[],clashBoxMountain=new THREE.Box3,mixerArr=[],theOthers=[],sizes={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)},scene=new THREE.Scene;scene.background=new THREE.Color(3342387);const camera=new THREE.PerspectiveCamera(50,sizes.width/sizes.height,.1,1e3);camera.position.set(0,0,10),camera.lookAt(new THREE.Vector3(20,4,0)),scene.add(camera);const light=new THREE.HemisphereLight(16773360,394758,2);light.position.set(1,1,1),scene.add(light);const dirLight=new THREE.DirectionalLight(16777215,1);dirLight.position.set(15,25,15),dirLight.castShadow=!0,dirLight.shadow.mapSize.width=1024,dirLight.shadow.mapSize.height=1024,dirLight.shadow.camera.near=.5,dirLight.shadow.camera.far=1e3,dirLight.shadow.camera.left=-250,dirLight.shadow.camera.right=250,dirLight.shadow.camera.top=250,dirLight.shadow.camera.bottom=-250,dirLight.name="Light",scene.add(dirLight);const renderer=new THREE.WebGLRenderer({antialias:!0});renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(sizes.pixelRatio),renderer.xr.enabled=!0,renderer.shadowMap.enabled=!0,renderer.shadowMap.type=THREE.PCFSoftShadowMap,document.body.appendChild(renderer.domElement);const ctr1=renderer.xr.getController(0),ctr2=renderer.xr.getController(1);XRSuppQry();const carrotGeo=new THREE.ConeGeometry(.005,.025,8),carrotMatl=new THREE.MeshStandardMaterial({color:"orange"}),carrot=new THREE.Mesh(carrotGeo,carrotMatl);carrot.rotation.set(0,0,0),carrot.visible=!1,carrot.name="Carrot",scene.add(carrot);const carrotBox=new THREE.Box3,dummyOb=new THREE.Object3D;scene.add(dummyOb),addSkySphere(),addTerrain("One"),addTrees("One"),addClouds(),addMountain(),scene.add(worldGroup),addBalloon(),addBalloonOther(),addTarget();let line2,curve2,INTERSECTED,intersects,alpha=0,destinationSpot=new THREE.Vector3,lerper=new THREE.Object3D,ogQuat=new THREE.Quaternion,destinationQuat=new THREE.Quaternion,slerper=new THREE.Object3D,offsetPosition=new THREE.Vector3,offsetRotation=new THREE.Quaternion,blnFrq=.005,blnHt=2e-4,p=new THREE.Vector3;function moveIt(e,t){const n=new XRRigidTransform(e,t),o=baseReferenceSpace.getOffsetReferenceSpace(n);renderer.xr.setReferenceSpace(o)}function addCalcCurve(){line2&&scene.remove(line2);const e=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,-2.66,-13.39),new THREE.Vector3(0,-10.25,-24.75),new THREE.Vector3(0,-21.61,-32.34),new THREE.Vector3(0,-35,-35),new THREE.Vector3(0,-80,-35)],t=[];e.forEach((e=>{let n=new THREE.Vector3(e.x,e.y,e.z).applyMatrix4(dummyOb.matrixWorld);t.push(new THREE.Vector3(n.x,n.y,n.z))})),curve2=new THREE.CatmullRomCurve3(t),curve2.closed=!1;const n=curve2.getPoints(7);line2=new THREE.Line((new THREE.BufferGeometry).setFromPoints(n),new THREE.LineBasicMaterial({color:16764159})),line2.name="line",scene.add(line2)}function yhryd(e){console.log(`you have reached your destination;   ${e}`),balloonStats.timeRequired=null,balloonStats.isMoving=!1,balloonStats.isMmovingInY=!1,balloonStats.isMmovingRot=!1,balloonStats.isGoingHome=!1,alpha=0,upDateHuds(balloonStats),addCalcCurve()}function animate(){renderer.setAnimationLoop(render)}function render(){const e=clock.getElapsedTime();arrowArr[0].rotation.y+=.01,2==theOthers.length&&(theOthers[0].rotation.y+=1e-4,theOthers[0].position.y+=Math.sin(e*blnFrq)*blnHt,theOthers[1].rotation.y-=2e-4,theOthers[1].position.y-=Math.sin(e*blnFrq)*blnHt),1==renderer.xr.isPresenting&&(cleanIntersected(),intersectObjects(ctr1),intersectObjects(ctr2),1==balloonStats.isMoving&&(alpha+=e/balloonStats.timeRequired*.1,1==balloonStats.isMmovingInY&&(destinationSpot.copy(carrot.position),lerper.position.lerp(destinationSpot,alpha),offsetPosition={x:-lerper.position.x,y:-lerper.position.y,z:-lerper.position.z,w:1},dummyOb.position.set(-offsetPosition.x,-offsetPosition.y,-offsetPosition.z,-offsetPosition.w),alpha>1&&yhryd("pos")),1==balloonStats.isMmovingRot&&(ogQuat.setFromEuler(balloonStats.startingTilt),destinationQuat.setFromEuler(carrot.rotation),slerper.quaternion.slerpQuaternions(ogQuat,destinationQuat,alpha),dummyOb.quaternion.set(-slerper.quaternion.x,-slerper.quaternion.y,-slerper.quaternion.z,-slerper.quaternion.w),alpha>1&&yhryd("rot")),1==balloonStats.isLaunched&&dummyOb.position.y>1&&(p=curve2.getPoint(.1*alpha),dummyOb.position.set(p.x,p.y-.1,p.z),offsetPosition={x:-p.x,y:-p.y-.1,z:-p.z,w:1},1==clashBoxMountain.containsPoint(dummyOb.position)&&(balloonStats.isLaunched=!1,console.log("looser time clash mountin"),looserTime(),alpha=0,scene.remove(line2))),1==balloonStats.isLaunched&&dummyOb.position.y<1&&(balloonStats.isLaunched=!1,1==targetOb.box.containsPoint(dummyOb.position)?(console.log("winner time"),winnerTime(),alpha=0,scene.remove(line2)):(console.log("looser time, missed target"),looserTime(),alpha=0,scene.remove(line2))),moveIt(offsetPosition,offsetRotation))),1==targetOb.winTime&&mixerArr.forEach((t=>t.update(.005*e))),renderer.render(scene,camera)}function resizeMe(){sizes.width=window.innerWidth,sizes.height=window.innerHeight,sizes.pixelRatio=Math.min(window.devicePixelRatio,2),camera.aspect=sizes.width/sizes.height,camera.updateProjectionMatrix(),renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(sizes.pixelRatio)}animate(),window.addEventListener("resize",resizeMe),document.addEventListener("pointermove",mouseHover),document.addEventListener("click",mouseDown);const mouse=new THREE.Vector2,raycaster2D=new THREE.Raycaster;function mouseHover(e){intersects=getPointerInts(e),intersects.length>0?INTERSECTED!=intersects[0].object&&(INTERSECTED&&INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex),INTERSECTED=intersects[0].object,INTERSECTED.currentHex=INTERSECTED.material.emissive.getHex(),INTERSECTED.material.emissive.setHex(16711680)):(INTERSECTED&&INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex),INTERSECTED=null)}function mouseDown(e){intersects=getPointerInts(e),clickedOn(intersects)}function getPointerInts(e){mouse.x=e.clientX/sizes.width*2-1,mouse.y=-e.clientY/sizes.height*2+1,raycaster2D.setFromCamera(mouse,camera);return raycaster2D.intersectObjects(clickable_2D)}const geometryLine=(new THREE.BufferGeometry).setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-1)]),line=new THREE.Line(geometryLine);line.name="line",line.scale.z=5,renderer.xr.addEventListener("sessionstart",(()=>{scene.add(ctr1),scene.add(ctr2),ctr1.add(line.clone()),ctr2.add(line.clone()),addXR_UI(),addLicense(),baseReferenceSpace=renderer.xr.getReferenceSpace(),document.removeEventListener("pointermove",mouseHover),document.removeEventListener("click",mouseDown),window.removeEventListener("resize",resizeMe)})),renderer.xr.addEventListener("sessionend",(()=>{document.addEventListener("pointermove",mouseHover),document.addEventListener("click",mouseDown),window.addEventListener("resize",resizeMe)}));const raycasterXR=new THREE.Raycaster,intersectedXR=[],geometryKnot=new THREE.TorusKnotGeometry(.05,.01,100,16),materialKnot=new THREE.MeshStandardMaterial,torusKnot=new THREE.Mesh(geometryKnot,materialKnot);function onSelectStart(e){const t=e.target,n=getIntersections(t);if(clickedOn(n),n.length>0){const e=n[0].object;e.material.emissive.b=1,t.userData.selected=e}t.userData.targetRayMode=e.data.targetRayMode}function onSelectEnd(e){const t=e.target;if(void 0!==t.userData.selected){t.userData.selected.material.emissive.b=0,t.userData.selected=void 0}}function getIntersections(e){return e.updateMatrixWorld(),raycasterXR.setFromXRController(e),raycasterXR.intersectObjects(clickable_3D)}function intersectObjects(e){if("screen"===e.userData.targetRayMode)return;if(void 0!==e.userData.selected)return;const t=getIntersections(e);if(t.length>0){const e=t[0],n=e.object;n.material.emissive.r=1,intersectedXR.push(n),line.scale.z=e.distance}else line.scale.z=5}function cleanIntersected(){for(;intersectedXR.length;){intersectedXR.pop().material.emissive.r=0}}scene.add(torusKnot),ctr1.addEventListener("selectstart",onSelectStart),ctr1.addEventListener("selectend",onSelectEnd),ctr1.addEventListener("connected",(e=>{const t=renderer.xr.getControllerGrip(0);t.add(torusKnot),scene.add(t)})),ctr1.addEventListener("disconnected",(()=>{})),ctr2&&(ctr2.addEventListener("selectstart",onSelectStart),ctr2.addEventListener("selectend",onSelectEnd),ctr2.addEventListener("connected",(()=>{const e=renderer.xr.getControllerGrip(1);e.add(torusKnot),scene.add(e)})),ctr2.addEventListener("disconnected",(()=>{})));
