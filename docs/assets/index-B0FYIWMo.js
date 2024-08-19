import{r as Se,j as Te}from"./index--S1ByAj9.js";import{e as He,m as Ae,M as je,P as Re,n as ke,o as Ge,R as be,p as We,q as De,N as ne,r as ye,D as Me,s as ze,U as Be,t as Oe,u as Ve,v as _e,l as qe,w as Fe,x as Ee}from"./OrbitControls-T7DR67G2.js";import{W as Le}from"./three.utils-1hpgBcPy.js";class Ze{constructor(s,i,u){this.variables=[],this.currentTextureIndex=0;let m=De;const T=new He,h=new Ae;h.position.z=1;const o={passThruTexture:{value:null}},F=V(d(),o),l=new je(new Re(2,2),F);T.add(l),this.setDataType=function(t){return m=t,this},this.addVariable=function(t,e,n){const p=this.createShaderMaterial(e),r={name:t,initialValueTexture:n,material:p,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:ne,magFilter:ne};return this.variables.push(r),r},this.setVariableDependencies=function(t,e){t.dependencies=e},this.init=function(){if(u.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let t=0;t<this.variables.length;t++){const e=this.variables[t];e.renderTargets[0]=this.createRenderTarget(s,i,e.wrapS,e.wrapT,e.minFilter,e.magFilter),e.renderTargets[1]=this.createRenderTarget(s,i,e.wrapS,e.wrapT,e.minFilter,e.magFilter),this.renderTexture(e.initialValueTexture,e.renderTargets[0]),this.renderTexture(e.initialValueTexture,e.renderTargets[1]);const n=e.material,p=n.uniforms;if(e.dependencies!==null)for(let r=0;r<e.dependencies.length;r++){const a=e.dependencies[r];if(a.name!==e.name){let c=!1;for(let w=0;w<this.variables.length;w++)if(a.name===this.variables[w].name){c=!0;break}if(!c)return"Variable dependency not found. Variable="+e.name+", dependency="+a.name}p[a.name]={value:null},n.fragmentShader=`
uniform sampler2D `+a.name+`;
`+n.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const t=this.currentTextureIndex,e=this.currentTextureIndex===0?1:0;for(let n=0,p=this.variables.length;n<p;n++){const r=this.variables[n];if(r.dependencies!==null){const a=r.material.uniforms;for(let c=0,w=r.dependencies.length;c<w;c++){const D=r.dependencies[c];a[D.name].value=D.renderTargets[t].texture}}this.doRenderTarget(r.material,r.renderTargets[e])}this.currentTextureIndex=e},this.getCurrentRenderTarget=function(t){return t.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(t){return t.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){l.geometry.dispose(),l.material.dispose();const t=this.variables;for(let e=0;e<t.length;e++){const n=t[e];n.initialValueTexture&&n.initialValueTexture.dispose();const p=n.renderTargets;for(let r=0;r<p.length;r++)p[r].dispose()}};function S(t){t.defines.resolution="vec2( "+s.toFixed(1)+", "+i.toFixed(1)+" )"}this.addResolutionDefine=S;function V(t,e){e=e||{};const n=new ke({name:"GPUComputationShader",uniforms:e,vertexShader:j(),fragmentShader:t});return S(n),n}this.createShaderMaterial=V,this.createRenderTarget=function(t,e,n,p,r,a){return t=t||s,e=e||i,n=n||ye,p=p||ye,r=r||ne,a=a||ne,new Ge(t,e,{wrapS:n,wrapT:p,minFilter:r,magFilter:a,format:be,type:m,depthBuffer:!1})},this.createTexture=function(){const t=new Float32Array(s*i*4),e=new We(t,s,i,be,De);return e.needsUpdate=!0,e},this.renderTexture=function(t,e){o.passThruTexture.value=t,this.doRenderTarget(F,e),o.passThruTexture.value=null},this.doRenderTarget=function(t,e){const n=u.getRenderTarget(),p=u.xr.enabled,r=u.shadowMap.autoUpdate;u.xr.enabled=!1,u.shadowMap.autoUpdate=!1,l.material=t,u.setRenderTarget(e),u.render(T,h),l.material=F,u.xr.enabled=p,u.shadowMap.autoUpdate=r,u.setRenderTarget(n)};function j(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function d(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const Je=`\r
uniform sampler2D heightmap;\r
\r
#define PHONG\r
\r
varying vec3 vViewPosition;\r
\r
\r
varying vec3 vNormal;\r
\r
\r
void main() {\r
\r
vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );\r
\r
#include <uv_vertex>\r
#include <color_vertex>\r
\r
// # include <beginnormal_vertex>\r
// Compute normal from heightmap\r
vec3 objectNormal = vec3(\r
( texture2D( heightmap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( heightmap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,\r
( texture2D( heightmap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( heightmap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,\r
1.0 );\r
//<beginnormal_vertex>\r
\r
#include <morphnormal_vertex>\r
#include <skinbase_vertex>\r
#include <skinnormal_vertex>\r
#include <defaultnormal_vertex>\r
\r
#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\r
\r
vNormal = normalize( transformedNormal );\r
\r
#endif\r
\r
//# include <begin_vertex>\r
float heightValue = texture2D( heightmap, uv ).x;\r
vec3 transformed = vec3( position.x, position.y, -heightValue );\r
//<begin_vertex>\r
\r
#include <morphtarget_vertex>\r
#include <skinning_vertex>\r
#include <displacementmap_vertex>\r
#include <project_vertex>\r
#include <logdepthbuf_vertex>\r
#include <clipping_planes_vertex>\r
\r
vViewPosition = - mvPosition.xyz;\r
\r
#include <worldpos_vertex>\r
#include <envmap_vertex>\r
#include <shadowmap_vertex>\r
\r
}\r
`,Ke=`#include <common>\r
\r
uniform vec2 mousePos;\r
uniform float mouseSize;\r
uniform float viscosityConstant;\r
uniform float heightCompensation;\r
uniform float time;\r
void main() {\r
	vec2 cellSize = 1.0 / resolution.xy;\r
	vec2 uv = gl_FragCoord.xy * cellSize;\r
	// heightmapValue.x == height from previous frame\r
	// heightmapValue.y == height from penultimate frame\r
	// heightmapValue.z, heightmapValue.w not used\r
	vec4 heightmapValue = texture2D(heightmap, uv);\r
\r
				// Get neighbours\r
				// Get neighbours\r
	vec4 north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) );\r
	vec4 south = texture2D(heightmap, uv + vec2(0.0, -cellSize.y));\r
	vec4 east = texture2D(heightmap, uv + vec2(cellSize.x, 0.0));\r
	vec4 west = texture2D(heightmap, uv + vec2(-cellSize.x, 0.0));\r
\r
				// https://web.archive.org/web/20080618181901/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm\r
\r
	float newHeight = ((north.x + south.x + east.x + west.x) *0.5 - heightmapValue.y) * 1.;\r
\r
	// Mouse influence\r
	// float mousePhase = clamp(length((uv - vec2(0.5)) * BOUNDS - vec2(step(1.,sin(time)),0.)) * PI /mouseSize, 0.0, PI);\r
	// newHeight += (cos(mousePhase) + 1.0) * 0.28;\r
	heightmapValue.y = heightmapValue.x;\r
	heightmapValue.x = newHeight;\r
	gl_FragColor = heightmapValue;\r
\r
}`;class Qe{constructor(s=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let i=0;i<256;i++)this.p[i]=Math.floor(s.random()*256);this.perm=[];for(let i=0;i<512;i++)this.perm[i]=this.p[i&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(s,i,u){return s[0]*i+s[1]*u}dot3(s,i,u,m){return s[0]*i+s[1]*u+s[2]*m}dot4(s,i,u,m,T){return s[0]*i+s[1]*u+s[2]*m+s[3]*T}noise(s,i){let u,m,T;const h=.5*(Math.sqrt(3)-1),o=(s+i)*h,F=Math.floor(s+o),l=Math.floor(i+o),S=(3-Math.sqrt(3))/6,V=(F+l)*S,j=F-V,d=l-V,t=s-j,e=i-d;let n,p;t>e?(n=1,p=0):(n=0,p=1);const r=t-n+S,a=e-p+S,c=t-1+2*S,w=e-1+2*S,D=F&255,b=l&255,y=this.perm[D+this.perm[b]]%12,f=this.perm[D+n+this.perm[b+p]]%12,g=this.perm[D+1+this.perm[b+1]]%12;let x=.5-t*t-e*e;x<0?u=0:(x*=x,u=x*x*this.dot(this.grad3[y],t,e));let v=.5-r*r-a*a;v<0?m=0:(v*=v,m=v*v*this.dot(this.grad3[f],r,a));let _=.5-c*c-w*w;return _<0?T=0:(_*=_,T=_*_*this.dot(this.grad3[g],c,w)),70*(u+m+T)}noise3d(s,i,u){let m,T,h,o;const l=(s+i+u)*.3333333333333333,S=Math.floor(s+l),V=Math.floor(i+l),j=Math.floor(u+l),d=1/6,t=(S+V+j)*d,e=S-t,n=V-t,p=j-t,r=s-e,a=i-n,c=u-p;let w,D,b,y,f,g;r>=a?a>=c?(w=1,D=0,b=0,y=1,f=1,g=0):r>=c?(w=1,D=0,b=0,y=1,f=0,g=1):(w=0,D=0,b=1,y=1,f=0,g=1):a<c?(w=0,D=0,b=1,y=0,f=1,g=1):r<c?(w=0,D=1,b=0,y=0,f=1,g=1):(w=0,D=1,b=0,y=1,f=1,g=0);const x=r-w+d,v=a-D+d,_=c-b+d,R=r-y+2*d,A=a-f+2*d,G=c-g+2*d,W=r-1+3*d,z=a-1+3*d,M=c-1+3*d,U=S&255,N=V&255,H=j&255,X=this.perm[U+this.perm[N+this.perm[H]]]%12,Y=this.perm[U+w+this.perm[N+D+this.perm[H+b]]]%12,ee=this.perm[U+y+this.perm[N+f+this.perm[H+g]]]%12,te=this.perm[U+1+this.perm[N+1+this.perm[H+1]]]%12;let k=.6-r*r-a*a-c*c;k<0?m=0:(k*=k,m=k*k*this.dot3(this.grad3[X],r,a,c));let C=.6-x*x-v*v-_*_;C<0?T=0:(C*=C,T=C*C*this.dot3(this.grad3[Y],x,v,_));let I=.6-R*R-A*A-G*G;I<0?h=0:(I*=I,h=I*I*this.dot3(this.grad3[ee],R,A,G));let P=.6-W*W-z*z-M*M;return P<0?o=0:(P*=P,o=P*P*this.dot3(this.grad3[te],W,z,M)),32*(m+T+h+o)}noise4d(s,i,u,m){const T=this.grad4,h=this.simplex,o=this.perm,F=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let S,V,j,d,t;const e=(s+i+u+m)*F,n=Math.floor(s+e),p=Math.floor(i+e),r=Math.floor(u+e),a=Math.floor(m+e),c=(n+p+r+a)*l,w=n-c,D=p-c,b=r-c,y=a-c,f=s-w,g=i-D,x=u-b,v=m-y,_=f>g?32:0,R=f>x?16:0,A=g>x?8:0,G=f>v?4:0,W=g>v?2:0,z=x>v?1:0,M=_+R+A+G+W+z,U=h[M][0]>=3?1:0,N=h[M][1]>=3?1:0,H=h[M][2]>=3?1:0,X=h[M][3]>=3?1:0,Y=h[M][0]>=2?1:0,ee=h[M][1]>=2?1:0,te=h[M][2]>=2?1:0,k=h[M][3]>=2?1:0,C=h[M][0]>=1?1:0,I=h[M][1]>=1?1:0,P=h[M][2]>=1?1:0,we=h[M][3]>=1?1:0,re=f-U+l,se=g-N+l,ie=x-H+l,ae=v-X+l,oe=f-Y+2*l,le=g-ee+2*l,ce=x-te+2*l,ue=v-k+2*l,he=f-C+3*l,de=g-I+3*l,me=x-P+3*l,pe=v-we+3*l,fe=f-1+4*l,ge=g-1+4*l,ve=x-1+4*l,xe=v-1+4*l,B=n&255,O=p&255,q=r&255,E=a&255,Ce=o[B+o[O+o[q+o[E]]]]%32,Ie=o[B+U+o[O+N+o[q+H+o[E+X]]]]%32,Pe=o[B+Y+o[O+ee+o[q+te+o[E+k]]]]%32,Ue=o[B+C+o[O+I+o[q+P+o[E+we]]]]%32,Ne=o[B+1+o[O+1+o[q+1+o[E+1]]]]%32;let L=.6-f*f-g*g-x*x-v*v;L<0?S=0:(L*=L,S=L*L*this.dot4(T[Ce],f,g,x,v));let Z=.6-re*re-se*se-ie*ie-ae*ae;Z<0?V=0:(Z*=Z,V=Z*Z*this.dot4(T[Ie],re,se,ie,ae));let J=.6-oe*oe-le*le-ce*ce-ue*ue;J<0?j=0:(J*=J,j=J*J*this.dot4(T[Pe],oe,le,ce,ue));let K=.6-he*he-de*de-me*me-pe*pe;K<0?d=0:(K*=K,d=K*K*this.dot4(T[Ue],he,de,me,pe));let Q=.6-fe*fe-ge*ge-ve*ve-xe*xe;return Q<0?t=0:(Q*=Q,t=Q*Q*this.dot4(T[Ne],fe,ge,ve,xe)),27*(S+V+j+d+t)}}function et(){const $=Se.useRef(null);return Se.useEffect(()=>{const s=$.current;if(s){let i=function(c){function D(f,g){let x=5,v=.025,_=0;for(let R=0;R<15;R++)_+=x*u.noise(f*v,g*v),x*=.53+.025*R,v*=1.25;return _}const b=c.image.data;let y=0;for(let f=0;f<m;f++)for(let g=0;g<m;g++){const x=g*128/m,v=f*128/m;b[y+0]=D(x,v),b[y+1]=b[y+0],b[y+2]=0,b[y+3]=1,y+=4}};const u=new Qe,m=128,T=512,h=new Le(s);h.init(),h.update(),h.updateSize(),h.addOrbitControls();const{scene:o,camera:F,renderer:l}=h;F.position.set(200,200,1);const S=new Me(16777215,10);S.position.set(200,200,1);const V=new ze(S,5);o.add(V),h.createModel(S),new Me(16777215,2).position.set(-100,350,-200);const d=new ke({uniforms:Be.merge([Oe.phong.uniforms,{time:{value:0},resolution:{value:new Ve},waveAmplitude:{value:.05},waveFrequency:{value:10.2},shininess:{value:Math.max(50,1e-4)},opacity:{value:1},heightmap:{value:null}}]),vertexShader:Je,fragmentShader:_e.meshphong_frag,side:qe});d.lights=!0,window.t=_e,d.uniforms.diffuse.value=new Fe(16750592),d.uniforms.specular.value=new Fe(0),d.uniforms.shininess.value=Math.max(50,1e-4),d.uniforms.opacity.value=1,d.defines.WIDTH=m.toFixed(1),d.defines.BOUNDS=T.toFixed(1);const t=new Ze(m,m,l),e=t.createTexture();i(e);const n=t.addVariable("heightmap",Ke,e);t.setVariableDependencies(n,[n]),n.material.uniforms.mousePos={value:new Ve(0,0)},n.material.uniforms.mouseSize={value:20},n.material.uniforms.viscosityConstant={value:.98},n.material.uniforms.heightCompensation={value:0},n.material.uniforms.time={value:.01},n.material.uniforms.waveAmplitude={value:.05},n.material.uniforms.waveFrequency={value:10.2},n.material.defines.BOUNDS=T.toFixed(1);const p=t.init();p!==null&&console.error(p);const r=new Ee;h.addAction(()=>{const c=r.getDelta();d.uniforms.time.value+=c,d.uniforms.time.value+=c,n.material.uniforms.time.value+=1,t.compute(),d.uniforms.heightmap.value=t.getCurrentRenderTarget(n).texture});const a=new je(new Re(T,T,m-1,m-1),d);F.lookAt(0,0,0),a.rotation.x=-Math.PI/2,a.matrixAutoUpdate=!0,a.updateMatrix(),h.createModel(a)}},[]),Te.jsx(Te.Fragment,{children:Te.jsx("canvas",{style:{display:"block",width:"100vw",height:"100vh"},ref:$})})}export{et as default};
