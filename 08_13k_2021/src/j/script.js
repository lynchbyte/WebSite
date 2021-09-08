import*as THREE from"https://unpkg.com/three@0.131.1/build/three.module.js";import{VRButton}from"https://unpkg.com/three@0.131.1/examples/jsm/webxr/VRButton.js";const drp=[],drpClear=[],lvlClear=[],circPhan=[],curWinValX=[],zPl=-7.5,raycaster=new THREE.Raycaster,intersected=[],tempMatrix=new THREE.Matrix4,clkRm=[],scene=new THREE.Scene,sizes={width:window.innerWidth,height:window.innerHeight},txtLdr=new THREE.TextureLoader,camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,.1,30);camera.position.set(0,1.6,3);const renderer=new THREE.WebGLRenderer({antialias:!0});renderer.setPixelRatio(window.devicePixelRatio,2),renderer.setSize(window.innerWidth,window.innerHeight),renderer.xr.enabled=!0,document.body.appendChild(renderer.domElement),document.body.appendChild(VRButton.createButton(renderer));const controller=renderer.xr.getController(0);scene.add(controller);var mC=new THREE.LineBasicMaterial({color:15094391}),gC=(new THREE.BufferGeometry).setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-1)]),line=new THREE.Line(gC,mC);line.name="line",line.scale.z=10,controller.add(line.clone());const ambLt=new THREE.AmbientLight(16777215,.5);scene.add(ambLt);const lt=new THREE.PointLight(16777215,.5);function onSesS(e){mkBtn(),mkHlp();let t=scene.getObjectByName("Title");t.rotation.set(0,-45*Math.PI/180,0),t.position.set(3,2,-2.5);let n=scene.getObjectByName("Exit");n.rotation.set(0,-45*Math.PI/180,0),n.position.set(3,.5,-2.5),n.visible=!0,mkLvl()}lt.position.set(2,3,4),scene.add(lt),mkSkyBox(),mkTt(),mkStB(),mkExt(),window.addEventListener("resize",(()=>{sizes.width=window.innerWidth,sizes.height=window.innerHeight,camera.aspect=sizes.width/sizes.height,camera.updateProjectionMatrix(),renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))})),renderer.xr.addEventListener("sessionstart",onSesS),controller.addEventListener("selectstart",onSelectStart);const animate=()=>{renderer.setAnimationLoop(render)};function render(){update(curWinValX),cleanIntersected(),intersectObjects(controller),renderer.render(scene,camera)}let zzfx,zzfxV,zzfxX;renderer.setAnimationLoop(render),zzfxV=.3,zzfx=(e=1,t=.05,n=220,r=0,o=0,a=.1,i=0,s=1,c=0,l=0,d=0,p=0,m=0,E=0,h=0,u=0,w=0,R=1,M=0,f=0)=>{let T,x,g=Math,H=44100,v=2*g.PI,b=c*=500*v/H/H,B=n*=(1-t+2*t*g.random(t=[]))*v/H,y=0,z=0,P=0,L=1,k=0,I=0,S=0;for(l*=500*v/H**3,h*=v/H,d*=v/H,p*=H,m=H*m|0,x=(r=H*r+9)+(M*=H)+(o*=H)+(a*=H)+(w*=H)|0;P<x;t[P++]=S)++I%(100*u|0)||(S=i?1<i?2<i?3<i?g.sin((y%v)**3):g.max(g.min(g.tan(y),1),-1):1-(2*y/v%2+2)%2:1-4*g.abs(g.round(y/v)-y/v):g.sin(y),S=(m?1-f+f*g.sin(v*P/m):1)*(0<S?1:-1)*g.abs(S)**s*e*zzfxV*(P<r?P/r:P<r+M?1-(P-r)/M*(1-R):P<r+M+o?R:P<x-w?(x-P-w)/a*R:0),S=w?S/2+(w>P?0:(P<x-w?1:(x-P)/w)*t[P-w|0]/2):S),T=(n+=c+=l)*g.cos(h*z++),y+=T-T*E*(1-1e9*(g.sin(P)+1)%2),L&&++L>p&&(n+=d,B+=d,L=0),!m||++k%m||(n=B,c=b,L=L||1);return(e=zzfxX.createBuffer(1,x,H)).getChannelData(0).set(t),(n=zzfxX.createBufferSource()).buffer=e,n.connect(zzfxX.destination),n.start(),n},zzfxX=new(window.AudioContext||webkitAudioContext);const group3=new THREE.Group;group3.name="LevelUI";const partArr=[];function mkSkyBox(){let e=[],t=txtLdr.load("src/m/sb3.webp"),n=t,r=txtLdr.load("src/m/sb2.webp"),o=txtLdr.load("src/m/sb1.webp"),a=t,i=t;e.push(new THREE.MeshBasicMaterial({map:t})),e.push(new THREE.MeshBasicMaterial({map:n})),e.push(new THREE.MeshBasicMaterial({map:r})),e.push(new THREE.MeshBasicMaterial({map:o})),e.push(new THREE.MeshBasicMaterial({map:a})),e.push(new THREE.MeshBasicMaterial({map:i}));for(let t=0;t<6;t++)e[t].side=THREE.BackSide;let s=new THREE.BoxGeometry(20,20,20),c=new THREE.Mesh(s,e);scene.add(c)}function mkTri(e){circPhan.length=0;let t=e;const n=.5*Math.tan(Math.PI/180*60);let r=-(t/2+.5),o=0;const a=new THREE.CircleBufferGeometry(.4,6),i=new THREE.MeshBasicMaterial({color:255,wireframe:!0,transparent:!0,opacity:.2});for(;o<e+1;){const s=o*n;for(;t>0;){const e=new THREE.Mesh(a,i),n=r+1*t;e.position.set(n,s,zPl),scene.add(e),e.name="C_Row:"+o+" PosX:"+e.position.x,e.userData.row=o,e.userData.posX=e.position.x,circPhan.push(e),t--}o++,t=e-o,r+=.5}}function mkTt(){const e=new THREE.PlaneBufferGeometry(1,1,1,1),t=txtLdr.load("src/m/title.webp"),n=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));n.position.set(-0,2,.5),n.name="Title",scene.add(n)}function mkBtn(){const e=new THREE.PlaneBufferGeometry(2,2,1,1),t=txtLdr.load("src/m/arwLft2.webp"),n=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));n.position.set(-1.5,-2,zPl),n.name="ButLeft",scene.add(n);const r=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));r.rotation.set(0,0,Math.PI/180*180),r.position.set(1.5,-2,zPl),r.name="ButRight",scene.add(r)}function mkStB(){const e=new THREE.PlaneBufferGeometry(1,1,1,1),t=txtLdr.load("src/m/start.webp"),n=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));n.position.set(-0,2,-5.5),n.name="Start",scene.add(n),clkRm.push(n)}function mkExt(){const e=new THREE.PlaneBufferGeometry(.5,.5,1,1),t=txtLdr.load("src/m/exit.webp"),n=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));n.name="Exit",scene.add(n),n.visible=!1,clkRm.push(n)}function mkHlp(){const e=new THREE.PlaneBufferGeometry(1.5,1.5,1,1),t=txtLdr.load("src/m/help.webp"),n=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));n.position.set(-0,.75,-5.5),n.name="Help",scene.add(n)}function mkDrp(e){const t=[];for(let e=0;e<10;e++){const n=e%2==1?10:20,r=e/5*Math.PI;t.push(new THREE.Vector2(Math.cos(r)*n,Math.sin(r)*n))}const n=new THREE.Shape(t),r=new THREE.ShapeGeometry(n),o=[15890944,15102720,16744448,16752704,16757606][Math.floor(5*Math.random())],a=new THREE.Mesh(r,new THREE.MeshPhongMaterial({color:o}));a.position.set(0,e,-7.49),a.rotation.set(0,0,Math.random());const i=.025;a.scale.set(i,i,i),scene.add(a),a.name="dr",scene.add(a),drp.push(a),drpClear.push(a)}function mkLvl(){const e=new THREE.PlaneBufferGeometry(1,1,1,1),t=txtLdr.load("src/m/lvl.webp"),n=new THREE.Mesh(e,new THREE.MeshPhongMaterial({map:t,transparent:!0}));n.position.set(0,5,-.05),group3.add(n);const r=new THREE.CircleBufferGeometry(.1,12),o=new THREE.MeshBasicMaterial({color:255,transparent:!0,opacity:.2});let a=6;for(;a>0;){const e=new THREE.Mesh(r,o),t=4.5-.5*-(a-6);e.position.set(0,t,0),group3.add(e),e.userData.lvl=6-a+1,e.name="LvlCirc"+e.userData.lvl,a--}let i=curLvlArr[0];scene.getObjectByName("LvlCirc"+i);const s=(new THREE.Shape).lineTo(-3,8).lineTo(0,6).lineTo(3,8).lineTo(0,0),c=new THREE.ShapeGeometry(s),l=new THREE.Mesh(c,new THREE.MeshPhongMaterial({color:16744448}));l.position.set(-.2,4.5,0),l.rotation.set(0,0,90*Math.PI/180);const d=.05;l.scale.set(d,d,d),l.name="AH",group3.add(l),group3.rotation.set(0,45*Math.PI/180,0),group3.position.set(-2.5,-2,-2.5),scene.add(group3)}function intersectObjects(e){if(void 0===e.userData.selected){var t=e.getObjectByName("line"),n=getIntersections(e);if(n.length>0){var r=n[0],o=r.object;o.material.emissive.g=1,intersected.push(o),t.scale.z=r.distance}else t.scale.z=10}}function getIntersections(e){return tempMatrix.identity().extractRotation(e.matrixWorld),raycaster.ray.origin.setFromMatrixPosition(e.matrixWorld),raycaster.ray.direction.set(0,0,-1).applyMatrix4(tempMatrix),raycaster.intersectObjects(clkRm,!0)}function cleanIntersected(){for(;intersected.length;){intersected.pop().material.emissive.g=0}}function onSelectStart(e){var t=e.target,n=getIntersections(t);if(n.length>0){var r=n[0];switch(tempMatrix.getInverse(t.matrixWorld),r.object.name){case"ButLeft":if(0===drp.length)return;drp[0].position.x+=-.25;break;case"ButRight":if(0===drp.length)return;drp[0].position.x+=.25;break;case"Start":gameStart(),scene.getObjectByName("Start").visible=!1;let e=scene.getObjectByName("Help");scene.remove(e);let t=scene.getObjectByName("ButLeft");t.visible=!0;let n=scene.getObjectByName("ButRight");clkRm.push(t,n),n.visible=!0;break;case"Exit":location.reload()}}}let currRow=0,prevTime=0;const axis=new THREE.Vector3(0,0,1).normalize(),ang=.01,curLvlArr=[1,2,3,4,5,6];let hasWon=!1;const clock=new THREE.Clock;let winIM;const amount=250;let matrix=new THREE.Matrix4,position=new THREE.Vector3,rotation=new THREE.Euler;const ringArr=[];function gameStart(){mkTri(curLvlArr[0]+2),updateWinValsX(),drp.pop(),mkDrp(curLvlArr[0]+4)}function nextRow(){0!==curLvlArr.length?(currRow++,updateWinValsX()):runOnce()}function nextLevel(){zzfx(...[1.09,,117,.06,.47,.49,1,1.57,1.5,,-752,.09,.09,.1,,,,.95,.09,.2]);let e=scene.getObjectByName("LvlCirc"+curLvlArr[0]);const t=new THREE.RingGeometry(.1,.2,32),n=new THREE.MeshBasicMaterial({color:11203708}),r=new THREE.Mesh(t,n);r.position.copy(e.position),r.name="Ring",group3.add(r),ringArr.push(r),scene.getObjectByName("AH").position.y+=-.5,curLvlArr.shift(),currRow=0,drpClear.forEach((function(e){scene.remove(e)})),mkTri(curLvlArr[0]+2),updateWinValsX(),drp.pop(),mkDrp()}function updateWinValsX(){curWinValX.pop();let e=circPhan.filter((function(e){return e.userData.row==currRow}));e.forEach((function(e){curWinValX.push(e.position.x)})),e.pop()}function update(e){const t=clock.getElapsedTime(),n=t-prevTime,r=1+.1*curLvlArr[0];if(prevTime=t,void 0!==winIM)for(let e=0;e<250;e++)winIM.getMatrixAt(e,matrix),position.setFromMatrixPosition(matrix),rotation.setFromRotationMatrix(matrix),rotation.z+=-.025,matrix.makeRotationFromEuler(rotation),matrix.setPosition(position),winIM.setMatrixAt(e,matrix),winIM.instanceMatrix.needsUpdate=!0;if(0!==drp.length&&void 0!==drp){let t=drp[0].position.x;if(drp[0].position.y>.86*currRow&&(drp[0].rotateOnAxis(axis,ang*n*100),drp[0].position.y+=1e3*n*r*-.002),null==e)return;let o=e.includes(t),a=.866*currRow;switch(drp[0].position.y>a+.1){case!0:break;case!1:1==o&&console.log("it's a hit"),!1===hasWon&&zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]);let t=scene.getObjectByName("C_Row:"+currRow+" PosX:"+drp[0].position.x);if(void 0!==t){let n=e.indexOf(t.position.x);n>-1&&e.splice(n,1),scene.remove(t),circPhan.splice(n,1),0==circPhan.length&&nextLevel(),0===e.length&&nextRow(),drp.pop(),setTimeout((()=>{mkDrp(curLvlArr[0]+4)}),500)}!0!==o&&!1===hasWon&&(zzfx(...[,,396,,,.16,4,1.32,,,,,,.3,,.3,,.8,.02]),drp[0].material.color.set(16711680),drp[0].scale.set(.0125,.015,.0125),drp[0].position.z+=.01,drp.pop(),setTimeout((()=>{mkDrp(curLvlArr[0]+4)}),500))}}}function runOnce(){hasWon||(hasWon=!0,gameWin())}function gameWin(){drp.pop(),zzfx(...[1.35,,687,,.08,.21,,1.72,,,176,,.08,,,,.03,.7,.1,.01]);const e=[];for(let t=0;t<10;t++){const n=t%2==1?10:20,r=t/5*Math.PI;e.push(new THREE.Vector2(Math.cos(r)*n,Math.sin(r)*n))}const t=new THREE.Shape(e),n=new THREE.ShapeGeometry(t);winIM=new THREE.InstancedMesh(n,new THREE.MeshPhongMaterial({color:16744448}),250),winIM.scale.set(.015,.015,.015);const r=new THREE.Matrix4;for(let e=0;e<250;e++)randoMx(r),winIM.setMatrixAt(e,r);winIM.name="WinIM",scene.add(winIM);let o=scene.getObjectByName("ButLeft"),a=scene.getObjectByName("ButRight");o.visible=!1,a.visible=!1,setTimeout((function(){replay()}),5e3)}const randoMx=function(){const e=new THREE.Vector3,t=new THREE.Euler,n=new THREE.Quaternion,r=new THREE.Vector3;return function(o){e.x=400*Math.random()-200,e.y=400*Math.random()-200,e.z=400*Math.random()-600,t.x=2*Math.random()*Math.PI,t.y=2*Math.random()*Math.PI,t.z=2*Math.random()*Math.PI,n.setFromEuler(t),r.x=r.y=r.z=1*Math.random(),o.compose(e,n,r)}}();function replay(){drp.pop();let e=scene.getObjectByName("WinIM");scene.remove(e),scene.getObjectByName("Start").visible=!0,currRow=0;for(let e=1;e<7;e++)curLvlArr.push(e);let t=scene.getObjectByName("LevelUI");for(var n=t.children.length-1;n>=0;--n)t.remove(t.children[n]);scene.remove(group3),scene.children.forEach((e=>"AH"==e.name?scene.remove(e):null)),mkLvl(),hasWon=!1}