import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';

export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
		if (!canvas) {
		    return 
		}
		const objects=[]
		const world=new World(canvas)
		world.init()
		world.update()
		world.updateSize()
		world.addOrbitControls()

		const {scene,camera,renderer}=world
		scene.background = new THREE.Color( 0xf0f0f0 );
		camera.position.set(600,600,600)
		const ambientLight = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
		world.createModel(ambientLight)

		const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
		directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
		scene.add( directionalLight );

		camera.lookAt(0,0,0)
		function helper(){
			const helpGrid = new THREE.GridHelper( 1000, 20 );
			scene.add( helpGrid );
			const axesHelper = new THREE.AxesHelper( 1000 );
			scene.add( axesHelper );
			return {axesHelper,helpGrid}
		}
		const {axesHelper,helpGrid}=helper()
		const box=new THREE.BoxGeometry(50,50,50)
		const material=new THREE.MeshPhongMaterial({color:0xff0000})
		const boxMaterial=new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.5})
		const mesh=new THREE.Mesh(box,boxMaterial)
		scene.add(mesh)

		
		const geometry = new THREE.PlaneGeometry( 10000, 10000 );
		geometry.rotateX( - Math.PI / 2 );

		const plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );

		objects.push(plane)
		const raycaster = new THREE.Raycaster();
		const pointer = new THREE.Vector2();
		world.addAction(()=>{
		


		})
		const pos={x:0,y:0}
		function onPointerMove( event ) {

			// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
		

			pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

			raycaster.setFromCamera( pointer, camera );

			const intersects = raycaster.intersectObjects( objects, false );

			if ( intersects.length > 0 ) {

				const intersect = intersects[ 0 ];
				mesh.position.copy( intersect.point ).add( intersect.face.normal );
				mesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

			}

		}
		function onMousedown(event){
			pos.x=event.x
			pos.y=event.y
		}
		let isShiftDown=false
		function onMouseup( event ) {
			if(event.button!=0||Math.abs(pos.x-event.x)>5||Math.abs(pos.y-event.y)>5)return 
			pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( pointer, camera );

			const intersects = raycaster.intersectObjects( objects, false );

			if ( intersects.length > 0 ) {

				const intersect = intersects[ 0 ];

				// delete cube

				if ( isShiftDown ) {

					if ( intersect.object !== plane ) {

						scene.remove( intersect.object );

						objects.splice( objects.indexOf( intersect.object ), 1 );

					}

					// create cube

				} else {

					const voxel = new THREE.Mesh( box, material );
					voxel.position.copy( intersect.point ).add( intersect.face.normal );
					voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					scene.add( voxel );

					objects.push( voxel );

				}


			}

		}
		document.addEventListener( 'mousedown',onMousedown );
		document.addEventListener( 'mouseup', onMouseup );
		document.addEventListener( 'pointermove', onPointerMove );


	  return ()=>{
			document.removeEventListener( 'mousedown', onMousedown );
			document.removeEventListener( 'mouseup', onMouseup );
			document.removeEventListener( 'pointermove', onPointerMove );
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}