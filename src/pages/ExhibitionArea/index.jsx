import * as THREE from 'three';
import { createElement, useRef, useEffect,useState } from 'react';
import { World } from '@/utils/three.utils';
import { INFINITY } from 'three/examples/jsm/nodes/Nodes.js';
import { Capsule } from 'three/addons/math/Capsule.js';

import { Octree } from 'three/addons/math/Octree.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { CSS3DRenderer  ,CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

import { CSS2DRenderer  ,CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import './index.css'

export default function(){
	const canvasRef = useRef(null);  
	let world,cssRenderer,LabelList=[],HintList=[],showHint=false
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {
			world=new World(canvas)
			world.init()
			world.update()
			world.updateSize()

			world.test=false
			// world.test=true

			if(world.test){
				world.addOrbitControls()
			}

			const {scene,camera,renderer}=world
			const createRoom=world.createRoom.bind(world)
			// renderer.antialiasing = true; // 抗锯齿
			// renderer.shadowMap.autoUpdate = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap  
			renderer.shadowMap.enabled = true;
			// renderer.outputEncoding = THREE.sRGBEncoding; // 颜色编码设置为sRGB，以获得更真实的颜色显示。
			camera.position.set(4,2,0)
			camera.lookAt(0,2,0)
			// camera.rotation.set( 0, 0, 0 );
			let y=0
			const lightList=[]
			{
				const light = new THREE.PointLight( 0xff0000, 150 );
				light.position.set( 0,y, 0 );
				lightList.push(light)
				// scene.add( light );
				// light.castShadow = true;
				// light.shadow.mapSize.width = 512; // default
				// light.shadow.mapSize.height = 512; // default
				// light.shadow.camera.near = 0.5; // default
				// light.shadow.camera.far = 500 // default
			}
			{
				const light = new THREE.PointLight( 0x00ff00, 150, 100 );
				light.position.set( 48,y, 0 );
				
				lightList.push(light)
			}
			{
				const light = new THREE.PointLight( 0x0000ff, 150, 100 );
				light.position.set( 25,y, 26 );
				lightList.push(light)
			}
			{
				const light = new THREE.PointLight( 0xffff00, 150, 100 );
				light.position.set( 28,y, -28 );
				lightList.push(light)
			}
			
			// const light = new THREE.AmbientLight( 0xffffff ,1); // 柔和的白光
			// scene.add( light );
			lightList.forEach(light=>{
				if(true){

					scene.add( light );
				}
				// light.castShadow = true; // default false
				// const size=512
				// light.shadow.mapSize.width = size; // default
				// light.shadow.mapSize.height = size; // default
				// light.shadow.bias =-0.001; // default
				// light.shadow.radius=0
				// light.shadow.camera.near = 0.5; // default
				// light.shadow.camera.far =500; // default
				// const sphereSize = 1;
				// const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
				// scene.add( pointLightHelper );
				// light.shadow.camera.left = -500; // 阴影范围的最左边位置  
				// light.shadow.camera.right = 500; // 阴影范围的最右边位置  
				// light.shadow.camera.top = 40; // 阴影范围的最上边位置  
				// light.shadow.camera.bottom = -40; // 阴影范围的最下边位置 
			})

			const spotLight = new THREE.SpotLight( 0xffffff);
			spotLight.visible=false
			spotLight.position.set(0,0,0);
			spotLight.intensity=2// 光源的强度。默认值为 1。
			spotLight.angle = Math.PI/6;//光线照射范围的角度。默认值为 Math.PI/3。
			spotLight.penumbra = 0.1;//该属性设置照明区域在边缘附近的平滑衰减速度，取值范围在 0 到 1 之间。默认值为 0.0。
			spotLight.decay = 0.1;// 沿着光照距离的衰减量。默认值为 2。
			spotLight.distance = 0;//光源照射的最大距离。默认值为 0（无限远）。
			spotLight.lookAt(0, 0, 0  );
			// spotLight.map = new THREE.TextureLoader().load( url );
			
			// spotLight.castShadow = true;
			
			spotLight.shadow.mapSize.width = 1024;
			spotLight.shadow.mapSize.height = 1024;
			
			spotLight.shadow.camera.near = 500;
			spotLight.shadow.camera.far = 4000;
			spotLight.shadow.camera.fov = 30;

			// const targetObject = new THREE.Object3D();
			// targetObject.position.set(2, -1, 0 );
			// spotLight.target=targetObject
			// scene.add( targetObject);
			camera.add( spotLight );
			camera.add( spotLight.target );
			spotLight.position.y=-0.3

			spotLight.target.position.y=0.15
			
  			spotLight.target.position.z = -1;
			function show(obj){
				 scene.add(obj)
			}
			function hide(obj){
				scene.traverse(i=>{
					i.remove(obj)
				})
			}
			// createBox(width,1,length)
			// createBox(1,height,length,-width/2,height/2,0)
			// createBox(1,height,length,width/2,height/2,0)
			const thickness=1,pillar=1
			const wallMmaterial=new THREE.MeshPhongMaterial({color:"#fff",side:THREE.FrontSide,wireframe:false})
			const pillarMaterial=new THREE.MeshPhongMaterial({color:"#fff",side:THREE.FrontSide,wireframe:false})
			{//中上1
				const {left,right,after,before,obj}=createRoom({
					box:{
						width:20,height:10,length:40,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:0,y:0,z:0},
				})
				hide(left)
				hide(right)
				world.createModel(obj)
				// hide(after)
				// hide(before)
			}
			{
				const {left,right,after,before}=createRoom({
					box:{
						width:20,height:10,length:10,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:0,y:0,z:26},
				})
				hide(after)
				hide(right)
				
				// hide(left)
				// hide(before)
			}
			
			{
				const {after,before}=createRoom({
					box:{
						width:30,height:10,length:10,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:26,y:0,z:26},
				})
				hide(after)
				hide(before)
			}
			{
				const {right,before}=createRoom({
					box:{
						width:10,height:10,length:10,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:47,y:0,z:26},
				})
				hide(right)
				hide(before)
			}
			{
				const {right,left}=createRoom({
					box:{
						width:10,height:10,length:40,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:47,y:0,z:0},
				})
				hide(right)
				hide(left)
			}
			{
				const {left,before}=createRoom({
					box:{
						width:10,height:10,length:10,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:47,y:0,z:-26},
				})
				hide(left)
				hide(before)
			}
			{
				const {after,before}=createRoom({
					box:{
						width:30,height:10,length:10,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:26,y:0,z:-26},
				})
				hide(after)
				hide(before)
			}
			{
				const {after,left}=createRoom({
					box:{
						width:20,height:10,length:10,thickness,pillar
					},
					material:wallMmaterial,
					pillarMaterial,
					position:{x:0,y:0,z:-26},
				})
				hide(after)
				hide(left)
			}
			
			// world.createModel( directionalLight.target );
			camera.rotation.order = 'YXZ';
			// const material=new THREE.MeshPhongMaterial({color:"red",side:THREE.DoubleSide})//材质
			// const box=new THREE.BoxGeometry(200,1,200)
			// const mesh=new THREE.Mesh(box,material)
			// mesh.castShadow=true// 开启阴影投射
	        // mesh.receiveShadow=true// 开启阴影接收
			// mesh.position.y=-6
			// scene.add(mesh)
			const playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1, 0 ), 0.35 );
			const clock = new THREE.Clock();
			const worldOctree = new Octree();

			playerCollider.translate( new THREE.Vector3( 3, 0.35, 0 ) );
			const GRAVITY = 30;
			function updatePlayer( deltaTime ) {

				let damping = Math.exp( - 4 * deltaTime ) - 1;

				if ( ! playerOnFloor ) {

					playerVelocity.y -= GRAVITY * deltaTime;

					// small air resistance
					damping *= 0.1;

				}

				playerVelocity.addScaledVector( playerVelocity, damping );

				const deltaPosition = playerVelocity.clone().multiplyScalar( deltaTime );
				playerCollider.translate( deltaPosition );

				playerCollisions();

				camera.position.copy( playerCollider.end );
				
			}
			const STEPS_PER_FRAME =15;
			world.addAction(()=>{
				
				const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;

				for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {

					if(!world.test){
						controls( deltaTime );

						updatePlayer( deltaTime );


						teleportPlayerIfOob();
					}

				}
			})
			function teleportPlayerIfOob() {

				if ( camera.position.y <= - 4. ) {

					playerCollider.start.set( 0, 0.35, 0 );
					playerCollider.end.set( 0, 1, 0 );
					playerCollider.radius = 0.35;
					camera.position.copy( playerCollider.end );
					camera.rotation.set( 0, 0, 0 );
				}

			}

			const playerVelocity = new THREE.Vector3();
			let playerOnFloor = false;
			const keyStates = {};

			
		
			document.addEventListener( 'keydown', ( event ) => {
				keyStates[ event.code ] = true;
				if(keyStates["KeyF"]){
					spotLight.visible=!spotLight.visible
				}
				if(keyStates["KeyE"]){
					LabelList.forEach((Label)=>{
						const distance = Label.position.distanceTo(camera.position);
						// let opacity = Math.max(0, 1 - distance / 10);
						// Label.element.style.opacity = opacity;
						// const scale = Math.max(0, 6-distance);
						// let scaleFactor = 1 / distance+0.5; // 根据实际需要调整系数
						// if(distance<4.5||distance>12){
						// 	// scaleFactor=0
						// 	// Label.element.style.opacity=0
						// }else{
						// 	// Label.element.style.opacity=1
						// }
						if(distance<14){

							if(Label.element.style.opacity!=1){
								Label.element.style.opacity=1
								
								showHint=true
							}else{
								showHint=false
								Label.element.style.opacity=0
							}
						}
						// Label.scale.set(scaleFactor, scaleFactor, scaleFactor);
						// 设置对象的旋转，使其朝向摄像机
						Label.lookAt(camera.position);
					})
				}

			} );

			document.addEventListener( 'keyup', ( event ) => {

				keyStates[ event.code ] = false;

			} );

			let mouseTime = 0;
			canvas.addEventListener( 'mousedown', () => {

				if(!world.test){
					
					document.body.requestPointerLock();

					mouseTime = performance.now();
				}

			} );

			// document.addEventListener( 'mouseup', () => {

			// 	if ( document.pointerLockElement !== null ) throwBall();

			// } );

			document.body.addEventListener( 'mousemove', ( event ) => {
				if ( document.pointerLockElement === document.body ) {
					camera.rotation.y -= event.movementX / 500;
					camera.rotation.x -= event.movementY / 500;

				}
			} );
			
			const playerDirection = new THREE.Vector3();
			function getForwardVector() {

				camera.getWorldDirection( playerDirection );
				playerDirection.y = 0;
				playerDirection.normalize();

				return playerDirection;

			}

			function getSideVector() {

				camera.getWorldDirection( playerDirection );
				playerDirection.y = 0;
				playerDirection.normalize();
				playerDirection.cross( camera.up );

				return playerDirection;

			}
			function controls( deltaTime ) {

				// gives a bit of air control
				const speedDelta = deltaTime * ( playerOnFloor ? 150 : 100 );

				if ( keyStates[ 'KeyW' ] ) {

					playerVelocity.add( getForwardVector().multiplyScalar( speedDelta ) );

				}

				if ( keyStates[ 'KeyS' ] ) {

					playerVelocity.add( getForwardVector().multiplyScalar( - speedDelta ) );

				}

				if ( keyStates[ 'KeyA' ] ) {

					playerVelocity.add( getSideVector().multiplyScalar( - speedDelta ) );

				}

				if ( keyStates[ 'KeyD' ] ) {

					playerVelocity.add( getSideVector().multiplyScalar( speedDelta ) );

				}

				if ( playerOnFloor ) {

					if ( keyStates[ 'Space' ] ) {

						playerVelocity.y = 15;

					}

				}

			}
			function playerCollisions() {

				const result = worldOctree.capsuleIntersect( playerCollider );

				playerOnFloor = false;

				if ( result ) {
					playerOnFloor = result.normal.y > 0;
					if ( ! playerOnFloor) {
						playerVelocity.addScaledVector( result.normal, - result.normal.dot( playerVelocity ) );
					}
					playerCollider.translate( result.normal.multiplyScalar( result.depth ) );

				}

			}
			function createBox(x,y,z){
				const boxGeometry = new THREE.BoxGeometry( 1, 0.5, 1 );
				const boxMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
				const cube = new THREE.Mesh( boxGeometry, boxMaterial );
				scene.add( cube );
				cube.position.set(x,y,z);
			
				const boxGeometry2 = new THREE.BoxGeometry( 1.4, 0.1, 1.4);
				const boxMaterial2 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
				const cube2 = new THREE.Mesh( boxGeometry2, boxMaterial2 );
				cube.add( cube2 );
				cube2.position.set( 0, 0.25, 0 );
				return cube
			}
			createBox(0, -4.25, 0 )
			const loader = new OBJLoader();

			loader.load(
				// resource URL
				'models/马.obj',
				// called when resource is loaded
				function ( object ) {
					const size=0.01
					object.scale.set(size,size,size)
					object.position.set(0,-4,0)
					object.rotation.x=-Math.PI/2
					scene.add( object );
					
					const span=document.createElement('div');
					span.innerHTML=`<h1>马的介绍</h1>
马（学名：Equus ferus caballus）是一种哺乳动物，属于奇蹄目马科。马在人类历史和文明中占有重要地位，无论是在农业、交通、战争还是娱乐方面，马都曾发挥过关键作用。马在全球范围内被广泛驯养和使用，是人类的忠实伙伴和朋友。`;
					span.className="box"
					const Label = new CSS3DObject( span );
					Label.rotation.x=-Math.PI/2
					Label.position.set(0,0,0)
					object.add(Label)
					LabelList.push(Label)
					span.style.opacity=0
					const hint=document.createElement('div');
					hint.textContent="按下E交互"
					hint.className="hint"
					const Hint = new CSS3DObject( hint );
					hint.style.opacity=0
					Hint.rotation.x=Math.PI/2
					Hint.position.set(0,0,150)
					const HintBox=new THREE.Object3D
					HintBox.add(Hint)
					object.add(HintBox)
					HintList.push({
						Hint,
						Box:HintBox
					})
					
					Label.lookAt(camera.position);
					Hint.lookAt(camera.position);
				},
				// called when loading is in progresses
				function ( xhr ) {

					console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

				},
				// called when loading has errors
				function ( error ) {

					console.log( 'An error happened' );

				}
			);
			worldOctree.fromGraphNode( scene );

			
			cssRenderer = new CSS3DRenderer()
			cssRenderer.setSize( window.innerWidth, window.innerHeight );
			
			cssRenderer.domElement.style.position = 'absolute';
			cssRenderer.domElement.style.top = '0px';
			cssRenderer.domElement.style.pointerEvents="none"
			document.body.appendChild( cssRenderer.domElement );
			cssRenderer.domElement.style.pointerEvents="none"
			// const span=document.createElement('div');
			// span.textContent="name";
			// span.className="box"
			// const Label = new CSS3DObject( span );
			// Label.position.set(0,-3,0)
			// scene.add(Label)
			// console.log(`Label:`,Label)
			// window.Label=Label
			cssRenderer.render( scene, camera );
			world.addAction(()=>{
				//根据距离设置标签的透明度和大小
				LabelList.forEach((Label)=>{
				    
					const distance = Label.position.distanceTo(camera.position);
					// let opacity = Math.max(0, 1 - distance / 10);
					// Label.element.style.opacity = opacity;
					// const scale = Math.max(0, 6-distance);
					let scaleFactor = 1 / distance+0.5; // 根据实际需要调整系数
					if(distance>15){
						// scaleFactor=0
						showHint=false
						Label.element.style.opacity=0
					}
					// Label.scale.set(scaleFactor, scaleFactor, scaleFactor);
					// 设置对象的旋转，使其朝向摄像机
					Label.lookAt(camera.position);
				})

				HintList.forEach(({Hint,Box})=>{
					if(!showHint){
						const distance = Box.position.distanceTo(camera.position);
						if(distance>14){
							// scaleFactor=0
							Hint.element.style.opacity=0
						}else{
							const cameraPosition = new THREE.Vector3();
							camera.getWorldPosition(cameraPosition);
		
							// 获取对象的位置
							const hintPosition = new THREE.Vector3();
							Hint.getWorldPosition(hintPosition);
		
							// 计算目标向量，保持 y 坐标不变
							const targetPosition = new THREE.Vector3(
								cameraPosition.x,
								hintPosition.y,
								cameraPosition.z
							);
		
							// 使对象朝向目标向量
							Hint.lookAt(targetPosition);
							Hint.element.style.opacity=1
						}
					}else{
						Hint.element.style.opacity=0
					}
				})
				cssRenderer.render( scene, camera );
			})
	  }
	  return ()=>{
		if(world){
			world.renderer.dispose()
			cssRenderer.dispose()
			// world.scene.traverse((child) => {child.geometry.dispose();});
			world.clear()
		}
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}