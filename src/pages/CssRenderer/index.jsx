import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
		
			const world=new World(canvas)
			world.init()
			world.update()
			world.updateSize()
			world.addOrbitControls()

			const {scene,camera,renderer}=world

			
			const labelRenderer = new CSS2DRenderer();
			labelRenderer.setSize( window.innerWidth, window.innerHeight );
			labelRenderer.domElement.style.position = 'absolute';
			labelRenderer.domElement.style.top = '0px';
			document.body.appendChild( labelRenderer.domElement );


			world.addOrbitControls(camera,labelRenderer.domElement)

			world.addAction(()=>{
				renderer.render( scene, camera );
				labelRenderer.render( scene, camera );
			})
			world.updateAction()


			camera.position.set(5,5,1)
			const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(light)

			
			camera.lookAt(0,0,0)

			const box=new THREE.BoxGeometry(1,1,1)
			const material=new THREE.MeshPhongMaterial({color:0xff0000})
			const mesh=new THREE.Mesh(box,material)
			
			world.createModel(mesh)
			mesh.layers.enableAll()

			const span=document.createElement('div');
			span.textContent="name";
			span.style.color='blue';
			span.style.fontSize='24px';
			span.style.fontWeight='bold';
			const Label = new CSS2DObject( span );
			Label.position.set(0,0,1)
			mesh.add(Label)
			
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}