import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
console.log(`BufferGeometryUtils :`,BufferGeometryUtils )
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
			camera.position.set(0,0,35)
			const ambientLight = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(ambientLight)

			camera.lookAt(0,0,0)

			const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
			scene.add( directionalLight );

			function extrusion(){

			}

			let length =1, width =10;

			// const shape = new THREE.Shape();
			// shape.moveTo( 0,0 );
			// shape.lineTo( 0, width );
			// shape.lineTo( length, width );
			// shape.lineTo( length, 0 );
			// shape.lineTo( 0, 0 );
			// const hole = new THREE.Path();
			// hole.moveTo(1, 1);
			// hole.lineTo(2, 1);
			// hole.lineTo(2, 2);
			// hole.lineTo(1, 2);
			// hole.lineTo(1, 1);
			// // shape.holes.push(hole);

			
			// length = 20, width = 20;
			// const v1=new THREE.Vector3(-width / 2+10, 0, length / 2),
			// v2=new THREE.Vector3(width / 2, 0, length / 2),
			// v3=new THREE.Vector3(width / 2, 0, -length / 2),
			// v4=new THREE.Vector3(-width / 2, 0, -length / 2)
			// const pathSegments = [
			// 	new THREE.LineCurve3(v1, v2),
			// 	new THREE.LineCurve3(v2, v3),
			// 	new THREE.LineCurve3(v3, v4),
			// 	// new THREE.LineCurve3(v4, v1),
			// ];

			
			
			// // 创建 CurvePath 并添加直线段
			// const path = new THREE.CurvePath();
			// pathSegments.forEach(segment => path.add(segment));
			
			// path.autoClose=true
			// path.closePath()
			// const extrudeSettings = {
			// 	steps: 400,
			// 	depth: 0.0,
			// 	bevelEnabled: true,
			// 	bevelThickness: 10,
			// 	bevelSize: 10,
			// 	bevelOffset: 10,
			// 	bevelSegments: 10,
			// 	extrudePath:path
			// };
			// const geometry = new THREE.ExtrudeGeometry( [shape], extrudeSettings );
			// const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 ,wireframe:false} );
			// const mesh = new THREE.Mesh( geometry, material ) ;
			// scene.add( mesh );
			function calculateAngleDegrees(x1, y1, x2, y2, x3, y3) {  
				// 计算向量BA和BC  
				let BAx = x2 - x1;  
				let BAy = y2 - y1;  
				let BCx = x3 - x2;  
				let BCy = y3 - y2;  
			  
				// 计算BA和BC的模长  
				let BAlength = Math.sqrt(BAx * BAx + BAy * BAy);  
				let BClength = Math.sqrt(BCx * BCx + BCy * BCy);  
			  
				// 计算BA和BC的点积  
				let dotProduct = BAx * BCx + BAy * BCy;  
			  
				// 计算BA和BC之间的夹角的余弦值  
				let cosTheta = dotProduct / (BAlength * BClength);  
			  
				// 将余弦值转换为角度（弧度转角度）  
				let angleRadians = Math.acos(cosTheta);  
				let angleDegrees = angleRadians * (180 / Math.PI);  
			  
				// 注意：这个角度是角B的补角，因此如果你想要角B，你可能需要调整它  
				// 例如，如果你想要角A，你可能需要使用其他两个点来计算  
			  
				return angleDegrees;  
			}  
			function findPerpendicularIntersection(v1, v4, v2) {  
				// 假设v1, v4, v2都是THREE.Vector3对象，但我们只关心x和y  
			  
				// 计算直线L的方向向量  

				let direction = v2.clone().sub(v4);  
			  
				// 创建一个与direction垂直的向量（这里我们假设direction不是水平的或垂直的）  
				// 注意：这个垂直向量可能不是单位向量  
				let normal = new THREE.Vector2(-direction.y, direction.x);  
			  
				// 为了更精确，我们可以将normal归一化，但这对于找到交点不是必需的  
				// normal.normalize();  
			  
				// 接下来，我们需要找到v1到直线L的最近点（即垂线的交点）  
				// 这通常涉及到解一个线性方程，但在这里我们使用几何方法的一个简化版  
			  
				// 计算v1到v4的向量  
				let v1ToV4 = v1.clone().sub(v4);  
			  
				// 计算v1ToV4在direction上的投影长度  
				let projLength = v1ToV4.dot(direction) / direction.lengthSq();  
			  
				// 计算交点v_perp，它是v4沿着direction移动projLength的结果  
				let v_perp = v4.clone().addScaledVector(direction, projLength);  
			  
				// 但是，上面的方法实际上给出了v1到直线L的投影点，而不是垂线的实际“终点”  
				// 如果我们想要找到垂线的“终点”（即与v1等距但在直线另一侧的点），我们可以这样做：  
				// 计算从v_perp回到v1但沿着normal的向量，并将其加到v_perp上  
				// 但这通常不是我们要找的“垂线交点”的定义  
			  
				// 因此，我们直接返回v_perp作为交点（即v1到直线L的垂足）  
				return v_perp;  
			}  
			  
			// 使用示例  
			  
			
			const shape = new THREE.Shape();
			let x=length/2,y=width/2
			const t=1//厚度thickness
			const xOffset=10
			let v1=[-x,-y]
			v1[0]+=-xOffset
			let v2=[-x,y]
			let v3=[width,y]
			let v4=[width,-y]
			shape.moveTo(...v1);
			shape.lineTo( ...v2);
			shape.lineTo(...v3);
			shape.lineTo(...v4);
			shape.lineTo(...v1);
			// shape.moveTo(-x+width,y);
			// shape.lineTo( width,-y);
			// shape.lineTo( width,-y+t);
			// shape.lineTo( -x,-y+t);
			// shape.lineTo( -x,-y);
			
			const hole = new THREE.Path();
			let angleA =THREE.MathUtils.degToRad(calculateAngleDegrees(...v4,...v1,...v2)) ; // 应该接近90度  

			let intersection = findPerpendicularIntersection(new THREE.Vector2(...v1),new THREE.Vector2(... v4),new THREE.Vector2(...v2));  
			console.log(intersection); // 输出交点的x和y坐标
			const 对边=intersection.distanceTo(new THREE.Vector2(...v2))
			const 邻边=intersection.distanceTo(new THREE.Vector2(...v1))
			
			//cos(angleA) = intersection.distanceTo(v2) / v2.distanceTo(v1)
			// angleA = Math.acos(intersection.distanceTo(v2) / v2.distanceTo(v1));
								
			/**
			 * v2(1,1)
			 * v2'(1,)
					v2	v3
				
				v1		v4

			 */

			x-=t,y-=t
			width-=t
			
			v1=[-x,-y]

			v1[0]+=-(xOffset-t)
			v2=[-x,y]
			v3=[width,y]
			v4=[width,-y]
			hole.moveTo(...v1);
			hole.lineTo( ...v2);
			hole.lineTo(...v3);
			hole.lineTo(...v4);
			hole.lineTo(...v1);
			
			shape.holes.push(hole);

			
			length = 20, width = 20;
			// const v1=new THREE.Vector3(-width / 2+10, 0, length / 2),
			// v2=new THREE.Vector3(width / 2, 0, length / 2),
			// v3=new THREE.Vector3(width / 2, 0, -length / 2),
			// v4=new THREE.Vector3(-width / 2, 0, -length / 2)
			// const pathSegments = [
			// 	new THREE.LineCurve3(v1, v2),
			// 	new THREE.LineCurve3(v2, v3),
			// 	new THREE.LineCurve3(v3, v4),
			// 	// new THREE.LineCurve3(v4, v1),
			// ];

			
			
			// // 创建 CurvePath 并添加直线段
			// const path = new THREE.CurvePath();
			// pathSegments.forEach(segment => path.add(segment));
			
			// path.autoClose=true
			// path.closePath()
			const extrudeSettings = {
				steps: 40,
				depth: 10.0,
				bevelEnabled: false,
				bevelThickness: 10,
				bevelSize: 10,
				bevelOffset: 10,
				bevelSegments: 10,
			};
			const geometry = new THREE.ExtrudeGeometry( [shape], extrudeSettings );
			const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 ,wireframe:false} );
			const mesh = new THREE.Mesh( geometry, material ) ;
			scene.add( mesh );
			
			let curve = new THREE.CurvePath()
			let point2Ds = shape.getPoints()
			let pointA
			let pointB
			for(let i = 0;i<point2Ds.length;i++){
				pointA = point2Ds[i]
				pointB = point2Ds[i+1]|| pointA
				curve.add(new THREE.LineCurve3(
					new THREE.Vector3(pointA.x,pointA.y,0),
					new THREE.Vector3(pointB.x,pointB.y,0)
				))
			}
	
			let BufferGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints())
			
			let lineMaterial =  new THREE.LineBasicMaterial({
				color: 0x0000ff
			})
	
			let outline  = new THREE.Line(BufferGeometry,lineMaterial)
			scene.add(outline)
			function createWall(pos={x:0,y:0,z:0},rotate={x:0,y:0,z:0},box={width:7,height:5,depth:0.1}){
				const shape = new THREE.Shape();
				// let width=0.1,length=10,height=5
				// let x=0,y=0
				const { width, depth, height } = box;
				const { x, y ,z} = pos;
				const { x:rx, y:ry ,z:rz} = rotate;
				shape.moveTo( 0,0 );
				shape.lineTo( width, 0 );
				shape.lineTo( width, height );
				shape.lineTo( 0, height );
				shape.lineTo( 0, 0 );

				extrudeSettings.depth = depth;
				// const points = shape.extractPoints(10).shape
				// const geometry = new THREE.BufferGeometry().setFromPoints(points);
				// geometry.rotateX(Math.PI / 2);
				const geometry = new THREE.ExtrudeGeometry( [shape], extrudeSettings );
				geometry.translate(-width/2,0,0)
				geometry.translate(x,y,z)
				geometry.rotateY(ry)
				geometry.rotateX(rx)
				geometry.rotateZ(rz)
				
				// geometry.rotateX(Math.PI / 2);
				// geometry.rotateX(Math.PI / 2);
				const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
				const mesh = new THREE.Mesh( geometry, material ) ;
				scene.add( mesh );
				{
					const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
					
					// Create the final object to add to the scene
					const splineObject = new THREE.Line( geometry, material );
					scene.add( splineObject );
				}
			}
			if(false){
				let width = 1
				let doorWdith = 1
				let r = 2
				let doorHeight = 1.5
		
				let shape = new THREE.Shape()
				shape.moveTo(doorWdith/2,-Math.sqrt(3/4)*r)
				shape.lineTo(r/2,-Math.sqrt(3/4)*r)
				shape.lineTo(r,0)
				shape.lineTo(r/2,Math.sqrt(3/4)*r)
				shape.lineTo(-r/2,Math.sqrt(3/4)*r)
				shape.lineTo(-r,0)
				shape.lineTo(-r/2,-Math.sqrt(3/4)*r)
				shape.lineTo(-doorWdith/2,-Math.sqrt(3/4)*r)
				shape.lineTo(-doorWdith/2,-Math.sqrt(3/4)*r-width)
				shape.lineTo(-r/2-Math.sqrt(1/3)*width,-Math.sqrt(3/4)*r-width)
				shape.lineTo(-r-Math.sqrt(12/9)*width,0)
				shape.lineTo(-r/2-Math.sqrt(1/3)*width,Math.sqrt(3/4)*r+width)
				shape.lineTo(r/2+Math.sqrt(1/3)*width,Math.sqrt(3/4)*r+width)
				shape.lineTo(r+Math.sqrt(12/9)*width,0)
				shape.lineTo(r/2+Math.sqrt(1/3)*width,-Math.sqrt(3/4)*r-width)
				shape.lineTo(doorWdith/2,-Math.sqrt(3/4)*r-width)
				shape.lineTo(doorWdith/2,-Math.sqrt(3/4)*r)
		
				let lineMaterial =  new THREE.LineBasicMaterial({
					color: 0x0000ff
				})
		
		
				let curve = new THREE.CurvePath()
				let point2Ds = shape.getPoints()
				let pointA
				let pointB
				for(let i = 0;i<point2Ds.length;i++){
					pointA = point2Ds[i]
					pointB = point2Ds[i+1]|| pointA
					curve.add(new THREE.LineCurve3(
						new THREE.Vector3(pointA.x,pointA.y,0),
						new THREE.Vector3(pointB.x,pointB.y,0)
					))
				}
		
				let BufferGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints())
				let outline  = new THREE.Line(BufferGeometry,lineMaterial)
				scene.add(outline)
		
		
		
		
		
				let geometry = new THREE.ExtrudeGeometry( shape,{
					steps: 2000, 
					depth: doorHeight, 
					bevelEnabled: false, 
					curveSegments: 2000,
				} );
		
		
				const material = new THREE.MeshLambertMaterial( { 
					color: 0x77787b,
					// side: THREE.DoubleSide,
					roughness: 0.125,
					metalness: 0.875, 
				});
				const materialLids = new THREE.MeshBasicMaterial( {
					color: 0x77787b,
					// side: THREE.DoubleSide
				});
				const mesh = new THREE.Mesh( geometry, [materialLids,material]);
				//mesh.rotateX(Math.PI*0.5)
				//mesh.position.set(0,doorHeight,0)
		
				scene.add(mesh)
			}
			// createWall({x:-5,y:0,z:0},{x:0,y:0,z:0},{width:7,height:5,depth:0.1})
			// createWall({x:5,y:0,z:0},{x:0,y:0,z:0},{width:7,height:5,depth:0.1})
			// createWall({x:0,y:0,z:0},{x:0,y:Math.PI/2,z:0},{width:5,height:5,depth:0.1})
			// createWall({x:0,y:0,z:6},{x:0,y:Math.PI/2,z:0},{width:5,height:5,depth:0.1})
			// {
			// 	const shape = new THREE.Shape();
			// 	let width=0.1,length=10,height=5
			// 	let x=0,y=0
			// 	shape.moveTo( x,y );
			// 	shape.lineTo( x+width, y );
			// 	shape.lineTo( x+width, y+length );
			// 	shape.lineTo( x, y+length );
			// 	shape.lineTo( x, y );
			// 	x=10
			// 	const points = shape.extractPoints(10).shape
			// 	const geometry = new THREE.BufferGeometry().setFromPoints(points);
			// 	geometry.rotateX(Math.PI / 2);
			// 	const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

			// 	// Create the final object to add to the scene
			// 	const curveObject = new THREE.Line( geometry, material );
			// 	scene.add(curveObject)
			// 	console.log(`curveObject:`,curveObject)
			// 	{
			// 		const geometry = new THREE.ExtrudeGeometry( [shape], extrudeSettings );
					
			// 		const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
			// 		const mesh = new THREE.Mesh( geometry, material ) ;
			// 		scene.add( mesh );
			// 	}
			// }
			// window.THREE= THREE
			// {
			// 	const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
				
			// 	// Create the final object to add to the scene
			// 	const splineObject = new THREE.Line( geometry, material );
			// 	scene.add( splineObject );
			// }
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}