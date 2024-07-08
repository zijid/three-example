import {World} from "@/utils/three.utils.js"
import * as THREE from "three"
import * as CANNON from "cannon-es"

var groundMaterial = new CANNON.Material("groundMaterial");
var wheelMaterial = new CANNON.Material("wheelMaterial");
const bodys=[]
const visual=[]
function CreateVehicle(world,scene){
	const carBody=new THREE.Object3D()
	const width=1,height=2,length=4
	const wheelRadius=0.5
	const frame=new THREE.Mesh(new THREE.BoxGeometry(length,width,height),new THREE.MeshPhongMaterial({color:0x0000ff}))
	frame.position.y=2||height/2+wheelRadius
	const wheelWidth=wheelRadius
	const wheelZ=height/2*0.8


	// const wheelLeft1=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	// wheelLeft1.position.x=width/2+wheelWidth/2
	// wheelLeft1.position.y=height/2
	// wheelLeft1.position.z=wheelZ
	// wheelLeft1.rotation.z=Math.PI/2
	
	
	// const wheelRight1=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	// wheelRight1.position.x=-width/2-wheelWidth/2
	// wheelRight1.position.y=height/2
	// wheelRight1.position.z=wheelZ
	// wheelRight1.rotation.z=Math.PI/2
	
	// const wheelLeft2=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	// wheelLeft2.position.x=width/2+wheelWidth/2
	// wheelLeft2.position.y=height/2
	// wheelLeft2.position.z=-wheelZ
	// wheelLeft2.rotation.z=Math.PI/2

	// const wheelRight2=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	// wheelRight2.position.x=-width/2-wheelWidth/2
	// wheelRight2.position.y=height/2
	// wheelRight2.position.z=-wheelZ
	// wheelRight2.rotation.z=Math.PI/2

	carBody.add(frame)//添加车架
	// carBody.add(wheelLeft1)//添加车轮
	// carBody.add(wheelLeft2)//添加车轮
	// carBody.add(wheelRight1)//添加车轮
	// carBody.add(wheelRight2)//添加车轮
	// 添加物理
	const chassisShape = new CANNON.Box(new CANNON.Vec3(length/2,width/2,height/2));
	var chassisBody = new CANNON.Body({ mass: 150 });
	chassisBody.addShape(chassisShape);
	chassisBody.position.set(0, 4, 0)
	chassisBody.angularVelocity.set(0, 0.5, 0)
	const vehicle = new CANNON.RaycastVehicle({
		chassisBody: chassisBody,
		// indexForwardAxis:0,//向前,
		// indexRightAxis:2,//右,
		// indexUpAxis:1,//向上
	});

	const wheelOptions = {
		radius: wheelRadius, // 车轮半径
		radius: 0.5,
		directionLocal: new CANNON.Vec3(0, -1, 0),
		suspensionStiffness: 30,
		suspensionRestLength: 0.3,
		frictionSlip: 1.4,
		dampingRelaxation: 2.3,
		dampingCompression: 4.4,
		maxSuspensionForce: 100000,
		rollInfluence: 0.01,
		axleLocal: new CANNON.Vec3(0, 0, 1),
		chassisConnectionPointLocal: new CANNON.Vec3(-1, 0, 1),
		maxSuspensionTravel: 0.3,
		customSlidingRotationalSpeed: -30,
		useCustomSlidingRotationalSpeed: true,
	}
	wheelOptions.chassisConnectionPointLocal.set(-1, 0, 1)
	vehicle.addWheel(wheelOptions)

	wheelOptions.chassisConnectionPointLocal.set(-1, 0, -1)
	vehicle.addWheel(wheelOptions)

	wheelOptions.chassisConnectionPointLocal.set(1, 0, 1)
	vehicle.addWheel(wheelOptions)
	wheelOptions.chassisConnectionPointLocal.set(1, 0, -1)
	vehicle.addWheel(wheelOptions)
	
	const wheelBodies=[]
	vehicle.wheelInfos.forEach((wheel) => {
		const cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius, 5)
		const wheelBody = new CANNON.Body({
		  mass: 0,
		  material: wheelMaterial,
		})
		wheelBody.type = CANNON.Body.KINEMATIC
		wheelBody.collisionFilterGroup = 0 // turn off collisions
		const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(),quaternion)
		const wheelMesh=new THREE.Mesh(new THREE.CylinderGeometry(wheel.radius, wheel.radius, wheel.radius, 5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
		const obj=new THREE.Object3D()
		wheelMesh.rotation.x=Math.PI/2
		obj.add(wheelMesh)
		scene.add(obj)
		visual.push(wheelBody)
		wheelBodies.push(obj)
		bodys.push(obj)
	})

	world.defaultContactMaterial.friction = 0
	
	var wheelGroundContactMaterial = window.wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
		friction: 0.3,
		restitution: 0,
		contactEquationStiffness: 1000,
	});
	world.addContactMaterial(wheelGroundContactMaterial);
	vehicle.addToWorld(world)
	bodys.push(frame)
	// visual.push(chassisBody,wheelBody1,wheelBody2,wheelBody3,wheelBody4)
	visual.push(chassisBody)
	document.onkeydown = handler;
	document.onkeyup = (event)=>{
		switch (event.key) {
            case 'w':
            case 'ArrowUp':
              vehicle.applyEngineForce(0, 2)
              vehicle.applyEngineForce(0, 3)
              break

            case 's':
            case 'ArrowDown':
              vehicle.applyEngineForce(0, 2)
              vehicle.applyEngineForce(0, 3)
              break

            case 'a':
            case 'ArrowLeft':
              vehicle.setSteeringValue(0, 0)
              vehicle.setSteeringValue(0, 1)
              break

            case 'd':
            case 'ArrowRight':
              vehicle.setSteeringValue(0, 0)
              vehicle.setSteeringValue(0, 1)
              break

            case 'b':
              vehicle.setBrake(0, 0)
              vehicle.setBrake(0, 1)
              vehicle.setBrake(0, 2)
              vehicle.setBrake(0, 3)
              break
          }
	};

	// for(var i=0; i<vehicle.wheelBodies.length; i++){
	// 	vehicle.wheelBodies[i].angularDamping = 0.4;
	// }
	world.addEventListener('postStep', () => {
		for (let i = 0; i < vehicle.wheelInfos.length; i++) {
            vehicle.updateWheelTransform(i)
            const transform = vehicle.wheelInfos[i].worldTransform
            const wheelBody = wheelBodies[i]
            wheelBody.position.copy(transform.position)
            wheelBody.quaternion.copy(transform.quaternion)
          }
	})
	var maxSteerVal = Math.PI / 5;
	var maxSpeed = 10;
	var maxForce = 100;
	function handler(event){
		const maxSteerVal = 0.5
		const maxForce = 1000
		const brakeForce = 1000000

		switch (event.key) {
		  case 'w':
		  case 'ArrowUp':
			vehicle.applyEngineForce(-maxForce, 2)
			vehicle.applyEngineForce(-maxForce, 3)
			break

		  case 's':
		  case 'ArrowDown':
			vehicle.applyEngineForce(maxForce, 2)
			vehicle.applyEngineForce(maxForce, 3)
			break

		  case 'a':
		  case 'ArrowLeft':
			vehicle.setSteeringValue(maxSteerVal, 0)
			vehicle.setSteeringValue(maxSteerVal, 1)
			break

		  case 'd':
		  case 'ArrowRight':
			vehicle.setSteeringValue(-maxSteerVal, 0)
			vehicle.setSteeringValue(-maxSteerVal, 1)
			break

		  case 'b':
			vehicle.setBrake(brakeForce, 0)
			vehicle.setBrake(brakeForce, 1)
			vehicle.setBrake(brakeForce, 2)
			vehicle.setBrake(brakeForce, 3)
			break
		}
	}
	

	const wheelRotation = new THREE.Quaternion();
	setInterval(()=>{
		// carBody.position.copy(chassisBody.position)
		// carBody.quaternion.copy(chassisBody.quaternion)
		// wheelRotation.setFromAxisAngle(wheelRight1.quaternion,Math.PI / 2); // 设置车轮的旋转角度，这里假设车轮的初始方向是垂直于车身的
		// 添加车轮时应用旋转
		// wheelLeft1.quaternion.copy(wheelRotation);
		// // wheelLeft1.quaternion.multiply(wheelRotation); // 将车轮的旋转角度应用到车轮上
		// wheelRight1.quaternion.copy(wheelRotation);
		// wheelRight1.quaternion.multiply(wheelBody2.quaternion); // 将车轮的旋转角度应用到车轮上

		// wheelLeft1.quaternion.copy(wheelRotation);
		for (let index = 0; index < bodys.length; index++) {
			bodys[index].position.copy(visual[index].position)
			bodys[index].quaternion.copy(visual[index].quaternion)
			
		}
		// wheelRight1.quaternion.copy(wheelBody3.quaternion);
	})
	return carBody
}
export default function(canvas){
	
	const world = new World(canvas)
	world.init()
	world.update()
	world.addOrbitControls()
	
	const physicsWorld=new CANNON.World({
		gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
	})
	world.addAction(()=>{
		physicsWorld.fixedStep()
	})

	world.renderer.shadowMap.enabled = true;
	world.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	const geometry=new THREE.BoxGeometry(1,1,1)
	const material=new THREE.MeshPhongMaterial({color:0xffffff,shininess:0})
	const cube=new THREE.Mesh(geometry,material)
	cube.castShadow = true; //default is false

	cube.position.y=0.5
	
	world.createModel(CreateVehicle(physicsWorld,world.scene),{animation:()=>{
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	}})
	const width=1,height=1,length=1
	const cube1=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshPhongMaterial({color:"red"}))
	cube1.position.z=-1.5
	cube1.position.y=10.5

	const box1=new CANNON.Box(new CANNON.Vec3(width/2, height/2, length/2))
	const box1Body=new CANNON.Body({
		mass:1,
		shape:box1
	})
	box1Body.position.copy(cube1.position)
	box1Body.quaternion.copy(cube1.quaternion)
	physicsWorld.addBody(box1Body)
	world.createModel(cube1,{
		animation:()=>{
			cube1.position.copy(box1Body.position)
			cube1.quaternion.copy(box1Body.quaternion)
		}
	})

	const plane=new THREE.Mesh(new THREE.BoxGeometry(100,1,100),new THREE.MeshPhongMaterial({color:0xffffff,shininess:0}))
	plane.receiveShadow = true;
	// plane.rotation.x = -Math.PI / 2;
	world.createModel(plane)
	const box2=new CANNON.Box(new CANNON.Vec3(50,0.5,50))
	const box2Body=new CANNON.Body({
		mass:0,
		shape:box2,
		material:groundMaterial
	})
	box2Body.position.copy(plane.position)
	// // box2Body.position.y=-1.5
	// box2Body.quaternion.copy(plane.quaternion)
	// plane.position.copy(box2Body.position)
	// box2Body.position.y=-1.5
	// plane.quaternion.copy(box2Body.quaternion)
	physicsWorld.addBody(box2Body)
	//创建灯光
	
	const ambientLight = new THREE.AmbientLight( 0x666666, 1);
	world.scene.add( ambientLight );
	
	const light = new THREE.PointLight(0x0000ff, 1, 0);
	light.position.set(-2, 2, 0);
	light.castShadow =true

	world.createModel(light)
	world.scene.add(light)
	
	const light2 = new THREE.PointLight(0x00ffff, 1, 0);
	light2.position.set(2, 2,0);
	world.createModel(light2)
	world.scene.add(light2)
	return 
}