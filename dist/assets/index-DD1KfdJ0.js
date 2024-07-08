var ae=Object.defineProperty;var ne=(a,r,e)=>r in a?ae(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var c=(a,r,e)=>(ne(a,typeof r!="symbol"?r+"":r,e),e);import{r as A,j as W}from"./index-LRGvuY1f.js";import{S as C,V as x,E as re,W as oe,P as he,D as le,B as L,a as K,b as ce,R as de,M as Y,C as ue,Q as fe,H as me,c as pe,d as ge}from"./cannon-es-ByA38PEp.js";import{G as we,M as H,V as y,C as ye,B as J,P as be,S as j,O as X,a as Q,b as R,L as P,c as N,d as xe,e as ve,F as Se,W as Ce,f as Me,A as Ve,g as Ee,D as Pe,h as Ne,I as ke,i as Fe}from"./OrbitControls-BG2Z3rzr.js";import*as Te from"https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js";var z=function(){var a=0,r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",r.addEventListener("click",function(f){f.preventDefault(),t(++a%r.children.length)},!1);function e(f){return r.appendChild(f.dom),f}function t(f){for(var p=0;p<r.children.length;p++)r.children[p].style.display=p===f?"block":"none";a=f}var s=(performance||Date).now(),n=s,i=0,o=e(new z.Panel("FPS","#0ff","#002")),h=e(new z.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var g=e(new z.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:r,addPanel:e,showPanel:t,begin:function(){s=(performance||Date).now()},end:function(){i++;var f=(performance||Date).now();if(h.update(f-s,200),f>=n+1e3&&(o.update(i*1e3/(f-n),100),n=f,i=0,g)){var p=performance.memory;g.update(p.usedJSHeapSize/1048576,p.jsHeapSizeLimit/1048576)}return f},update:function(){s=this.end()},domElement:r,setMode:t}};z.Panel=function(a,r,e){var t=1/0,s=0,n=Math.round,i=n(window.devicePixelRatio||1),o=80*i,h=48*i,g=3*i,f=2*i,p=3*i,m=15*i,w=74*i,l=30*i,u=document.createElement("canvas");u.width=o,u.height=h,u.style.cssText="width:80px;height:48px";var d=u.getContext("2d");return d.font="bold "+9*i+"px Helvetica,Arial,sans-serif",d.textBaseline="top",d.fillStyle=e,d.fillRect(0,0,o,h),d.fillStyle=r,d.fillText(a,g,f),d.fillRect(p,m,w,l),d.fillStyle=e,d.globalAlpha=.9,d.fillRect(p,m,w,l),{dom:u,update:function(b,D){t=Math.min(t,b),s=Math.max(s,b),d.fillStyle=e,d.globalAlpha=1,d.fillRect(0,0,o,m),d.fillStyle=r,d.fillText(n(b)+" "+a+" ("+n(t)+"-"+n(s)+")",g,f),d.drawImage(u,p+i,m,w-i,l,p,m,w-i,l),d.fillRect(p+w-i,m,i,l),d.fillStyle=e,d.globalAlpha=.9,d.fillRect(p+w-i,m,i,n((1-b/D)*l))}}};function O(a){a=a||{},a.resetBoundsInterval=a.resetBoundsInterval||3e3,a.resetBounds=a.resetBounds===void 0?!0:a.resetBounds,this.options=a,this.data=[],this.label=a.label||"",this.maxDataLength=a.maxDataLength||1e3,this.dataPool=[],this.maxValue=Number.NaN,this.minValue=Number.NaN,a.resetBounds&&(this.boundsTimer=setInterval(function(r){return function(){r.resetBounds()}}(this),a.resetBoundsInterval))}O.prototype.resetBounds=function(){this.maxValue=Number.NaN,this.minValue=Number.NaN;for(var a=0;a<this.data.length;a++)this.maxValue=isNaN(this.maxValue)?this.data[a][1]:Math.max(this.maxValue,this.data[a][1]),this.minValue=isNaN(this.minValue)?this.data[a][1]:Math.min(this.minValue,this.data[a][1])};O.prototype.append=function(a,r){this.lastTimeStamp=a;var e=this.dataPool.length?this.dataPool.pop():[a,r];for(e[0]=a,e[1]=r,this.data.push(e),this.maxValue=isNaN(this.maxValue)?r:Math.max(this.maxValue,r),this.minValue=isNaN(this.minValue)?r:Math.min(this.minValue,r);this.data.length>this.maxDataLength;)this.dataPool.push(this.data.shift())};function M(a){a=a||{},a.grid=a.grid||{fillStyle:"#000000",strokeStyle:"#777777",lineWidth:1,millisPerLine:1e3,verticalSections:2},a.millisPerPixel=a.millisPerPixel||20,a.fps=a.fps||50,a.maxValueScale=a.maxValueScale||1,a.minValue=a.minValue,a.maxValue=a.maxValue,a.labels=a.labels||{fillStyle:"#ffffff"},a.interpolation=a.interpolation||"bezier",a.scaleSmoothing=a.scaleSmoothing||.125,a.maxDataSetLength=a.maxDataSetLength||2,a.timestampFormatter=a.timestampFormatter||null,this.options=a,this.seriesSet=[],this.currentValueRange=1,this.currentVisMinValue=0}M.prototype.addTimeSeries=function(a,r){this.seriesSet.push({timeSeries:a,options:r||{}})};M.prototype.removeTimeSeries=function(a){this.seriesSet.splice(this.seriesSet.indexOf(a),1)};M.prototype.streamTo=function(a,r){var e=this;this.render_on_tick=function(){var t=e.seriesSet[0].timeSeries;t.data,e.render(a,t.lastTimeStamp)},this.start()};M.prototype.start=function(){this.timer||(this.timer=setInterval(this.render_on_tick,1e3/this.options.fps))};M.prototype.stop=function(){this.timer&&(clearInterval(this.timer),this.timer=void 0)};M.timeFormatter=function(a){function r(e){return(e<10?"0":"")+e}return r(a.getHours())+":"+r(a.getMinutes())+":"+r(a.getSeconds())};M.prototype.render=function(a,r){var e=a.getContext("2d"),t=this.options,s={top:0,left:0,width:a.clientWidth,height:a.clientHeight};if(e.save(),r=r-r%t.millisPerPixel,e.translate(s.left,s.top),e.beginPath(),e.rect(0,0,s.width,s.height),e.clip(),e.save(),e.fillStyle=t.grid.fillStyle,e.clearRect(0,0,s.width,s.height),e.fillRect(0,0,s.width,s.height),e.restore(),e.save(),e.lineWidth=t.grid.lineWidth||1,e.strokeStyle=t.grid.strokeStyle||"#ffffff",t.grid.millisPerLine>0)for(var n=r-r%t.grid.millisPerLine;n>=r-s.width*t.millisPerPixel;n-=t.grid.millisPerLine){e.beginPath();var i=Math.round(s.width-(r-n)/t.millisPerPixel);if(e.moveTo(i,0),e.lineTo(i,s.height),e.stroke(),t.timestampFormatter){var o=new Date(n),h=t.timestampFormatter(o),g=e.measureText(h).width/2+e.measureText(G).width+4;i<s.width-g&&(e.fillStyle=t.labels.fillStyle,e.fillText(h,i-e.measureText(h).width/2,s.height-2))}e.closePath()}for(var f=1;f<t.grid.verticalSections;f++){var p=Math.round(f*s.height/t.grid.verticalSections);e.beginPath(),e.moveTo(0,p),e.lineTo(s.width,p),e.stroke(),e.closePath()}e.beginPath(),e.strokeRect(0,0,s.width,s.height),e.closePath(),e.restore();for(var m=Number.NaN,w=Number.NaN,l=0;l<this.seriesSet.length;l++){var u=this.seriesSet[l].timeSeries;isNaN(u.maxValue)||(m=isNaN(m)?u.maxValue:Math.max(m,u.maxValue)),isNaN(u.minValue)||(w=isNaN(w)?u.minValue:Math.min(w,u.minValue))}if(isNaN(m)&&isNaN(w)){e.restore();return}t.maxValue!=null?m=t.maxValue:m=m*t.maxValueScale,t.minValue!=null&&(w=t.minValue);var d=m-w;this.currentValueRange+=t.scaleSmoothing*(d-this.currentValueRange),this.currentVisMinValue+=t.scaleSmoothing*(w-this.currentVisMinValue);for(var b=this.currentValueRange,D=this.currentVisMinValue,l=0;l<this.seriesSet.length;l++){e.save();for(var u=this.seriesSet[l].timeSeries,V=u.data,S=this.seriesSet[l].options;V.length>=t.maxDataSetLength&&V[1][0]<r-s.width*t.millisPerPixel;)V.splice(0,1);e.lineWidth=S.lineWidth||1,e.fillStyle=S.fillStyle,e.strokeStyle=S.strokeStyle||"#ffffff",e.beginPath();for(var _=0,q=0,I=0,v=0;v<V.length;v++){var E=Math.round(s.width-(r-V[v][0])/t.millisPerPixel),te=V[v][1],se=te-D,ie=s.height-(b?Math.round(se/b*s.height):0),B=Math.max(Math.min(ie,s.height-1),1);if(v==0)_=E,e.moveTo(E,B);else switch(t.interpolation){case"line":e.lineTo(E,B);break;case"bezier":default:e.bezierCurveTo(Math.round((q+E)/2),I,Math.round(q+E)/2,B,E,B);break}q=E,I=B}V.length>0&&S.fillStyle&&(e.lineTo(s.width+S.lineWidth+1,I),e.lineTo(s.width+S.lineWidth+1,s.height+S.lineWidth+1),e.lineTo(_,s.height+S.lineWidth),e.fill()),e.stroke(),e.closePath(),e.restore()}if(!t.labels.disabled){t.labelOffsetY||(t.labelOffsetY=0),e.fillStyle=t.labels.fillStyle;var U=parseFloat(m).toFixed(2),G=parseFloat(w).toFixed(2);e.fillText(U,s.width-e.measureText(U).width-2,10),e.fillText(G,s.width-e.measureText(G).width-2,s.height-2);for(var v=0;v<this.seriesSet.length;v++){var u=this.seriesSet[v].timeSeries,$=u.label;e.fillStyle=u.options.fillStyle||"rgb(255,255,255)",$&&e.fillText($,2,10*(v+1)+t.labelOffsetY)}}e.restore()};function ee(a){const r=document.createElement("div");return r.innerHTML=a.trim(),r.firstChild}function Le(){const a=document.title.slice(0,document.title.indexOf(" - ")),r=document.title.slice(document.title.indexOf(" - ")+3),e=`
	  <div class="page-title">
		<span>${a}</span> - ${r}
	  </div>
	`,t=ee(e);document.body.appendChild(t)}function Be(){const e=`
		<a class="view-source-button" href="${`https://github.com/pmndrs/cannon-es/blob/master/examples/${document.location.pathname.slice(document.location.pathname.lastIndexOf("/")+1)}.html`}" target="_blank" title="View source code on GitHub">
		  <img src="icons/code.svg">
		</a>
	  `,t=ee(e);document.body.appendChild(t)}function ze(a,{flatShading:r=!0}={}){switch(a.type){case C.types.SPHERE:return new j(a.radius,8,8);case C.types.PARTICLE:return new j(.1,8,8);case C.types.PLANE:return new be(500,500,4,4);case C.types.BOX:return new J(a.halfExtents.x*2,a.halfExtents.y*2,a.halfExtents.z*2);case C.types.CYLINDER:return new ye(a.radiusTop,a.radiusBottom,a.height,a.numSegments);case C.types.CONVEXPOLYHEDRON:{const e=new(void 0);for(let t=0;t<a.vertices.length;t++){const s=a.vertices[t];e.vertices.push(new y(s.x,s.y,s.z))}for(let t=0;t<a.faces.length;t++){const s=a.faces[t],n=s[0];for(let i=1;i<s.length-1;i++){const o=s[i],h=s[i+1];e.faces.push(new(void 0)(n,o,h))}}return e.computeBoundingSphere(),r?e.computeFaceNormals():e.computeVertexNormals(),e}case C.types.HEIGHTFIELD:{const e=new(void 0),t=new x,s=new x,n=new x;for(let i=0;i<a.data.length-1;i++)for(let o=0;o<a.data[i].length-1;o++)for(let h=0;h<2;h++){a.getConvexTrianglePillar(i,o,h===0),t.copy(a.pillarConvex.vertices[0]),s.copy(a.pillarConvex.vertices[1]),n.copy(a.pillarConvex.vertices[2]),t.vadd(a.pillarOffset,t),s.vadd(a.pillarOffset,s),n.vadd(a.pillarOffset,n),e.vertices.push(new y(t.x,t.y,t.z),new y(s.x,s.y,s.z),new y(n.x,n.y,n.z));const g=e.vertices.length-3;e.faces.push(new(void 0)(g,g+1,g+2))}return e.computeBoundingSphere(),r?e.computeFaceNormals():e.computeVertexNormals(),e}case C.types.TRIMESH:{const e=new(void 0),t=new x,s=new x,n=new x;for(let i=0;i<a.indices.length/3;i++){a.getTriangleVertices(i,t,s,n),e.vertices.push(new y(t.x,t.y,t.z),new y(s.x,s.y,s.z),new y(n.x,n.y,n.z));const o=e.vertices.length-3;e.faces.push(new(void 0)(o,o+1,o+2))}return e.computeBoundingSphere(),r?e.computeFaceNormals():e.computeVertexNormals(),e}default:throw new Error(`Shape not recognized: "${a.type}"`)}}function Z(a,r){const e=new we;return e.position.copy(a.position),e.quaternion.copy(a.quaternion),a.shapes.map(s=>{const n=ze(s);return new H(n,r)}).forEach((s,n)=>{const i=a.shapeOffsets[n],o=a.shapeOrientations[n];s.position.copy(i),s.quaternion.copy(o),e.add(s)}),e}class Re extends re{constructor(e){super(e);c(this,"sceneFolder");c(this,"scenes",[]);c(this,"listeners",{});c(this,"bodies",[]);c(this,"visuals",[]);c(this,"gui");c(this,"smoothie");c(this,"smoothieCanvas");c(this,"renderModes",["solid","wireframe"]);c(this,"dummy",new X);c(this,"initGui",()=>{this.gui=new Te.GUI,this.gui.domElement.parentNode.style.zIndex=3;const e=this.gui.addFolder("Rendering");e.add(this.settings,"rendermode",{Solid:"solid",Wireframe:"wireframe"}).onChange(i=>{this.setRenderMode(i)}),e.add(this.settings,"contacts"),e.add(this.settings,"cm2contact"),e.add(this.settings,"normals"),e.add(this.settings,"constraints"),e.add(this.settings,"axes"),e.add(this.settings,"shadows").onChange(i=>{i?(this.spotLight.castShadow=!0,this.renderer.shadowMap.autoUpdate=!0):(this.spotLight.castShadow=!1,this.renderer.shadowMap.autoUpdate=!1)}).setValue(!0),e.add(this.settings,"aabbs"),e.add(this.settings,"profiling").onChange(i=>{i?(this.world.doProfiling=!0,this.smoothie.start(),this.smoothieCanvas.style.display="block"):(this.world.doProfiling=!1,this.smoothie.stop(),this.smoothieCanvas.style.display="none")});const t=this.gui.addFolder("World");t.add(this.settings,"paused").onChange(i=>{i?this.smoothie.stop():this.smoothie.start(),this.resetCallTime=!0}),t.add(this.settings,"stepFrequency",10,60*10,10),t.add(this.settings,"maxSubSteps",1,50,1);const s=100;t.add(this.settings,"gx",-s,s).onChange(i=>{isNaN(i)||this.world.gravity.set(i,this.settings.gy,this.settings.gz)}),t.add(this.settings,"gy",-s,s).onChange(i=>{isNaN(i)||this.world.gravity.set(this.settings.gx,i,this.settings.gz)}),t.add(this.settings,"gz",-s,s).onChange(i=>{isNaN(i)||this.world.gravity.set(this.settings.gx,this.settings.gy,i)}),t.add(this.settings,"quatNormalizeSkip",0,50,1).onChange(i=>{isNaN(i)||(this.world.quatNormalizeSkip=i)}),t.add(this.settings,"quatNormalizeFast").onChange(i=>{this.world.quatNormalizeFast=!!i});const n=this.gui.addFolder("Solver");n.add(this.settings,"iterations",1,50,1).onChange(i=>{this.world.solver.iterations=i}),n.add(this.settings,"k",10,1e7).onChange(i=>{this.setGlobalSpookParams(this.settings.k,this.settings.d,1/this.settings.stepFrequency)}),n.add(this.settings,"d",0,20,.1).onChange(i=>{this.setGlobalSpookParams(this.settings.k,this.settings.d,1/this.settings.stepFrequency)}),n.add(this.settings,"tolerance",0,10,.01).onChange(i=>{this.world.solver.tolerance=i}),this.sceneFolder=this.gui.addFolder("Scenes"),this.sceneFolder.open()});c(this,"updateGui",()=>{this.gui.__controllers.forEach(e=>{e.updateDisplay()}),Object.values(this.gui.__folders).forEach(e=>{e.__controllers.forEach(t=>{t.updateDisplay()})})});c(this,"setRenderMode",e=>{if(!this.renderModes.includes(e))throw new Error(`Render mode ${e} not found!`);switch(e){case"solid":this.currentMaterial=this.solidMaterial,this.spotLight.intensity=1,this.ambientLight.color.setHex(2236962);break;case"wireframe":this.currentMaterial=this.wireframeMaterial,this.spotLight.intensity=0,this.ambientLight.color.setHex(16777215);break}this.visuals.forEach(t=>{t.material&&(t.material=this.currentMaterial),t.traverse(s=>{s.material&&(s.material=this.currentMaterial)})}),this.settings.rendermode=e});c(this,"initStats",()=>{this.stats=new z,document.body.appendChild(this.stats.domElement)});c(this,"addScene",(e,t)=>{if(typeof e!="string")throw new Error("1st argument of Demo.addScene(title,initfunc) must be a string!");if(typeof t!="function")throw new Error("2nd argument of Demo.addScene(title,initfunc) must be a function!");this.scenes.push(t);const s=this.scenes.length-1;this.sceneFolder.add({[e]:()=>this.changeScene(s)},e)});c(this,"restartCurrentScene",()=>{this.bodies.forEach(e=>{e.position.copy(e.initPosition),e.velocity.copy(e.initVelocity),e.initAngularVelocity&&(e.angularVelocity.copy(e.initAngularVelocity),e.quaternion.copy(e.initQuaternion))})});c(this,"updateVisuals",()=>{for(let e=0;e<this.bodies.length;e++){const t=this.bodies[e],s=this.visuals[e];let n=t.interpolatedPosition,i=t.interpolatedQuaternion;this.settings.paused&&(n=t.position,i=t.quaternion),s.isInstancedMesh?(this.dummy.position.copy(n),this.dummy.quaternion.copy(i),this.dummy.updateMatrix(),s.setMatrixAt(t.instanceIndex,this.dummy.matrix),s.instanceMatrix.needsUpdate=!0):(s.position.copy(n),s.quaternion.copy(i))}if(this.contactMeshCache.restart(),this.settings.contacts)for(let e=0;e<this.world.contacts.length;e++){const t=this.world.contacts[e];for(let s=0;s<2;s++){const n=this.contactMeshCache.request(),i=s===0?t.bi:t.bj,o=s===0?t.ri:t.rj;n.position.set(i.position.x+o.x,i.position.y+o.y,i.position.z+o.z)}}if(this.contactMeshCache.hideCached(),this.cm2contactMeshCache.restart(),this.settings.cm2contact)for(let e=0;e<this.world.contacts.length;e++){const t=this.world.contacts[e];for(let s=0;s<2;s++){const n=this.cm2contactMeshCache.request(),i=s===0?t.bi:t.bj,o=s===0?t.ri:t.rj;n.scale.set(o.x,o.y,o.z),T(n.scale),n.position.copy(i.position)}}if(this.cm2contactMeshCache.hideCached(),this.distanceConstraintMeshCache.restart(),this.p2pConstraintMeshCache.restart(),this.settings.constraints&&this.world.constraints.forEach(e=>{switch(!0){case e instanceof le:{e.equations.forEach(t=>{const{bi:s,bj:n}=t,i=this.distanceConstraintMeshCache.request(),o=n.position||n;i.scale.set(o.x-s.position.x,o.y-s.position.y,o.z-s.position.z),T(i.scale),i.position.copy(s.position)});break}case e instanceof he:{e.equations.forEach(t=>{const{bi:s,bj:n}=t,i=this.p2pConstraintMeshCache.request(),o=this.p2pConstraintMeshCache.request(),h=this.p2pConstraintMeshCache.request();t.ri&&i.scale.set(t.ri.x,t.ri.y,t.ri.z),t.rj&&o.scale.set(t.rj.x,t.rj.y,t.rj.z),t.penetrationVec&&h.scale.set(-t.penetrationVec.x,-t.penetrationVec.y,-t.penetrationVec.z),T(i.scale),T(o.scale),T(h.scale),i.position.copy(s.position),o.position.copy(n.position),t.bj&&t.rj&&t.bj.position.vadd(t.rj,h.position)});break}}}),this.p2pConstraintMeshCache.hideCached(),this.distanceConstraintMeshCache.hideCached(),this.normalMeshCache.restart(),this.settings.normals)for(let e=0;e<this.world.contacts.length;e++){const t=this.world.contacts[e],s=t.bi;t.bj;const n=this.normalMeshCache.request(),i=t.ni,o=s;n.scale.set(i.x,i.y,i.z),T(n.scale),n.position.copy(o.position),t.ri.vadd(n.position,n.position)}if(this.normalMeshCache.hideCached(),this.axesMeshCache.restart(),this.settings.axes)for(let e=0;e<this.bodies.length;e++){const t=this.bodies[e],s=this.axesMeshCache.request();s.position.copy(t.position),s.quaternion.copy(t.quaternion)}if(this.axesMeshCache.hideCached(),this.bboxMeshCache.restart(),this.settings.aabbs)for(let e=0;e<this.bodies.length;e++){const t=this.bodies[e];if(t.updateAABB&&(t.aabbNeedsUpdate&&t.updateAABB(),isFinite(t.aabb.lowerBound.x)&&isFinite(t.aabb.lowerBound.y)&&isFinite(t.aabb.lowerBound.z)&&isFinite(t.aabb.upperBound.x)&&isFinite(t.aabb.upperBound.y)&&isFinite(t.aabb.upperBound.z)&&t.aabb.lowerBound.x-t.aabb.upperBound.x!=0&&t.aabb.lowerBound.y-t.aabb.upperBound.y!=0&&t.aabb.lowerBound.z-t.aabb.upperBound.z!=0)){const s=this.bboxMeshCache.request();s.scale.set(t.aabb.lowerBound.x-t.aabb.upperBound.x,t.aabb.lowerBound.y-t.aabb.upperBound.y,t.aabb.lowerBound.z-t.aabb.upperBound.z),s.position.set((t.aabb.lowerBound.x+t.aabb.upperBound.x)*.5,(t.aabb.lowerBound.y+t.aabb.upperBound.y)*.5,(t.aabb.lowerBound.z+t.aabb.upperBound.z)*.5)}}this.bboxMeshCache.hideCached()});c(this,"changeScene",e=>{this.dispatchEvent({type:"destroy"}),Object.keys(this.listeners).forEach(t=>{this.listeners[t].forEach(s=>{this.removeEventListener(t,s)})}),this.listeners={},console.clear(),this.settings.paused=!1,this.updateGui(),this.buildScene(e)});c(this,"start",()=>{this.buildScene(0)});c(this,"buildScene",e=>{for(this.bodies.forEach(t=>this.world.removeBody(t)),this.removeAllVisuals();this.world.constraints.length;)this.world.removeConstraint(this.world.constraints[0]);this.scenes[e](),this.settings.iterations=this.world.solver.iterations,this.settings.gx=this.world.gravity.x+0,this.settings.gy=this.world.gravity.y+0,this.settings.gz=this.world.gravity.z+0,this.settings.quatNormalizeSkip=this.world.quatNormalizeSkip,this.settings.quatNormalizeFast=this.world.quatNormalizeFast,this.updateGui(),this.restartGeometryCaches()});c(this,"initGeometryCaches",()=>{this.materialColor=14540253,this.solidMaterial=new Q({color:this.materialColor}),this.wireframeMaterial=new R({color:16777215,wireframe:!0}),this.currentMaterial=this.solidMaterial;const e=new R({color:16777215});this.particleMaterial=new Q({color:16711680}),this.triggerMaterial=new R({color:65280,wireframe:!0});const t=new j(.1,6,6);this.contactMeshCache=new k(this.scene,()=>new H(t,e)),this.cm2contactMeshCache=new k(this.scene,()=>{const i=new(void 0);return i.vertices.push(new y(0,0,0)),i.vertices.push(new y(1,1,1)),new P(i,new N({color:16711680}))});const s=new J(1,1,1),n=new R({color:this.materialColor,wireframe:!0});this.bboxMeshCache=new k(this.scene,()=>new H(s,n)),this.distanceConstraintMeshCache=new k(this.scene,()=>{const i=new(void 0);return i.vertices.push(new y(0,0,0)),i.vertices.push(new y(1,1,1)),new P(i,new N({color:16711680}))}),this.p2pConstraintMeshCache=new k(this.scene,()=>{const i=new(void 0);return i.vertices.push(new y(0,0,0)),i.vertices.push(new y(1,1,1)),new P(i,new N({color:16711680}))}),this.normalMeshCache=new k(this.scene,()=>{const i=new(void 0);return i.vertices.push(new y(0,0,0)),i.vertices.push(new y(1,1,1)),new P(i,new N({color:65280}))}),this.axesMeshCache=new k(this.scene,()=>{const i=new X,o=new y(0,0,0),h=new(void 0),g=new(void 0),f=new(void 0);h.vertices.push(o),g.vertices.push(o),f.vertices.push(o),h.vertices.push(new y(1,0,0)),g.vertices.push(new y(0,1,0)),f.vertices.push(new y(0,0,1));const p=new P(h,new N({color:16711680})),m=new P(g,new N({color:65280})),w=new P(f,new N({color:255}));return i.add(p),i.add(m),i.add(w),i})});c(this,"restartGeometryCaches",()=>{this.contactMeshCache.restart(),this.contactMeshCache.hideCached(),this.cm2contactMeshCache.restart(),this.cm2contactMeshCache.hideCached(),this.distanceConstraintMeshCache.restart(),this.distanceConstraintMeshCache.hideCached(),this.normalMeshCache.restart(),this.normalMeshCache.hideCached()});c(this,"animate",()=>{requestAnimationFrame(this.animate),this.settings.paused||(this.updatePhysics(),this.updateVisuals()),this.controls.update(),this.renderer.render(this.scene,this.camera),this.stats.update()});c(this,"lastCallTime",0);c(this,"resetCallTime",!1);c(this,"updatePhysics",()=>{const e=1/this.settings.stepFrequency,t=performance.now()/1e3;if(!this.lastCallTime){this.world.step(e),this.lastCallTime=t;return}let s=t-this.lastCallTime;this.resetCallTime&&(s=0,this.resetCallTime=!1),this.world.step(e,s,this.settings.maxSubSteps),this.lastCallTime=t});c(this,"resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)});c(this,"onKeyPress",e=>{switch(e.code){case"Space":this.restartCurrentScene();break;case"KeyH":this.stats.domElement.style.display=="none"?(this.stats.domElement.style.display="block",info.style.display="block"):(this.stats.domElement.style.display="none",info.style.display="none");break;case"KeyA":this.settings.aabbs=!this.settings.aabbs,this.updateGui();break;case"KeyC":this.settings.constraints=!this.settings.constraints,this.updateGui();break;case"KeyP":this.settings.paused=!this.settings.paused,this.resetCallTime=!0,this.updateGui();break;case"KeyS":const t=1/this.settings.stepFrequency;this.world.step(t),this.updateVisuals();break;case"KeyM":let s=this.renderModes.indexOf(this.settings.rendermode);s++,s=s%this.this.renderModes.length,this.setRenderMode(this.renderModes[s]),this.updateGui();break;case"Digit1":case"Digit2":case"Digit3":case"Digit4":case"Digit5":case"Digit6":case"Digit7":case"Digit8":case"Digit9":const n=Number(e.code.slice(-1))-1;this.scenes.length>n&&!document.activeElement.localName.match(/input/)&&this.changeScene(n);break}});c(this,"initThree",()=>{this.camera=new xe(24,window.innerWidth/window.innerHeight,5,2e3),this.camera.position.set(0,20,30),this.camera.lookAt(0,0,0),this.scene=new ve,this.scene.fog=new Se(2236962,1e3,2e3),this.renderer=new Ce({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.renderer.setClearColor(this.scene.fog.color,1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Me,this.ambientLight=new Ve(16777215,.1),this.scene.add(this.ambientLight),this.spotLight=new Ee(16777215,.9,0,Math.PI/8,1),this.spotLight.position.set(-30,40,30),this.spotLight.target.position.set(0,0,0),this.spotLight.castShadow=!0,this.spotLight.shadow.camera.near=10,this.spotLight.shadow.camera.far=100,this.spotLight.shadow.camera.fov=30,this.spotLight.shadow.mapSize.width=2048,this.spotLight.shadow.mapSize.height=2048,this.scene.add(this.spotLight);const e=new Pe(16777215,.15);e.position.set(-30,40,30),e.target.position.set(0,0,0),this.scene.add(e),this.controls=new Ne(this.camera,this.renderer.domElement),this.controls.rotateSpeed=1,this.controls.zoomSpeed=1.2,this.controls.enableDamping=!0,this.controls.enablePan=!1,this.controls.dampingFactor=.2,this.controls.minDistance=10,this.controls.maxDistance=500});c(this,"initSmoothie",()=>{this.smoothieCanvas=document.createElement("canvas"),this.smoothieCanvas.width=window.innerWidth,this.smoothieCanvas.height=window.innerHeight,this.smoothieCanvas.style.opacity=.5,this.smoothieCanvas.style.position="absolute",this.smoothieCanvas.style.top="0px",this.smoothieCanvas.style.zIndex=1,document.body.appendChild(this.smoothieCanvas),this.smoothie=new M({labelOffsetY:50,maxDataSetLength:100,millisPerPixel:2,grid:{strokeStyle:"none",fillStyle:"none",lineWidth:1,millisPerLine:250,verticalSections:6},labels:{fillStyle:"rgb(180, 180, 180)"}}),this.smoothie.streamTo(this.smoothieCanvas);const e={},t=[[255,0,0],[0,255,0],[0,0,255],[255,255,0],[255,0,255],[0,255,255]];Object.keys(this.world.profile).forEach((s,n)=>{const i=t[n%t.length];e[s]=new O({label:s,fillStyle:`rgb(${i[0]},${i[1]},${i[2]})`,maxDataLength:500})}),this.world.addEventListener("postStep",()=>{Object.keys(this.world.profile).forEach(s=>{e[s].append(this.world.time*1e3,this.world.profile[s])})}),Object.keys(this.world.profile).forEach((s,n)=>{const i=t[n%t.length];this.smoothie.addTimeSeries(e[s],{strokeStyle:`rgb(${i[0]},${i[1]},${i[2]})`,lineWidth:2})}),this.world.doProfiling=!1,this.smoothie.stop(),this.smoothieCanvas.style.display="none"});if(this.settings={stepFrequency:60,quatNormalizeSkip:2,quatNormalizeFast:!0,gx:0,gy:0,gz:0,iterations:3,tolerance:1e-4,k:1e6,d:3,scene:0,paused:!1,rendermode:"solid",constraints:!1,contacts:!1,cm2contact:!1,normals:!1,axes:!1,shadows:!1,aabbs:!1,profiling:!1,maxSubSteps:20,...e},this.settings.stepFrequency%60!==0)throw new Error("stepFrequency must be a multiple of 60.");this.world=new oe,this.initThree(),this.initGeometryCaches(),this.initStats(),this.initSmoothie(),this.initGui(),Le(),Be(),this.animate(),window.addEventListener("resize",this.resize),document.addEventListener("keypress",this.onKeyPress)}setGlobalSpookParams(e,t,s){for(let n=0;n<this.world.constraints.length;n++){const i=this.world.constraints[n];for(let o=0;o<i.equations.length;o++)i.equations[o].setSpookParams(e,t,s)}for(let n=0;n<this.world.contactmaterials.length;n++){const i=this.world.contactmaterials[n];i.contactEquationStiffness=e,i.frictionEquationStiffness=e,i.contactEquationRelaxation=t,i.frictionEquationRelaxation=t}this.world.defaultContactMaterial.contactEquationStiffness=e,this.world.defaultContactMaterial.frictionEquationStiffness=e,this.world.defaultContactMaterial.contactEquationRelaxation=t,this.world.defaultContactMaterial.frictionEquationRelaxation=t}getWorld(){return this.world}addVisual(e){if(!(e instanceof L))throw new Error("The argument passed to addVisual() is not a body");const s=e.shapes.every(i=>i instanceof K)?this.particleMaterial:e.isTrigger?this.triggerMaterial:this.currentMaterial,n=Z(e,s);n.traverse(i=>{i.castShadow=!0,i.receiveShadow=!0}),this.bodies.push(e),this.visuals.push(n),this.scene.add(n)}addVisuals(e){e.forEach(t=>{this.addVisual(t)})}addVisualsInstanced(e){if(!Array.isArray(e)||!e.every(h=>h instanceof L&&h.type===e[0].type))throw new Error("The argument passed to addVisualsInstanced() is not an array of bodies of the same type");const t=e[0],s=t.shapes.every(h=>h instanceof K)?this.particleMaterial:this.currentMaterial,n=Z(t,s);let i;n.traverse(h=>{h.isMesh&&(i=h)});const o=new ke(i.geometry.clone(),i.material.clone(),e.length);o.instanceMatrix.setUsage(Fe),o.receiveShadow=!0,o.castShadow=!0,e.forEach((h,g)=>{this.bodies.push(h),this.visuals.push(o),h.instanceIndex=g}),this.scene.add(o)}removeVisual(e){const t=this.bodies.findIndex(n=>n.id===e.id);if(t===-1)return;const s=this.visuals[t];this.bodies.splice(t,1),this.visuals.splice(t,1),this.scene.remove(s)}removeAllVisuals(){for(;this.bodies.length;)this.removeVisual(this.bodies[0])}addEventListener(e,t){this.listeners[e]?this.listeners[e].push(t):this.listeners[e]=[t],super.addEventListener(e,t)}}class k{constructor(r,e){c(this,"geometries",[]);c(this,"gone",[]);c(this,"request",()=>{const r=this.geometries.length>0?this.geometries.pop():this.createFunc();return this.scene.add(r),this.gone.push(r),r});c(this,"restart",()=>{for(;this.gone.length;)this.geometries.push(this.gone.pop())});c(this,"hideCached",()=>{this.geometries.forEach(r=>{this.scene.remove(r)})});this.scene=r,this.createFunc=e}}function T(a){a.x===0&&(a.x=1e-6),a.y===0&&(a.y=1e-6),a.z===0&&(a.z=1e-6)}const F=new Re;F.addScene("Car",()=>{const a=De(F),r=new ce(new x(2,.5,1)),e=new L({mass:150});e.addShape(r),e.position.set(0,4,0),e.angularVelocity.set(0,.5,0),F.addVisual(e);const t=new de({chassisBody:e}),s={radius:.5,directionLocal:new x(0,-1,0),suspensionStiffness:30,suspensionRestLength:.3,frictionSlip:1.4,dampingRelaxation:2.3,dampingCompression:4.4,maxSuspensionForce:1e5,rollInfluence:.01,axleLocal:new x(0,0,1),chassisConnectionPointLocal:new x(-1,0,1),maxSuspensionTravel:.3,customSlidingRotationalSpeed:-30,useCustomSlidingRotationalSpeed:!0};s.chassisConnectionPointLocal.set(-1,0,1),t.addWheel(s),s.chassisConnectionPointLocal.set(-1,0,-1),t.addWheel(s),s.chassisConnectionPointLocal.set(1,0,1),t.addWheel(s),s.chassisConnectionPointLocal.set(1,0,-1),t.addWheel(s),t.addToWorld(a);const n=[],i=new Y("wheel");t.wheelInfos.forEach(l=>{const u=new ue(l.radius,l.radius,l.radius/2,20),d=new L({mass:0,material:i});d.type=L.KINEMATIC,d.collisionFilterGroup=0;const b=new fe().setFromEuler(-Math.PI/2,0,0);d.addShape(u,new x,b),n.push(d),F.addVisual(d),a.addBody(d)}),a.addEventListener("postStep",()=>{for(let l=0;l<t.wheelInfos.length;l++){t.updateWheelTransform(l);const u=t.wheelInfos[l].worldTransform,d=n[l];d.position.copy(u.position),d.quaternion.copy(u.quaternion)}});const o=64,h=64,g=[];for(let l=0;l<o;l++){g.push([]);for(let u=0;u<h;u++){if(l===0||l===o-1||u===0||u===h-1){g[l].push(3);continue}const d=Math.cos(l/o*Math.PI*5)*Math.cos(u/h*Math.PI*5)*2+2;g[l].push(d)}}const f=new Y("ground"),p=new me(g,{elementSize:100/o}),m=new L({mass:0,material:f});m.addShape(p),m.position.set(-(o*p.elementSize)/2,-1,h*p.elementSize/2),m.quaternion.setFromEuler(-Math.PI/2,0,0),a.addBody(m),F.addVisual(m);const w=new pe(i,f,{friction:.3,restitution:0,contactEquationStiffness:1e3});a.addContactMaterial(w),document.addEventListener("keydown",l=>{switch(l.key){case"w":case"ArrowUp":t.applyEngineForce(-1e3,2),t.applyEngineForce(-1e3,3);break;case"s":case"ArrowDown":t.applyEngineForce(1e3,2),t.applyEngineForce(1e3,3);break;case"a":case"ArrowLeft":t.setSteeringValue(.5,0),t.setSteeringValue(.5,1);break;case"d":case"ArrowRight":t.setSteeringValue(-.5,0),t.setSteeringValue(-.5,1);break;case"b":t.setBrake(1e6,0),t.setBrake(1e6,1),t.setBrake(1e6,2),t.setBrake(1e6,3);break}}),document.addEventListener("keyup",l=>{switch(l.key){case"w":case"ArrowUp":t.applyEngineForce(0,2),t.applyEngineForce(0,3);break;case"s":case"ArrowDown":t.applyEngineForce(0,2),t.applyEngineForce(0,3);break;case"a":case"ArrowLeft":t.setSteeringValue(0,0),t.setSteeringValue(0,1);break;case"d":case"ArrowRight":t.setSteeringValue(0,0),t.setSteeringValue(0,1);break;case"b":t.setBrake(0,0),t.setBrake(0,1),t.setBrake(0,2),t.setBrake(0,3);break}})});F.start();console.log("demo:",F);function De(a){const r=a.getWorld();return r.gravity.set(0,-10,0),r.broadphase=new ge(r),r.defaultContactMaterial.friction=0,r}function We(){const a=A.useRef(null);return A.useRef(null),A.useEffect(()=>{a.current},[]),W.jsxs(W.Fragment,{children:["123",W.jsx("canvas",{style:{display:"block"},ref:a,width:"500",height:"500"})]})}export{We as default};
