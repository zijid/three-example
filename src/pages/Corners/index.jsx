import * as THREE from "three";
import { createElement, useRef, useEffect ,useState} from "react";
import { World } from "@/utils/three.utils";

import TWEEN from "three/addons/libs/tween.module.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderTransitionPass } from "three/addons/postprocessing/RenderTransitionPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import Edit2DLine from "./Edit2DLine";

let scene, camera, renderer;
export default function () {
	const canvasRef = useRef(null);
	const [list, setList] = useState([])
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
			camera.position.set(0,0,-2000);
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
					"x": 600,
					"y": 350
				},
				"end": {
					"x": 600,
					"y": 650
				}
			},
			{
				"start": {
					"x": 600,
					"y": 650
				},
				"end": {
					"x": 1100,
					"y": 650
				}
			},
			{
				"start": {
					"x": 1100,
					"y": 650
				},
				"end": {
					"x": 1100,
					"y": 350
				}
			},
			{
				"start": {
					"x": 1100,
					"y": 350
				},
				"end": {
					"x": 900,
					"y": 350
				}
			},
			{
				"start": {
					"x": 900,
					"y": 350
				},
				"end": {
					"x": 900,
					"y": 250
				}
			},
			{
				"start": {
					"x": 900,
					"y": 250
				},
				"end": {
					"x": 800,
					"y": 250
				}
			},
			{
				"start": {
					"x": 800,
					"y": 250
				},
				"end": {
					"x": 800,
					"y": 350
				}
			},
			{
				"start": {
					"x": 800,
					"y": 350
				},
				"end": {
					"x": 600,
					"y": 350
				}
			},
			{
				"start": {
					"x": 0,
					"y": 300
				},
				"end": {
					"x": 0,
					"y": 750
				}
			},
			{
				"start": {
					"x": 600,
					"y": 0
				},
				"end": {
					"x": 1100,
					"y": 0
				}
			}
		]
		let ratio=5
		
		return ()=>{
			destroyList.forEach(fun=>fun())
		}
	}, []);
	//清理scene
	scene?.children.forEach((item)=>{
		if(item.type==="Mesh"){
			scene.remove(item)
		}
	})
	list.forEach(({start,end})=>{
		const heartShape = new THREE.Shape();
		let x=window.innerWidth/2,y=window.innerHeight/2
		heartShape.moveTo(-start.x+x,-start.y+y);
		heartShape.lineTo(-end.x+x,-end.y+y);

		const extrudeSettings = { depth: 100, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

		const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

		const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:"red"}) );
		scene?.add(mesh)
		console.log(`scene:`,scene)
		// mesh.scale.x=1/ratio
		// mesh.scale.y=1/ratio
		// mesh.scale.z=1/ratio
		// mesh.position.set(x,0,-y)

	})
	function onChange(list){
		setList(list)
	}
	const [renderState, setRenderState] = useState("画线");
	return (
		<>
			<div className="control" style={{
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}>
				<button onClick={()=>setRenderState("画线")}>画线</button>
				<button onClick={()=>setRenderState("渲染")}>渲染</button>
			</div>
			<canvas
				style={{ display: "block", width: "100vw", height: "100vh" }}
				ref={canvasRef}
			/>
			<div
				style={{
					// display: "none",
					// display: "block",
					display:renderState==="画线"?"block":"none",
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
