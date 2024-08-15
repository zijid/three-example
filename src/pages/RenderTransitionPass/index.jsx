import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';

import TWEEN from 'three/addons/libs/tween.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderTransitionPass } from 'three/addons/postprocessing/RenderTransitionPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/**
 * RenderTransitionPass
 * 使用3个纹理，实现过渡效果
 * 一个纹理为过渡效果，另外两个为场景
 */
export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  	if (canvas) {  
		
			const world=new World(canvas)
			world.init()
			// world.update()
			world.updateSize()
			world.addOrbitControls()

			const {scene,camera,renderer}=world

			let transition=0
			let scene1,camera1,
			scene2,camera2
			{
				scene1=new THREE.Scene()
				camera1=new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
				camera1.position.set(5,5,1)
				world.addOrbitControls(camera1,renderer.domElement)
				const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
				scene1.add(light)

				camera1.lookAt(0,0,0)
				
				const box=new THREE.BoxGeometry(1,1,1)
				const material=new THREE.MeshPhongMaterial({color:0xfffffff})
				const instanced=new THREE.InstancedMesh(box,material,1000)
				console.log(`instanced:`,instanced)
				const object=new THREE.Object3D()
				const color=new THREE.Color()
				function getRandomSphericalPosition(radius) {
					var u = Math.random();  
					var v = Math.random();  
					var theta = 2 * Math.PI * u; // 极角  
					var phi = Math.acos(2 * v - 1); // 方位角（转化为弧度）  
					var r = radius * Math.sqrt(Math.random()); // 随机半径在[0, radius]之间  
				
					var x = r * Math.sin(phi) * Math.cos(theta);  
					var y = r * Math.sin(phi) * Math.sin(theta);  
					var z = r * Math.cos(phi);  
				
					return new THREE.Vector3(x, y, z);  
				}  
				

				for (let index = 0; index < instanced.count; index++) {
					object.position.copy(getRandomSphericalPosition(10))
					object.scale.set(Math.random(),Math.random(),Math.random())
					object.updateMatrix();
					instanced.setMatrixAt(index,object.matrix)
					instanced.setColorAt( index, color.setScalar( 0.1 + 0.9 * Math.random()))
					color.setRGB(Math.random(),Math.random(),Math.random())
					instanced.setColorAt( index, color)

					
				}
				scene1.add(instanced)
			}
			{
				scene2=new THREE.Scene()
				camera2=new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
				camera2.position.set(5,5,1)
				
				world.addOrbitControls(camera2,renderer.domElement)
				const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
				scene2.add(light)

				camera2.lookAt(0,0,0)
				
				const box=new THREE.BoxGeometry(1,1,1)
				const material=new THREE.MeshPhongMaterial({color:0xfffffff})
				const instanced=new THREE.InstancedMesh(box,material,1000)
				console.log(`instanced:`,instanced)
				const object=new THREE.Object3D()
				const color=new THREE.Color()
				function getRandomSphericalPosition(radius) {
					var u = Math.random();  
					var v = Math.random();  
					var theta = 2 * Math.PI * u; // 极角  
					var phi = Math.acos(2 * v - 1); // 方位角（转化为弧度）  
					var r = radius * Math.sqrt(Math.random()); // 随机半径在[0, radius]之间  
				
					var x = r * Math.sin(phi) * Math.cos(theta);  
					var y = r * Math.sin(phi) * Math.sin(theta);  
					var z = r * Math.cos(phi);  
					return new THREE.Vector3(x, y, z);  
				}  
				

				for (let index = 0; index < instanced.count; index++) {
					object.position.copy(getRandomSphericalPosition(10))
					object.scale.set(Math.random(),Math.random(),Math.random())
					object.updateMatrix();
					instanced.setMatrixAt(index,object.matrix)
					instanced.setColorAt( index, color.setScalar( 0.1 + 0.9 * Math.random()))
					color.setRGB(Math.random(),Math.random(),Math.random())
					instanced.setColorAt( index, color)

					
				}
				scene2.add(instanced)
			}
			const textures=[]
			const loader = new THREE.TextureLoader();
			textures[ 0 ] = loader.load( './transition1.png' );
			textures[ 1 ] = loader.load( './transition2.png' );
			const composer = new EffectComposer( renderer );
			const renderTransitionPass = new RenderTransitionPass( scene1, camera1, scene2, camera2 );
			renderTransitionPass.setTexture( textures[0] );
			composer.addPass( renderTransitionPass );

			const outputPass = new OutputPass();
			composer.addPass( outputPass );

			composer.setSize( window.innerWidth, window.innerHeight );
			const params={
				transition:0
			}
			new TWEEN.Tween( params )
				.to( { transition: 1 }, 2000 )
				.onUpdate( function () {

					renderTransitionPass.setTransition( params.transition );
					// renderTransitionPass.setTexture( textures[1] );
					// Change the current alpha texture after each transition
					// if ( params.cycle ) {

					// 	if ( params.transition == 0 || params.transition == 1 ) {

					// 		params.texture = ( params.texture + 1 ) % textures.length;
					// 		renderTransitionPass.setTexture( textures[ params.texture ] );

					// 	}

					// }

				} )
				.repeat( Infinity )
				.delay( 2000 )
				.yoyo( true )
				.start();
			world.addAction(()=>{
				TWEEN.update()
				if(params.transition===0){
					renderer.render(scene2, camera2)
				}else if(params.transition===1){
					renderer.render(scene1, camera1)
				}else{
					composer.render();
				}
				// renderer.render(scene1, camera1)
			})
			// world.createModel(instanced)
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}