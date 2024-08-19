import * as THREE from "three";
import { createElement, useRef, useEffect } from "react";
import { World } from "@/utils/three.utils";

import TWEEN from "three/addons/libs/tween.module.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderTransitionPass } from "three/addons/postprocessing/RenderTransitionPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import Edit2DLine from "./Edit2DLine";
export default function () {
	const canvasRef = useRef(null);
	
	let scene, camera, renderer;
	useEffect(() => {
		const canvas = canvasRef.current;
		const destroyList=[]
		if (canvas) {
			const world = new World(canvas);
			world.init();
			world.update()
			world.updateSize();
			world.addOrbitControls();

			({ scene, camera, renderer } = world);
			camera.position.set(0,0,1000);

			const ambientLight = new THREE.AmbientLight(0x404040, 10); // 柔和的白光
			world.createModel(ambientLight);

			camera.lookAt(0, 0, 0);

			const box = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
			const mesh = new THREE.Mesh(box, material);
			// scene.add(mesh);
		}
		
	const list=[
		{
			"start": {
				"x": 450,
				"y": 400
			},
			"end": {
				"x": 450,
				"y": 550
			}
		},
		{
			"start": {
				"x": 450,
				"y": 550
			},
			"end": {
				"x": 750,
				"y": 550
			}
		}
	]
	let ratio=50
	list.forEach(({start,end})=>{
		const heartShape = new THREE.Shape();
		
		heartShape.moveTo(start.x,start.y);
		heartShape.lineTo(end.x,end.y);

		const extrudeSettings = { depth: 100, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

		const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

		const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:"red"}) );
		scene.add(mesh)
		// mesh.scale.x=1/ratio
		// mesh.scale.y=1/ratio
		// mesh.scale.z=1/ratio

	})
		return ()=>{
			destroyList.forEach(fun=>fun())
		}
	}, []);
	function onChange(list){
		console.log(`list:`,list)
		
	}
	return (
		<>
			<canvas
				style={{ display: "block", width: "100vw", height: "100vh" }}
				ref={canvasRef}
			/>
			<div
				style={{
					display: "block",
					width: "100vw",
					height: "100vh",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex:1
				}}>
				<Edit2DLine onChange={onChange}></Edit2DLine>
			</div>
		</>
	);
}
