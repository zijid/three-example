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
	const canvas2Ref = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		const canvas2 = canvas2Ref.current;
		const destroyList=[]
		if (canvas && canvas2) {
			const world = new World(canvas);
			world.init();
			// world.update()
			world.updateSize();
			world.addOrbitControls();

			const { scene, camera, renderer } = world;
			camera.position.set(0,1,0);
			const ambientLight = new THREE.AmbientLight(0x404040, 10); // 柔和的白光
			world.createModel(ambientLight);

			camera.lookAt(0, 0, 0);

			const box = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
			const mesh = new THREE.Mesh(box, material);
			// scene.add(mesh);
			
			canvas2.width = window.innerWidth;
			canvas2.height = window.innerHeight;

			const ctx = canvas2.getContext("2d");

			const lineList=[
				// {
				// 	"start": {
				// 		"x": 400,
				// 		"y": 600
				// 	},
				// 	"end": {
				// 		"x": 800,
				// 		"y": 650
				// 	}
				// }
			]
			const arcList=[]
			function initArcList(){
				arcList.splice(0)
			}
			function addArc(x,y){
				arcList.push({
					x,y
				})
			}
			function renderArcList(){
				ctx.beginPath();
			    arcList.forEach(({x,y}) => {
				    ctx.beginPath();
					ctx.arc(x, y, 5, 0, 2 * Math.PI);
					ctx.stroke();
					// ctx.fill()
			    })
			}
			ctx.fillStyle = "red";
			// ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "red";
			let viewport = {
				x:0,//偏移
				y: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			}
			function isNumber(num){
				if(typeof num === 'number'){
					return true
				}else{
					return false
				}
			}
			const moveStopPos={
				clientX:null,clientY:null
			}
			const setting={
				bgColor:"#282828",
				isSetBgColor:true,//默认清除使用黑色
				interval:50,
				movePixel:10,
				edgeMovement:true,//true到边缘就移动屏幕
				pointToGrid:true,
				offset:10,//有网格所以不需要这个了
				point:false,//首尾显示垂线
			}
			function rondomColor(){
				return `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`
			}
			function render2D(){
				ctx.setTransform(1,0,0,1, 0,0); 
				ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
				if(setting.isSetBgColor){
					ctx.fillStyle=setting.bgColor
					ctx.fillRect(0, 0, canvas.width, canvas.height);  
				}
				ctx.setTransform(1,0,0,1,viewport.x,viewport.y); 
				ctx.strokeStyle ="red";
				ctx.setLineDash([]); // 实线10像素，空白5像素  
				ctx.lineWidth=1;  
				ctx.beginPath();
				lineList.forEach(({ start, end}) => {
					ctx.moveTo(start.x, start.y);
					ctx.lineTo(end.x, end.y);
					if(setting.point){
						//做边缘线
						const x1=start.x,y1=start.y,x2=end.x,y2=end.y
						const length=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
						
						const directionVector = { x: x2- x1, y: y2 - y1 };
						const unitDirectionVector = { x: directionVector.x / length, y: directionVector.y / length };
						const perpendicularVector = { x: unitDirectionVector.y, y: -unitDirectionVector.x };
						const d = 4;
						const C = {
							x: x1 + perpendicularVector.x * d,
							y: y1 + perpendicularVector.y * d
						};
						const A = {
							x: x1 - perpendicularVector.x * d,
							y: y1 - perpendicularVector.y * d
						};
						const D = {
							x: x2 + perpendicularVector.x * d,
							y: y2 + perpendicularVector.y * d
						};
						const B= {
							x: x2 - perpendicularVector.x * d,
							y: y2 - perpendicularVector.y * d
						};
						ctx.moveTo(A.x, A.y);
						ctx.lineTo(C.x, C.y);
						ctx.moveTo(B.x, B.y);
						ctx.lineTo(D.x, D.y);
					}
				})
				if(isNumber(tempLine.start.x)&&isNumber(tempLine.start.y)&&isNumber(tempLine.end.x)&&isNumber(tempLine.end.y)){
					if(setting.edgeMovement){
						let x=moveStopPos.clientX,
						y=moveStopPos.clientY
						const w=viewport.width,h=viewport.height
						
						x=w-x
						y=h-y
						const viewMoveSpeed=-setting.movePixel
						if(x<100){
							viewport.x+=viewMoveSpeed
						}else if(x>w-100){
							viewport.x-=viewMoveSpeed
						}
						if(y<100){
							viewport.y+=viewMoveSpeed
						}else if(y>h-100){
							viewport.y-=viewMoveSpeed
						}
					}
					fun3(moveStopPos)
					ctx.moveTo(tempLine.start.x, tempLine.start.y);
					ctx.lineTo(tempLine.end.x, tempLine.end.y);
				}

				ctx.stroke();
				renderArcList()
				drawGrid()
			}
			world.addAction(render2D)

			let tempLine={
				start: { x:null, y:null },
				end: { x:null, y:null },
			}
			function initTempLine(){
				tempLine={
					start: { x:null, y:null },
					end: { x:null, y:null },
				}
			}
			let editLineState=false
			function getValueX(value){
				const x=viewport.x%setting.interval
				if(setting.pointToGrid){
					return Math.round((value-viewport.x)/setting.interval)*setting.interval
				}
				return value-viewport.x
			}
			function getValueY(value){
				const y=viewport.y%setting.interval
				if(setting.pointToGrid){
					return Math.round((value-viewport.y)/setting.interval)*setting.interval
				}
				return value-viewport.y
			}
			let viewMoveState=false
			let viewStartMove={x:null,y:null}
			const fun1=(e) => {
				const x = getValueX(e.clientX);
				const y = getValueY(e.clientY);
				console.log(`x:`,e.clientX,x,viewport.x)
				viewStartMove.x=x
				viewStartMove.y=y
				if(spacePressed){
					viewMoveState=true
				}else{
					editLineState=true
					tempLine.start.x=x
					tempLine.start.y=y
					addArc(x,y)
				}
			}
			function updateTempLine(x,y){
				if(setting.pointToGrid===true){
					tempLine.end.x=x
					tempLine.end.y=y
				}else{
					if(setting.offset>Math.abs(tempLine.start.x-x)){
						tempLine.end.x=tempLine.start.x
					}else{
						tempLine.end.x=x
					}
					if(setting.offset>Math.abs(tempLine.start.y-y)){
						tempLine.end.y=tempLine.start.y
					}else{
						tempLine.end.y=y
					}
				}
			}
			const fun2=(e) => {
				viewMoveState=false
				editLineState=false
				const x = getValueX(e.clientX);
				const y = getValueY(e.clientY);
				if(!isNumber(tempLine.start.x)&&!isNumber(tempLine.start.y))return  
				updateTempLine(x,y)
				if(!(tempLine.start.x===tempLine.end.x&&tempLine.start.y===tempLine.end.y)){
					lineList.push(tempLine)
				}
				initTempLine()
				initArcList()
			}
 			const fun3=(e) => {
				moveStopPos.clientX=e.clientX
				moveStopPos.clientY=e.clientY
				const x = getValueX(e.clientX);
				const y = getValueY(e.clientY);
 				if(viewMoveState){//屏幕移动 
					viewport.x-=viewStartMove.x-x
					viewport.y-=viewStartMove.y-y
				}else{
					if(!isNumber(tempLine.start.x)&&!isNumber(tempLine.start.y))return 
					updateTempLine(x,y)
					if(editLineState){
						initArcList()
						addArc(tempLine.start.x,tempLine.start.y)
						addArc(tempLine.end.x,tempLine.end.y)
					}
				}
			}
			let spacePressed = false;  
			const fun4=(e) => {
				if (e.code === 'Space') {
					spacePressed = true;  
				}  
			}
			const fun5=(e) => {
				if (e.code === 'Space') {  
					spacePressed = false;  
				}  
			}
			function helper(){
				const helpGrid = new THREE.GridHelper( 1000, 1000 );
				scene.add( helpGrid );
				const axesHelper = new THREE.AxesHelper( 1000 );
				// scene.add( axesHelper );
				return {axesHelper,helpGrid}
			}
			// helper()
			// 设置网格参数  
			
			// 绘制网格  
			console.log(`canvas:`,canvas)

			function drawGrid() {
				const x=viewport.x%setting.interval,y=viewport.y%setting.interval
 				ctx.setTransform(1,0,0,1, x,y);
				ctx.strokeStyle = "#00ffff";
				ctx.setLineDash([2,10,10,10]); // 实线10像素，空白5像素  
				ctx.lineWidth =0.3;  
				var gridSize = setting.interval; // 每个格子的大小  
				var rows = window.innerHeight/gridSize+2; // 行数  
				var cols = window.innerWidth/gridSize+2; // 列数  
				for (var i = 0; i <= rows; i++) {
					// 绘制水平线  
					ctx.beginPath();  
					ctx.moveTo(-setting.interval*2, i * gridSize);  
					ctx.lineTo(canvas.width+setting.interval*2, i * gridSize);  
					ctx.stroke();  
			
				}  
				for (var i = 0; i <= cols; i++) {
					// 绘制垂直线  
					ctx.beginPath();  
					ctx.moveTo(i * gridSize,-setting.interval*2);  
					ctx.lineTo(i * gridSize, canvas.height+setting.interval*2);  
					ctx.stroke();  
				}  
			}  
			function resize(){
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				canvas2.width = window.innerWidth;
				canvas2.height = window.innerHeight;
				viewport.width=canvas.width
				viewport.height=canvas.height
			}
			// 调用函数绘制网格  
			// drawGrid();  
			//鼠标按下
			document.addEventListener("mousedown", fun1);
			//鼠标松开
			document.addEventListener("mouseup", fun2);
			//鼠标移动
			document.addEventListener("mousemove",fun3);
			document.addEventListener("keydown",fun4);
			document.addEventListener("keyup",fun5);
			window.addEventListener("resize",resize);
			destroyList.push(()=>{
				document.removeEventListener("mousedown", fun1);
				document.removeEventListener("mouseup", fun2);
				document.removeEventListener("mousemove",fun3);
				document.removeEventListener("keydown",fun4);
				document.removeEventListener("keyup",fun5);
				window.removeEventListener("resize",resize);
			})
		}
		return ()=>{
			destroyList.forEach(fun=>fun())
		}
	}, []);

	return (
		<>
			<canvas
				style={{ display: "block", width: "100vw", height: "100vh" }}
				ref={canvasRef}
			/>
			<Edit2DLine></Edit2DLine>
		</>
	);
}
