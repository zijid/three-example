import{O as D,u as z,V as p,Y as M}from"./OrbitControls-BG2Z3rzr.js";class E extends D{constructor(o=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=o,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new z(.5,.5),this.addEventListener("removed",function(){this.traverse(function(i){i.element instanceof Element&&i.element.parentNode!==null&&i.element.parentNode.removeChild(i.element)})})}copy(o,i){return super.copy(o,i),this.element=o.element.cloneNode(!0),this.center=o.center,this}}const d=new p,y=new M,S=new M,v=new p,w=new p;class q{constructor(o={}){const i=this;let u,c,h,m;const f={objects:new WeakMap},l=o.element!==void 0?o.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:u,height:c}},this.render=function(e,t){e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),y.copy(t.matrixWorldInverse),S.multiplyMatrices(t.projectionMatrix,y),x(e,e,t),_(e)},this.setSize=function(e,t){u=e,c=t,h=u/2,m=c/2,l.style.width=e+"px",l.style.height=t+"px"};function x(e,t,r){if(e.isCSS2DObject){d.setFromMatrixPosition(e.matrixWorld),d.applyMatrix4(S);const n=e.visible===!0&&d.z>=-1&&d.z<=1&&e.layers.test(r.layers)===!0;if(e.element.style.display=n===!0?"":"none",n===!0){e.onBeforeRender(i,t,r);const a=e.element;a.style.transform="translate("+-100*e.center.x+"%,"+-100*e.center.y+"%)translate("+(d.x*h+h)+"px,"+(-d.y*m+m)+"px)",a.parentNode!==l&&l.appendChild(a),e.onAfterRender(i,t,r)}const s={distanceToCameraSquared:O(r,e)};f.objects.set(e,s)}for(let n=0,s=e.children.length;n<s;n++)x(e.children[n],t,r)}function O(e,t){return v.setFromMatrixPosition(e.matrixWorld),w.setFromMatrixPosition(t.matrixWorld),v.distanceToSquared(w)}function C(e){const t=[];return e.traverse(function(r){r.isCSS2DObject&&t.push(r)}),t}function _(e){const t=C(e).sort(function(n,s){if(n.renderOrder!==s.renderOrder)return s.renderOrder-n.renderOrder;const a=f.objects.get(n).distanceToCameraSquared,W=f.objects.get(s).distanceToCameraSquared;return a-W}),r=t.length;for(let n=0,s=t.length;n<s;n++)t[n].element.style.zIndex=r-n}}}export{q as C,E as a};
