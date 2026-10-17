import * as THREE from './vendor/three.module.js';
import { OrbitControls } from './vendor/OrbitControls.js';
import { mergeGeometries } from './vendor/BufferGeometryUtils.js';

// All festival geometry, textures and interaction run locally. No remote model service.
const ready = document.readyState === 'loading' ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once:true })) : Promise.resolve();
await ready;
await import('./campus3d-ui.js?v=20261017a');
const shell=document.querySelector('#festival-world');
const host=document.querySelector('#world-canvas');
const loading=document.querySelector('#world-loading');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try {
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));
 renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.12;
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 host.appendChild(renderer.domElement);
 renderer.domElement.tabIndex=0;
 renderer.domElement.setAttribute('aria-label','3D festival alanı. Döndürmek için sürükleyin. Alan seçimi için aşağıdaki düğmeleri kullanabilirsiniz.');
 initFestival();
} catch(error) {
 loading.hidden=true;
 shell.classList.add('world-error');
 document.querySelector('#world-fallback').hidden=false;
 console.error('Festival 3D could not initialize:',error);
}

function initFestival(){
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(39,1,.1,500);
 const controls=new OrbitControls(camera,renderer.domElement);
 controls.enableDamping=true;controls.dampingFactor=.075;controls.enablePan=false;
 controls.minDistance=20;controls.maxDistance=260;
 controls.minPolarAngle=.16;controls.maxPolarAngle=Math.PI/2.2;
 controls.rotateSpeed=.55;controls.zoomSpeed=.7;controls.enableZoom=false;
 const hemi=new THREE.HemisphereLight(0xf4f3ff,0x9d86a3,2.1);scene.add(hemi);
 const sun=new THREE.DirectionalLight(0xffefd9,3.5);sun.position.set(-35,65,-40);sun.castShadow=true;
 sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-75;sun.shadow.camera.right=75;sun.shadow.camera.top=65;sun.shadow.camera.bottom=-65;sun.shadow.normalBias=.04;sun.shadow.bias=-.0003;sun.shadow.camera.far=180;sun.shadow.radius=3;scene.add(sun);
 const fill=new THREE.DirectionalLight(0xc9ccff,2);fill.position.set(25,18,-20);scene.add(fill);
 const rim=new THREE.DirectionalLight(0xffaaac,.8);rim.position.set(-20,8,-18);scene.add(rim);
 const groundShadow=new THREE.Mesh(new THREE.PlaneGeometry(150,150),new THREE.ShadowMaterial({color:0x5b3c6d,opacity:.16}));groundShadow.rotation.x=-Math.PI/2;groundShadow.position.y=-1.1;groundShadow.receiveShadow=true;scene.add(groundShadow);

 const materials=new Map();
 function mat(color,metalness=0,roughness=.65){const key=[color,metalness,roughness].join();if(!materials.has(key))materials.set(key,new THREE.MeshStandardMaterial({color,metalness,roughness}));return materials.get(key);}
 const m={white:mat('#fffaf5'),metal:mat('#737d8a',.76,.33),dark:mat('#292737',.45,.45),black:mat('#191a24',.15,.8),purple:mat('#00237e',.18,.35),pink:mat('#d42e12'),orange:mat('#d42e12'),yellow:mat('#f7d417'),teal:mat('#00a49c'),grass:mat('#b7cc99'),wood:mat('#c9946b'),silver:mat('#d5d7e2',.7,.3)};
 const groups={};
 for(const key of ['environment','stage','screen','stand','food','flags','experience','entrance','societies','gurmefest','design']){groups[key]=new THREE.Group();groups[key].userData.zone=key==='environment'?null:key;scene.add(groups[key]);}
 const animations=new THREE.Group();scene.add(animations);
 const lights=[];const flags=[];const glows=[];
 const V=(x,y,z)=>new THREE.Vector3(x,y,z);
 function mesh(geo,material,x,y,z,parent=groups.environment){const object=new THREE.Mesh(geo,material);object.position.set(x,y,z);object.castShadow=true;object.receiveShadow=true;parent.add(object);return object;}
 function box(w,h,d,x,y,z,material,parent){return mesh(new THREE.BoxGeometry(w,h,d),material,x,y,z,parent);}
 function cyl(r1,r2,h,x,y,z,material,parent,segments=12){return mesh(new THREE.CylinderGeometry(r1,r2,h,segments),material,x,y,z,parent);}
 function beam(a,b,r,material,parent){const delta=b.clone().sub(a);const object=mesh(new THREE.CylinderGeometry(r,r,delta.length(),8),material,0,0,0,parent);object.position.copy(a).add(b).multiplyScalar(.5);object.quaternion.setFromUnitVectors(V(0,1,0),delta.normalize());return object;}
 function emissive(color,intensity=1){return new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:intensity,roughness:.3});}
 const pinkLight=emissive('#d42e12',2.4),purpleLight=emissive('#007ecb',2.4),amberLight=emissive('#f7d417',2.1);

 function canvasTexture(width,height,draw){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');draw(ctx,width,height);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);return {canvas,ctx,texture};}
 function signTexture(text,bg='#ffffff',fg='#00237e',sub=''){return canvasTexture(1024,256,(c,w,h)=>{c.fillStyle=bg;c.fillRect(0,0,w,h);c.textAlign='center';c.fillStyle=fg;c.font='800 82px Arial';c.fillText(text,w/2,sub?126:157);if(sub){c.font='500 32px Arial';c.fillText(sub,w/2,193);}}).texture;}
 function sign(text,x,y,z,w,h,parent,bg,fg,sub){const material=new THREE.MeshBasicMaterial({map:signTexture(text,bg,fg,sub),toneMapped:false});return mesh(new THREE.PlaneGeometry(w,h),material,x,y,z,parent);}
 function roundedSlab(w,d,r,y,height,material,parent){const s=new THREE.Shape();s.moveTo(-w/2+r,-d/2);s.lineTo(w/2-r,-d/2);s.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);s.lineTo(w/2,d/2-r);s.quadraticCurveTo(w/2,d/2,w/2-r,d/2);s.lineTo(-w/2+r,d/2);s.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);s.lineTo(-w/2,-d/2+r);s.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);const o=mesh(new THREE.ExtrudeGeometry(s,{depth:height,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.08,bevelThickness:.07,curveSegments:10}),material,0,y,0,parent);o.rotation.x=-Math.PI/2;return o;}
 // Main stage: load-bearing truss frame, roof, deck, stairways and speaker arrays.
 const stage=groups.stage;
 box(18,1.15,8.2,0,.75,-9,m.dark,stage);box(18.1,.14,8.3,0,1.39,-9,mat('#4a4355'),stage);

 box(18,.12,.1,0,1.51,-4.81,purpleLight,stage);

 for(const x of [-8.5,8.5])for(const z of [-12.3,-5.7]){
  box(1.2,.18,1.2,x,1.57,z,m.metal,stage);
  for(const dx of [-.27,.27])for(const dz of [-.27,.27])beam(V(x+dx,1.65,z+dz),V(x+dx,10.4,z+dz),.065,m.silver,stage);
  for(let y=1.8;y<10;y+=1.05){for(const dz of [-.27,.27]){beam(V(x-.27,y,z+dz),V(x+.27,y+1.05,z+dz),.035,m.metal,stage);beam(V(x+.27,y,z+dz),V(x-.27,y+1.05,z+dz),.035,m.metal,stage);}}
 }
 function horizontalTruss(x1,x2,y,z){for(const dy of [-.25,.25])for(const dz of [-.25,.25])beam(V(x1,y+dy,z+dz),V(x2,y+dy,z+dz),.06,m.silver,stage);for(let x=x1;x<x2-.9;x+=1.1){beam(V(x,y-.25,z+.25),V(Math.min(x+1.1,x2),y+.25,z+.25),.035,m.metal,stage);beam(V(x,y+.25,z+.25),V(Math.min(x+1.1,x2),y-.25,z+.25),.035,m.metal,stage);}}
 horizontalTruss(-8.75,8.75,10.15,-5.7);horizontalTruss(-8.75,8.75,10.15,-12.3);horizontalTruss(-8,8,7.7,-10.7);
 // Pitched canopy and triangular front/rear trusses, matching the concert roof.
 const roofShape=new THREE.Shape();roofShape.moveTo(-9.5,0);roofShape.lineTo(0,3.6);roofShape.lineTo(9.5,0);roofShape.closePath();
 const canopy=mesh(new THREE.ExtrudeGeometry(roofShape,{depth:8.8,bevelEnabled:false}),mat('#66747c'),0,10.5,-13.4,stage);
 for(const z of [-13.4,-4.6]){beam(V(-9.5,10.5,z),V(0,14.1,z),.09,m.silver,stage);beam(V(0,14.1,z),V(9.5,10.5,z),.09,m.silver,stage);beam(V(-9.5,10.5,z),V(9.5,10.5,z),.08,m.silver,stage);}
 for(let x=-8;x<=8;x+=2){const y=14.1-Math.abs(x)*3.6/9.5;beam(V(x,10.5,-4.48),V(x,y,-4.48),.04,m.silver,stage);}
 sign('TEDÜ FEST',0,11.8,-4.39,8,1.2,stage,'#596871','#ffffff');
 for(const x of [-7.55,7.55]){
  for(let i=0;i<5;i++){
   const speaker=box(1.15,.58,.8,x,7.9-i*.59,-5.32,m.black,stage);speaker.rotation.x=i*.035;
   for(const dx of [-.3,.3]){const woofer=mesh(new THREE.CylinderGeometry(.19,.19,.03,16),mat('#363443',.3,.8),x+dx,7.9-i*.59,-4.9,stage);woofer.rotation.x=Math.PI/2;}
  }
  beam(V(x,8.25,-5.32),V(x,10.1,-5.32),.025,m.black,stage);
  box(1.5,1.2,1.1,x,2,-5.25,m.black,stage);
 }
 for(const x of [-4,-2,0,2,4]){const monitor=box(1,.5,.75,x,1.72,-5.7,m.black,stage);monitor.rotation.x=-.32;}
 // Drum kit, DJ riser and microphone stands add real stage scale.
 box(4,.45,1.7,0,1.73,-10,m.dark,stage);box(3.5,.1,1.1,0,2.2,-9.7,m.black,stage);
 for(const x of [-.9,.9]){const record=cyl(.38,.38,.035,x,2.29,-9.7,m.silver,stage,24);}
 for(const x of [-3.7,3.7]){cyl(.25,.25,.07,x,1.55,-7.1,m.black,stage);beam(V(x,1.6,-7.1),V(x,3.4,-7.1),.025,m.silver,stage);beam(V(x,3.4,-7.1),V(x+.4,3.55,-7),.025,m.black,stage);}

 const screen=canvasTexture(1024,512,()=>{});
 const led=new THREE.MeshBasicMaterial({map:screen.texture,toneMapped:false});
 box(13.7,6.4,.24,0,5.4,-11.85,m.black,groups.screen);
 mesh(new THREE.PlaneGeometry(13.3,6),led,0,5.4,-11.705,groups.screen);
 for(const x of [-6.82,6.82])box(.075,6.4,.09,x,5.4,-11.65,pinkLight,groups.screen);
 for(const y of [2.21,8.6])box(13.7,.06,.09,0,y,-11.65,purpleLight,groups.screen);
 const sideCanvas=canvasTexture(512,768,(c,w,h)=>{const gradient=c.createLinearGradient(0,0,w,h);gradient.addColorStop(0,'#00237e');gradient.addColorStop(.6,'#007ecb');gradient.addColorStop(1,'#00a49c');c.fillStyle=gradient;c.fillRect(0,0,w,h);c.fillStyle='#fff';c.textAlign='center';c.font='bold 54px Arial';c.fillText('MARKAN',w/2,360);c.fillText('BURADA',w/2,425);c.font='28px Arial';c.fillText('TEDÜ FEST',w/2,680);});
 for(const x of [-11,11]){beam(V(x,.3,-8),V(x,7.6,-8),.1,m.silver,groups.screen);box(3.6,5.5,.25,x,5.7,-8,m.dark,groups.screen);mesh(new THREE.PlaneGeometry(3.35,5.2),new THREE.MeshBasicMaterial({map:sideCanvas.texture,toneMapped:false}),x,5.7,-7.86,groups.screen);}
 const logo=new Image();logo.src='assets/logos/tedu-fest-color.svg';let logoReady=false;logo.onload=()=>{logoReady=true;drawLED(0);};
 function drawLED(time){const c=screen.ctx,w=1024,h=512;const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#001951');g.addColorStop(.5,'#00237e');g.addColorStop(1,'#00a49c');c.fillStyle=g;c.fillRect(0,0,w,h);c.strokeStyle='#7cdbde';c.globalAlpha=.35;c.lineWidth=2;for(let i=0;i<5;i++){c.beginPath();c.ellipse(w*.5,h*.55,220+i*90,160+i*48,Math.sin(time*.12)*.2,0,Math.PI*2);c.stroke();}c.globalAlpha=1;for(let i=0;i<44;i++){const v=25+Math.abs(Math.sin(i*1.31+time*1.8))*50;c.fillStyle=i%2?'#f7d417':'#d42e12';c.globalAlpha=.7;c.fillRect(i*24,h-v,12,v);}c.globalAlpha=1;if(logoReady)c.drawImage(logo,290,23,430,330);c.fillStyle='#fff5ff';c.textAlign='center';c.font='600 21px Arial';c.fillText('ŞEHRİN ORTASINDA. RİTMİN İÇİNDE.',w/2,405);screen.texture.needsUpdate=true;}
 drawLED(0);


 groups.stage.rotation.y=-Math.PI/2;groups.stage.position.x=5;groups.screen.rotation.y=-Math.PI/2;groups.screen.position.x=5;
 function booth(x,z,color,label,category='stand',rotation=0){
  const parent=groups[category];
  box(4.3,.2,3.25,x,.35,z,mat('#e0d8e6'),parent);
  box(4,2.8,.14,x,1.85,z-1.35,m.white,parent);
  box(.14,2.8,2.8,x-1.95,1.85,z,m.white,parent);
  for(const dx of [-1.96,1.96])for(const dz of [-1.35,1.35])beam(V(x+dx,.5,z+dz),V(x+dx,3.5,z+dz),.045,m.silver,parent);
  box(4.3,.3,3.2,x,3.55,z,mat(color),parent);
  box(4.3,.62,.15,x,3.2,z+1.52,mat(color),parent);
  sign(label,x,3.23,z+1.61,3.6,.43,parent,color,'#ffffff');
  box(3.4,.96,.7,x,.96,z+.95,m.white,parent);
  box(3.6,.09,.9,x,1.49,z+.95,mat(color),parent);
  sign('TEDÜ FEST',x,1,z+1.315,2.3,.46,parent,'#fffbf8',color);
  box(1.4,1.2,.08,x,2.05,z-1.25,mat(color),parent);
  sign('MERHABA!',x,2.12,z-1.195,1.35,.55,parent,color,'#ffffff');
  for(let i=0;i<4;i++)cyl(.08,.08,.24,x-.65+i*.43,1.65,z+.9,i%2?m.orange:m.purple,parent,10);
 }
 function foodTent(x,z,color,label,p=groups.food){box(4.3,.17,3.5,x,.35,z,m.white,p);for(const dx of [-1.95,1.95])for(const dz of [-1.45,1.45])beam(V(x+dx,.4,z+dz),V(x+dx,3.1,z+dz),.06,m.white,p);const roof=mesh(new THREE.ConeGeometry(3.15,1.3,4),mat(color),x,3.7,z,p);roof.rotation.y=Math.PI/4;roof.scale.z=.82;box(4.3,.52,3.6,x,3.04,z,mat(color),p);box(3.8,1.1,.8,x,1,z+1.05,m.wood,p);box(4,.12,1,x,1.6,z+1.05,m.white,p);sign(label,x,3.04,z+1.815,3.7,.41,p,color,'#fffdf5');for(let i=0;i<4;i++)cyl(.1,.1,.3,x-.75+i*.5,1.81,z+1.02,m.white,p);}
 function table(x,z,parent=groups.food){cyl(.75,.75,.1,x,1.2,z,m.wood,parent,24);cyl(.07,.07,1,x,.67,z,m.white,parent);for(const [dx,dz]of[[0,-1.1],[0,1.1],[-1.1,0],[1.1,0]]){cyl(.26,.26,.1,x+dx,.68,z+dz,m.white,parent);beam(V(x+dx,.25,z+dz),V(x+dx,.65,z+dz),.06,m.wood,parent);}}
 const flagTexture=canvasTexture(256,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#d42e12');g.addColorStop(.5,'#00237e');g.addColorStop(1,'#007ecb');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='#fff';c.textAlign='center';c.save();c.translate(135,255);c.rotate(-Math.PI/2);c.font='900 56px Arial';c.fillText('TEDÜ FEST',0,0);c.restore();c.beginPath();c.moveTo(100,70);c.lineTo(115,95);c.lineTo(150,107);c.lineTo(120,122);c.lineTo(105,152);c.lineTo(90,120);c.lineTo(58,110);c.lineTo(87,96);c.closePath();c.fill();}).texture;
 function flag(x,z,phase){const parent=groups.flags;box(.65,.12,.65,x,.28,z,m.silver,parent);beam(V(x,.35,z),V(x,6.5,z),.055,m.silver,parent);mesh(new THREE.SphereGeometry(.09,8,6),m.white,x,6.6,z,parent);const geometry=new THREE.PlaneGeometry(1.25,3.65,12,18);geometry.translate(.625,0,0);const cloth=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({map:flagTexture,side:THREE.DoubleSide,roughness:.7}));cloth.position.set(x,4.51,z);cloth.userData.zone='flags';cloth.userData.phase=phase;cloth.userData.original=geometry.attributes.position.array.slice();animations.add(cloth);flags.push(cloth);}
 function tree(x,z,scale=1){const p=groups.environment;cyl(.75,.8,.7,x,.5,z,mat('#e4d8dc'),p);cyl(.16,.22,2.1*scale,x,1.5*scale,z,m.wood,p);mesh(new THREE.IcosahedronGeometry(1.35*scale,1),mat('#87ad81'),x,3.15*scale,z,p);mesh(new THREE.IcosahedronGeometry(.95*scale,1),mat('#abc599'),x+.65*scale,3.0*scale,z+.35,p);}

 // İncesu courtyard: A to the west, B along the south, K at the stage end.
 // The same scene includes the Aksu courtyard across Ziya Gökalp.
 const stone=mat('#e4e0d5'),facade=mat('#f3f2eb'),glass=mat('#86adb6',.3,.24),edge=mat('#b4bfc1');
 box(67,1.15,52,-1,-.52,0,mat('#d1d6cc'));
 box(65,.15,50,-1,.09,0,stone);
 // Broad middle garden with a semicircular western end and a raised lawn edge.
 // Reference: TEDU's 360 tour, Sosyal Alanlar > Orta Bahçe.
 function gardenOutline(inset=0){
  const r=15.2-inset,cx=-8.8,right=23.2-inset;
  const shape=new THREE.Shape();shape.moveTo(cx,-r);shape.lineTo(right,-r);
  shape.lineTo(right,r);shape.lineTo(cx,r);
  shape.absarc(cx,0,r,Math.PI/2,Math.PI*1.5,false);shape.closePath();return shape;
 }
 function gardenSurface(shape,y,depth,material){
  const surface=mesh(new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:48}),material,0,y,0);
  surface.rotation.x=-Math.PI/2;return surface;
 }
 gardenSurface(gardenOutline(),.16,.22,mat('#b3bcb2'));
 gardenSurface(gardenOutline(.35),.39,.05,mat('#91b56e'));
 // A continuous curved promenade follows the round part of the grass.
 const promenade=gardenOutline(-2.25);promenade.holes.push(new THREE.Path(gardenOutline(-.2).getPoints(96)));
 const promenadeMesh=mesh(new THREE.ShapeGeometry(promenade,96),stone,0,.27,0);promenadeMesh.rotation.x=-Math.PI/2;
 // Terrace access sits on the garden's western side, away from the stage.
 for(let i=0;i<3;i++)box(1.1,.1*(i+1),7,-25.9+i*.6,.16+i*.05,0,stone);
 // The opposite, southern wall carries the food stalls; every counter faces the lawn.
 box(45,.85,.5,-1,.7,16,mat('#c8c5b6'));
 box(45,.1,.7,-1,1.16,16,mat('#a6aba4'));
 box(39,.12,5.2,-5,.45,13.1,stone);
 for(const [x,color,label] of [[-19,'#d42e12','SOKAK LEZZETLERİ'],[-13.6,'#f7d417','ATIŞTIRMALIK'],[-8.2,'#00237e','KAHVE'],[-2.8,'#00a49c','SOĞUK İÇECEK'],[2.6,'#d42e12','TATLI MOLASI']])foodTent(-x,-13.5,color,label);
 table(15,-9.4);table(9.5,-9.4);table(4,-9.4);
 groups.food.rotation.y=Math.PI;groups.food.position.y=.25;
 // The north boundary stays open for circulation and trees.
 box(57,1.8,.5,-1,1.05,-22,mat('#c8c5b6'));
 box(57,.15,.7,-1,2,-22,mat('#a6aba4'));
 for(let x=-28;x<=27;x+=2.8)box(.14,1.1,.14,x,2.62,-22,m.dark);
 beam(V(-28,3.12,-22),V(27,3.12,-22),.05,m.dark);
 for(let x=-23;x<25;x+=6)tree(x,-24.4,.9);
 for(const [x,z] of [[-22,8],[-22,-8],[23,13],[23,-13]])tree(x,z,.85);
 booth(-15,-17.4,'#00237e','MARKA DENEYİMİ');booth(-9.5,-17.4,'#d42e12','KEŞFET & DENE');
 for(const x of [-19,-13,-7])flag(x,-11.5,x*.3);
 flag(-23,2,1);flag(20,12,2);
 function building(name,x,z,w,d,h,accent='#b5b9b6'){
  box(w,h,d,x,h/2+.2,z,facade);
  box(w+.3,.25,d+.3,x,h+.4,z,mat(accent));
  box(w-.5,.08,d-.5,x,h+.57,z,mat('#dadcd6'));
  for(let y=1.6;y<h-.4;y+=2.4){
   for(let xx=x-w/2+1.1;xx<x+w/2-.7;xx+=2.5){for(const side of [-1,1]){box(1.65,1.4,.065,xx,y,z+side*(d/2+.04),glass);box(1.85,.1,.18,xx,y-.76,z+side*(d/2+.09),m.white);}}
   for(let zz=z-d/2+1.1;zz<z+d/2-.7;zz+=2.5){for(const side of [-1,1]){box(.065,1.4,1.65,x+side*(w/2+.04),y,zz,glass);}}
   box(w+.16,.15,d+.16,x,y+.95,z,m.white);
  }
  const labelTexture=signTexture(name,'#ffffff','#596673');
  const label=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTexture,depthTest:false,toneMapped:false}));label.position.set(x,h+2.6,z);label.scale.set(name.length>9?12:8,2.2,1);label.renderOrder=5;scene.add(label);
 }
 building('A BLOK',-28,0,7,38,10.5);
 building('B BLOK',0,20,57,7,10.5);
 building('K BLOK',29,0,8,34,6.5);
 // K's low conference volume has a broad flat roof, distinct from the concert canopy.
 box(6.5,.2,27,29,6.95,0,mat('#bdc7c4'));
 for(let z=-11;z<12;z+=3)box(5,.16,1.8,29,7.1,z,mat('#6c8994',.5,.3));
 // Main public street separates İncesu and Aksu instead of joining the two lawns.
 box(11,.09,77,-38,.03,2,mat('#929da0'));
 box(1.4,.18,77,-31.8,.13,2,stone);box(1.4,.18,77,-44.2,.13,2,stone);
 for(let z=-34;z<39;z+=6)box(.12,.016,2.8,-38,.09,z,mat('#e8e5d6'));
 for(let x=-42.7;x<-33;x+=1.2)box(.7,.02,4,x,.095,8,mat('#faf6e9'));
 const streetLabel=sign('ZİYA GÖKALP CADDESİ',-38,.13,-3,23,2,groups.environment,'#929da0','#ffffff');streetLabel.rotation.x=-Math.PI/2;streetLabel.rotation.z=Math.PI/2;
 // Aksu: the compact interior court surrounded by the C–H blocks.
 box(46,1.1,51,-69,-.52,0,mat('#d3d8d0'));box(45,.13,50,-69,.1,0,stone);
 box(20,.1,21,-69,.2,0,mat('#a6ba8d'));
 building('D BLOK',-85,0,7,38,10);building('F BLOK',-70,20,24,7,8);
 building('C BLOK',-60,9,8,15,6);building('G BLOK',-69,-20,33,7,9);
 building('H BLOK',-50,-10,7,19,9);building('E BLOK',-50,19,8,16,7);
 for(let i=0;i<4;i++){box(15,.2*(i+1),.8,-72,.2+i*.1,7+i*.8,stone);}
 // Three distinct rows leave circulation paths between the Aksu festival areas.
 booth(-77,-12,'#00a49c','TOPLULUKLAR','societies');booth(-70,-12,'#00a49c','ATÖLYELER','societies');
 foodTent(-77,-4,'#d42e12','GURMEFEST',groups.gurmefest);foodTent(-70,-4,'#f7d417','GURMEFEST',groups.gurmefest);
 booth(-77,4,'#00237e','TASARIM PAZARI','design');booth(-70,4,'#00237e','TASARIM PAZARI','design');
 table(-76,13,groups.gurmefest);table(-70,13,groups.gurmefest);
 for(const [x,z] of [[-88,-22],[-88,22],[-59,-13],[-80,13]])tree(x,z,.8);
 // A modest crowd across the courtyard, with the main lawn kept uninterrupted.
 for(let i=0;i<12;i++){const x=-79+(i%6)*2.7,z=-8+Math.floor(i/6)*8;cyl(.18,.22,.7,x,.68,z,[m.purple,m.orange,m.teal,m.yellow][i%4],groups.societies,8);mesh(new THREE.SphereGeometry(.14,8,6),mat('#cfa58a'),x,1.2,z,groups.societies);}
 // The lawn has no food stall on either side of the stage.

 // Instanced people keep the crowd detailed without hundreds of draw calls.
 let seed=27;function random(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}
 const people=[];for(let i=0;i<195;i++){let x=-20+random()*29,z=-10+random()*18;people.push({x,z,angle:random()*Math.PI*2,height:.77+random()*.23,color:Math.floor(random()*6)});}
 const shirtColors=['#00237e','#d42e12','#f2c254','#f7f0de','#586781','#69a995'];
 const temp=new THREE.Object3D();
 function instances(geometry,material,items,transform){const inst=new THREE.InstancedMesh(geometry,material,items.length);inst.castShadow=true;inst.receiveShadow=true;items.forEach((person,i)=>{transform(person,temp);temp.updateMatrix();inst.setMatrixAt(i,temp.matrix)});scene.add(inst);}
 for(let color=0;color<shirtColors.length;color++){const subset=people.filter(x=>x.color===color);instances(new THREE.CapsuleGeometry(.14,.35,3,6),mat(shirtColors[color]),subset,(p,t)=>{t.position.set(p.x,.83*p.height+.2,p.z);t.rotation.set(0,p.angle,0);t.scale.set(1,p.height,1)});}
 instances(new THREE.SphereGeometry(.135,8,6),mat('#c7977e'),people,(p,t)=>{t.position.set(p.x,1.25*p.height+.2,p.z);t.rotation.set(0,0,0);t.scale.set(1,1,1)});
 for(const side of [-1,1])instances(new THREE.CylinderGeometry(.06,.065,.4,6),mat('#555163'),people,(p,t)=>{t.position.set(p.x+Math.cos(p.angle)*side*.085,.39*p.height+.2,p.z+Math.sin(p.angle)*side*.085);t.rotation.set(0,p.angle,0);t.scale.set(1,p.height,1)});

 // Merge static geometry by zone/material. Picking keeps the zone on each merged mesh.
 function optimize(group){group.updateMatrixWorld(true);const batches=new Map();const originals=[];group.traverse(o=>{if(!o.isMesh||Array.isArray(o.material))return;const key=o.material.uuid;const geometry=o.geometry.clone().applyMatrix4(o.matrixWorld);if(!batches.has(key))batches.set(key,{material:o.material,geometries:[]});batches.get(key).geometries.push(geometry);originals.push(o);});for(const o of originals){o.parent.remove(o);o.geometry.dispose();}for(const {material,geometries}of batches.values()){const geometry=mergeGeometries(geometries,false);if(geometry){const o=new THREE.Mesh(geometry,material);o.castShadow=true;o.receiveShadow=true;o.userData.zone=group.userData.zone;group.add(o);}geometries.forEach(g=>g.dispose());}}
 Object.values(groups).forEach(g=>{optimize(g);g.position.set(0,0,0);g.rotation.set(0,0,0);});

 const locations={
  stand:{target:[-13,2,-17],pin:[-13,5,-17],color:'#d42e12',label:'Marka stantları',camera:'incesu'},
  flags:{target:[-18,3,-11],pin:[-18,7,-11],color:'#00237e',label:'Bayraklar',camera:'incesu'},
  food:{target:[-8,2,13.5],pin:[-8,6,13.5],color:'#f7d417',label:'Duvar boyu lezzetler',camera:'food'},
  societies:{target:[-74,1,-12],pin:[-74,5,-12],color:'#00a49c',label:'Topluluklar · Aksu',camera:'aksu'},
  gurmefest:{target:[-74,1,-4],pin:[-74,5,-4],color:'#d42e12',label:'Gurmefest',camera:'aksu'},
  design:{target:[-74,1,4],pin:[-74,5,4],color:'#00237e',label:'Tasarım Pazarı',camera:'aksu'}
 };
 const pins=document.querySelector('#world-hotspots');
 for(const [key,loc]of Object.entries(locations)){const b=document.createElement('button');b.type='button';b.className='world-hotspot';b.hidden=true;b.setAttribute('aria-label',loc.label+' alanını seç');b.setAttribute('aria-pressed',String(key==='food'));b.dataset.zone=key;b.style.setProperty('--pin-color',loc.color);b.innerHTML='<i></i><span>'+loc.label+'</span>';b.addEventListener('click',()=>pickZone(key));pins.appendChild(b);loc.element=b;loc.vector=V(...loc.pin);}
 const selection=new THREE.Mesh(new THREE.RingGeometry(1.25,1.36,64),new THREE.MeshBasicMaterial({color:'#f7d417',transparent:true,opacity:.65,side:THREE.DoubleSide,depthWrite:false}));selection.rotation.x=-Math.PI/2;selection.position.set(-8,.6,13.5);scene.add(selection);
 let active='food';
 function pickZone(key,focus=true){active=key;const loc=locations[key];selection.position.set(loc.target[0],.6,loc.target[2]);document.dispatchEvent(new CustomEvent('festival-scene-pick',{detail:{key,focus}}));}
 document.addEventListener('festival-zone-selected',e=>{const key=e.detail.key;if(locations[key]){active=key;selection.position.set(locations[key].target[0],.6,locations[key].target[2]);for(const [k,l]of Object.entries(locations))l.element.setAttribute('aria-pressed',String(k===key));if(e.detail.focus)setView(locations[key].camera);}});
 const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let pointerDown;
 const clickables=[groups.stand,groups.food,groups.flags,groups.societies,groups.gurmefest,groups.design,...flags];
 function rayAt(e){const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(clickables,true).find(h=>h.object.userData.zone||h.object.parent?.userData.zone);}
 renderer.domElement.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY};});
 renderer.domElement.addEventListener('pointerup',e=>{if(!pointerDown||Math.hypot(pointerDown.x-e.clientX,pointerDown.y-e.clientY)>7)return;const hit=rayAt(e);if(hit)pickZone(hit.object.userData.zone||hit.object.parent.userData.zone);pointerDown=null;});
 let lastHover=0;renderer.domElement.addEventListener('pointermove',e=>{if(e.buttons||performance.now()-lastHover<70)return;lastHover=performance.now();host.style.cursor=rayAt(e)?'pointer':'grab';});

 const views={incesu:{position:[-34,67,-70],target:[0,0,0]},aksu:{position:[-103,65,-59],target:[-70,0,0]},aerial:{position:[-30,155,-.1],target:[-30,0,0]},campus:{position:[-90,100,-100],target:[-30,0,0]},food:{position:[-16,35,-28],target:[-7,1,12]}};
 let transition=null,paused=reducedMotion.matches,visible=false,lastTime=0,lastLED=0;
 function responsivePosition(p){return V(...p).multiplyScalar(Math.max(1,1.25/(host.clientWidth/host.clientHeight)));}
 function setView(name,immediate=false){const view=views[name];if(!view)return;const target=V(...view.target);const offset=V(...view.position).sub(target);const destination=responsivePosition(offset.toArray()).add(target);if(immediate||reducedMotion.matches){camera.position.copy(destination);controls.target.copy(target);controls.update();transition=null;}else transition={from:camera.position.clone(),to:destination,startTarget:controls.target.clone(),target,start:performance.now()};document.querySelectorAll('[data-camera]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.camera===name)));}
 controls.addEventListener('start',()=>{transition=null;document.querySelectorAll('[data-camera]').forEach(b=>b.setAttribute('aria-pressed','false'));});
 function focusCampus(name){
  setView(name);
  if(name==='aksu'&&locations[active].camera!=='aksu')pickZone('societies',false);
  else if((name==='incesu'||name==='food')&&locations[active].camera==='aksu')pickZone('food',false);
 }
 document.querySelectorAll('[data-camera]').forEach(b=>b.addEventListener('click',()=>focusCampus(b.dataset.camera)));
 document.addEventListener('festival-camera-requested',e=>focusCampus(e.detail.name));
 document.querySelector('#world-reset').addEventListener('click',()=>setView('campus'));
 function zoom(factor){transition=null;const offset=camera.position.clone().sub(controls.target);const length=THREE.MathUtils.clamp(offset.length()*factor,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(offset.setLength(length));controls.update();}
 document.querySelector('#world-zoom-in').addEventListener('click',()=>zoom(.83));document.querySelector('#world-zoom-out').addEventListener('click',()=>zoom(1.2));
 function motionUI(){const b=document.querySelector('#world-motion');b.setAttribute('aria-pressed',String(paused));b.setAttribute('aria-label',paused?'Sahne hareketini başlat':'Sahne hareketini duraklat');b.textContent=paused?'▷':'Ⅱ';}
 document.querySelector('#world-motion').addEventListener('click',()=>{paused=!paused;motionUI()});motionUI();
 reducedMotion.addEventListener('change',e=>{paused=e.matches;motionUI()});
 renderer.domElement.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){zoom(.9);e.preventDefault()}else if(e.key==='-'){zoom(1.1);e.preventDefault()}else if(e.key==='Home'){setView('campus');e.preventDefault()}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();transition=null;const offset=camera.position.clone().sub(controls.target);const spherical=new THREE.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')spherical.theta-=.14;if(e.key==='ArrowRight')spherical.theta+=.14;if(e.key==='ArrowUp')spherical.phi-=.1;if(e.key==='ArrowDown')spherical.phi+=.1;spherical.phi=THREE.MathUtils.clamp(spherical.phi,controls.minPolarAngle,controls.maxPolarAngle);camera.position.copy(controls.target).add(offset.setFromSpherical(spherical));controls.update();}});
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);const preset=document.querySelector('[data-camera][aria-pressed="true"]');if(preset)setView(preset.dataset.camera,true);}
 const resizer=new ResizeObserver(resize);resizer.observe(host);resize();setView('campus',true);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:'180px'}).observe(host);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();visible=false;document.querySelector('#world-fallback').hidden=false;shell.classList.add('world-error')});
 renderer.domElement.addEventListener('webglcontextrestored',()=>location.reload());
 const projected=new THREE.Vector3();
 let animTime=0;
 function frame(time){requestAnimationFrame(frame);const dt=Math.min((time-lastTime)/1000,.06);lastTime=time;if(!visible||document.hidden)return;
  if(transition){const p=THREE.MathUtils.clamp((time-transition.start)/1000,0,1);const ease=1-Math.pow(1-p,3);camera.position.lerpVectors(transition.from,transition.to,ease);controls.target.lerpVectors(transition.startTarget,transition.target,ease);if(p===1)transition=null;}
  controls.update();
  if(!paused){animTime+=dt;for(const flag of flags){const attr=flag.geometry.attributes.position;const original=flag.userData.original;for(let i=0;i<attr.count;i++){const x=original[i*3];attr.setZ(i,Math.sin(x*3.5+animTime*2.4+original[i*3+1]*1.2+flag.userData.phase)*.14*x);}attr.needsUpdate=true;}glows.forEach((o,i)=>{o.rotation.z=Math.sin(animTime*.4+i)*.12;});selection.material.opacity=.5+Math.sin(animTime*2)*.15;if(time-lastLED>90){drawLED(animTime);lastLED=time;}}
  for(const [key,loc]of Object.entries(locations)){projected.copy(loc.vector).project(camera);const x=(projected.x*.5+.5)*host.clientWidth,y=(-projected.y*.5+.5)*host.clientHeight;const compact=host.clientWidth<500;const show=projected.z<1&&x>0&&x<host.clientWidth&&y>5&&y<host.clientHeight-50&&(!compact||key===active||(controls.target.x<-45?loc.camera==='aksu':controls.target.x<-20?['food','gurmefest','design'].includes(key):['stand','food'].includes(key)));loc.element.hidden=!show;const px=THREE.MathUtils.clamp(x,loc.element.offsetWidth/2+8,host.clientWidth-loc.element.offsetWidth/2-8);loc.element.style.transform=`translate(-50%,-50%) translate(${px.toFixed(1)}px,${y.toFixed(1)}px)`;loc.element.setAttribute('aria-pressed',String(key===active));}
  renderer.render(scene,camera);
 }
 loading.hidden=true;shell.dataset.ready='true';document.dispatchEvent(new CustomEvent('festival-scene-ready'));requestAnimationFrame(frame);
 // Always render a first frame even when the festival section starts below the fold.
 renderer.render(scene,camera);
}
