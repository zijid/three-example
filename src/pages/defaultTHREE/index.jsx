import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';

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
			camera.position.set(5,5,1)
			const ambientLight = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(ambientLight)

			camera.lookAt(0,0,0)

			const box=new THREE.BoxGeometry(1,1,1)
			const material=new THREE.MeshPhongMaterial({color:0xff0000})
			const mesh=new THREE.Mesh(box,material)
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}