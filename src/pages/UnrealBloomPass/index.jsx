import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';

import * as d3 from "d3";
import SVGPathParser from "svg-path-parser"
import * as t from "svg-path-parser"
import { SVGPathData } from 'svg-pathdata';

import {UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
export default function(){
	let composer={}
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
			const world=new World(canvas)
			world.init()
			// world.update()
			world.updateSize()
			const {scene,camera,renderer}=world

			world.addOrbitControls()

			
			renderer.toneMapping = THREE.ReinhardToneMapping;
			const renderPass = new RenderPass( scene, camera );

			const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
			
			const params = {
				threshold: 0,
				strength: 1,
				radius: 0.5,
				exposure: 1
			};
			unrealBloomPass.threshold = params.threshold;
			unrealBloomPass.strength = params.strength;
			unrealBloomPass.radius = params.radius;

			
			const outputPass = new OutputPass();
			
			composer = new EffectComposer( renderer );
			composer.setSize(window.innerWidth, window.innerHeight);
			composer.addPass( renderPass );
			composer.addPass( unrealBloomPass );
			composer.addPass( outputPass );


			camera.position.set(5,-5,5)
			camera.lookAt(new THREE.Vector3(0, 0, 0));
			// camera.rotation.set(0,Math.PI*2,0)


			const box=new THREE.BoxGeometry(1,1,1)
			const material=new THREE.MeshPhongMaterial({color:0xff0000})
			const mesh=new THREE.Mesh(box,material)
			world.createModel(mesh)
			
			camera.lookAt(new THREE.Vector3(0,0,0))  // 设置相机朝向
			const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(light)

			// world.addAction(()=>{
			// 	composer.render();
			// })
			function animate() {

				requestAnimationFrame( animate );

				composer.render();

			}
			animate()
	  }
	  return () => {
		// composer.dispose(); // 清理 composer
	  };
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}