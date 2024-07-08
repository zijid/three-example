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
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
			camera.position.set(5,25,1)
			const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(light)

			camera.lookAt(0,0,0)


						
			const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			directionalLight.position.set( 0, 20, 6)
			directionalLight.castShadow = true; // default false

			//Set up shadow properties for the light
			directionalLight.shadow.mapSize.width = 5120; // default
			directionalLight.shadow.mapSize.height = 5120; // default
			directionalLight.shadow.camera.near = 10.5; // default
			directionalLight.shadow.camera.far = 5000; // default
			directionalLight.shadow.camera.left = -1200; // 根据立方体位置和光源方向调整  
			directionalLight.shadow.camera.right = 1200; // 根据立方体位置和光源方向调整  
			// directionalLight.shadow.camera.top = 5; // 足够覆盖立方体在y轴上的高度  
			// directionalLight.shadow.camera.bottom = -5; // 足够覆盖立方体在y轴上的高度
			scene.add( directionalLight );

			const DirectionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 20.5 );
			scene.add( DirectionalLightHelper );


			const box=new THREE.BoxGeometry(100,10,1)
			const material=new THREE.MeshPhongMaterial({color:0xff0000})
			const mesh=new THREE.Mesh(box,material)
			world.createModel(mesh)
			mesh.position.set(0,5.5,0)  // 设置位置，使其与平面相交
			mesh.castShadow = true; //default is false
			mesh.receiveShadow = true; //default
			{
				const box=new THREE.BoxGeometry(100,10,100)
				const material=new THREE.MeshPhongMaterial({color:0x00ff00})
				const mesh=new THREE.Mesh(box,material)
				world.createModel(mesh)
				mesh.position.set(0,0,0)  // 设置位置，使其与平面相交
				mesh.castShadow = true; //default is false
				mesh.receiveShadow = true; //default
			}
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}