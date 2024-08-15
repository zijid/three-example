import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';
//加载fbx
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

function Test(){
	const canvasRef = useRef(null);
    return <div>test</div>
}
export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
			const objList=[]
		
			const world=new World(canvas)
			world.init()
			world.update()
			world.updateSize()
			world.addOrbitControls()

			const {scene,camera,renderer}=world
			camera.position.set(15,10,0)
			const ambientLight = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(ambientLight)

			camera.lookAt(0,0,0)

			const box=new THREE.BoxGeometry(10,1,10)
			const material=new THREE.MeshPhongMaterial({color:0xffffff})
			const mesh=new THREE.Mesh(box,material)
			world.createModel(mesh)
			objList.push(mesh)
			const uniforms={
				time: { value: 1.0 },
				resolution: { value: new THREE.Vector2() }
			}
			const protectionMaterial = new THREE.ShaderMaterial( {
				// side:THREE.DoubleSide,
				transparent: true,
				uniforms: uniforms,
			
				vertexShader: document.getElementById( 'WorldletVertexShader' ).textContent,
			
				fragmentShader: document.getElementById( 'WorldletFragmentShader' ).textContent//着色器来自https://www.shadertoy.com/view/mtBSWc
			
			} );
			const protectionCover=new THREE.SphereGeometry(10,32,32)
			// const protectionMaterial=new THREE.MeshPhongMaterial({color:0xffffff,transparent:true,opacity:0.2})
			const protectionMesh=new THREE.Mesh(protectionCover,protectionMaterial)
			world.createModel(protectionMesh)
			const loader = new FBXLoader();
			loader.load('/three-example/models/Worldlet/Bambo_House.fbx', function (object) {
				const size=0.005
				object.scale.set(size,size,size)
				object.position.set(-3,0.5,3)
				const obj=new THREE.Object3D()
				obj.add(object)
				world.createModel(obj)
				objList.push(obj)
			})
			const light = new THREE.DirectionalLight( 0xFFFFFF );
			scene.add( light );
			let time=0
			world.addAction(()=>{
				light.position.set( Math.sin(time) * 10 ,10, Math.cos(time) * 10 );
				time+=0.01
				uniforms.resolution.value.x = window.innerWidth;
				uniforms.resolution.value.y = window.innerHeight;
				uniforms.time.value +=0.01;
				
				objList.forEach(obj=>{
					obj.rotation.y+=0.01
				})

			})
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}