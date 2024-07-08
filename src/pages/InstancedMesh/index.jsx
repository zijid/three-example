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
			const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(light)

			camera.lookAt(0,0,0)

			const box=new THREE.BoxGeometry(1,1,1)
			const material=new THREE.MeshPhongMaterial({color:0xfffffff})
			const instanced=new THREE.InstancedMesh(box,material,10)
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
			world.createModel(instanced)

			//增加射线
			const raycaster = new THREE.Raycaster();
			const pointer = new THREE.Vector2(99999,99999);
			function onPointerMove( event ) {

				// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
			
				pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			
			}
			const deletedIndices = new Set();

			const dummy = new THREE.Object3D();
			function deleteInstance(instanceId) {
				deletedIndices.add(instanceId);
				dummy.position.set(9999, 9999, 9999); // Move to an invisible position
				dummy.scale.set(0, 0, 0); // Scale down to zero
				dummy.updateMatrix();
				instanced.setMatrixAt(instanceId, dummy.matrix);
				instanced.instanceMatrix.needsUpdate = true;
			}
			function render() {

				// 通过摄像机和鼠标位置更新射线
				raycaster.setFromCamera( pointer, camera );
			
				// 计算物体和射线的焦点
				const intersects = raycaster.intersectObjects( scene.children , true );
				if (intersects.length > 0) {
					const instanceId = intersects[0].instanceId;
					if (instanceId !== undefined) {
						// 高亮选中的实例
						// instanced.setColorAt(instanceId, new THREE.Color(0xff0000));
						// instanced.instanceColor.needsUpdate = true;
						deleteInstance(instanceId)
					}
				}
			
				renderer.render( scene, camera );
			
			}
			
			window.addEventListener( 'pointermove', onPointerMove );
			world.addAction(render)
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}