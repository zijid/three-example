var v=Object.defineProperty;var b=(r,e,i)=>e in r?v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[e]=i;var n=(r,e,i)=>(b(r,typeof e!="symbol"?e+"":e,i),i);import{r as S,j as M}from"./index-LRGvuY1f.js";import{h as B,B as g,b as w,M as u,C as q,l as z,W as O,e as E,d as H}from"./OrbitControls-BG2Z3rzr.js";import{V as I,b as A,B as p,C as W,W as j}from"./cannon-es-ByA38PEp.js";const a=class a{constructor(e,i={animation:a.STATICFUNCTION}){n(this,"state",a.STATIC);this.model=e,this.options=i,this.animation=i.animation,this.animation!==a.STATICFUNCTION&&(this.state=a.ANIMATION)}addAnimation(e){this.animation=e,this.state=a.ANIMATION}removeAnimation(){this.animation=a.STATICFUNCTION,this.state=a.STATIC}stop(){this.state=a.STATIC}play(){this.state=a.ANIMATION}update(){this.state==a.ANIMATION&&this.animation()}};n(a,"ANIMATION","animation"),n(a,"STATIC","static"),n(a,"STATICFUNCTION",()=>{});let y=a;class P{constructor(e){n(this,"canvas",null);n(this,"renderer",null);n(this,"scene",null);n(this,"camera",null);n(this,"world",null);n(this,"models",[]);n(this,"animationGroup",[]);n(this,"sphereBody",null);n(this,"MoneyList",[]);n(this,"easeInMoneyTime",null);n(this,"gameHairclippers",null);n(this,"hairclippersState",!1);this.canvas=e,this.init(),this.update()}init(){const e=this.canvas;if(!e&&e.tagName!=="CANVAS")throw new Error("Game:没有找到canvas");this.createScene(),this.createPhysics(),this.createGameScene(),this.createGameHairclippers();for(let i=0;i<100;i++)this.easeInMoney();this.updateSize(),this.addOrbitControls()}easeInMoney(){this.MoneyList.push(this.createGameMoney),this.easeInMoneyTime||(this.easeInMoneyTime=setInterval(()=>{this.MoneyList.length>0?this.MoneyList.shift().bind(this)():(clearInterval(this.easeInMoneyTime),this.easeInMoneyTime=null)},100))}addOrbitControls(){new B(this.camera,this.renderer.domElement)}updateSize(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),window.addEventListener("resize",()=>{this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()})}createGameScene(){const h=new g(4,.5,24),c=new w({color:16777215}),t=new u(h,c);t.position.y=0,this.scene.add(t);const d=new I(4/2,.5/2,24/2),l=new A(d),o=new p({mass:0,shape:l,type:p.STATIC});o.position.set(...t.position),o.quaternion.set(...t.quaternion),this.world.addBody(o);{const x=new g(4,10,5),C=new w({color:16711680}),m=new u(x,C);this.scene.add(m),m.position.y=10/2+1.25,m.position.z=-5.5;const N=new I(4/2,10/2,5/2),G=new A(N),T=new p({mass:0,shape:G});T.position.set(...m.position),T.quaternion.set(...m.quaternion),this.world.addBody(T)}}createGameMoney(){const h=new q(.4,.4,.08,12,1,!1,0,2*Math.PI),c=new w({color:65280,side:z}),t=new u(h,c);this.scene.add(t);let d=2;t.position.x=Math.random()*d-d/2,t.position.y=2,t.position.z=-2;const l=new W(.4,.4,.08,12),o=new p({mass:5,shape:l});o.position.set(...t.position),this.world.addBody(o),this.models.push(new y(t,{animation:()=>{t.position.copy(o.position),t.quaternion.copy(o.quaternion)}}))}stopHairclippers(){this.hairclippersState=!0}createGameHairclippers(){const h=new g(4,1,5),c=new w({color:65535}),t=new u(h,c);this.scene.add(t),t.position.y=1/2+.24,t.position.z=-5.5;const d=new I(4/2,1/2,5/2),l=new A(d),o=new p({mass:500,shape:l,type:p.KINEMATIC});o.position.set(...t.position),o.quaternion.set(...t.quaternion),this.world.addBody(o),this.state=!1;const f=.05;this.models.push(new y(t,{animation:()=>{t.position.z<-5.4&&(this.state=!0),t.position.z>-2&&(this.state=!1),t.position.z+=this.state?f:-1*f,o.position.copy(t.position),o.quaternion.copy(t.quaternion),t.position.copy(o.position),t.quaternion.copy(o.quaternion)}}))}newModel(){const e=new g,i=new w({color:65280}),s=new u(e,i);this.scene.add(s),this.models.push(new y(s,{animation:()=>{s.rotation.x+=.01,s.rotation.y+=.01}}))}createScene(){const e=new O({canvas:this.canvas}),i=new E,s=new H(75,window.innerWidth/window.innerHeight,.1,1e3);s.position.x=-4,s.position.y=2,s.position.z=5,i.add(s),this.renderer=e,this.scene=i,this.camera=s,this.camera.updateProjectionMatrix()}addAnimation(e){this.animationGroup.push(e)}removeAnimation(e){this.animationGroup=this.animationGroup.filter(i=>i!=e)}createPhysics(){const e=new j({gravity:new I(0,-9.82,0)});this.world=e}update(){requestAnimationFrame(this.update.bind(this));const{renderer:e,scene:i,camera:s,models:h}=this;e&&i&&s&&(h.forEach(c=>{c.update()}),e.render(i,s)),this.world.fixedStep()}}function D(){const r=S.useRef(null);return S.useRef(null),S.useEffect(()=>{r.current&&new P(r.current)},[]),M.jsx(M.Fragment,{children:M.jsx("canvas",{style:{display:"block"},ref:r,width:"500",height:"500"})})}export{D as default};
