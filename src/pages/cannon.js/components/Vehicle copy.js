import {World} from "@/utils/three.utils.js"
import * as THREE from "three"
import * as CANNON from "cannon-es"

var groundMaterial = new CANNON.Material("groundMaterial");
var wheelMaterial = new CANNON.Material("wheelMaterial");
const bodys=[]
const visual=[]
function CreateVehicle(world){
	const carBody=new THREE.Object3D()
	const width=1,height=2,length=4
	const wheelRadius=0.5
	const frame=new THREE.Mesh(new THREE.BoxGeometry(length,width,height),new THREE.MeshPhongMaterial({color:0x0000ff}))
	frame.position.y=8||height/2+wheelRadius
	const wheelWidth=0.2
	const wheelZ=height/2*0.8


	const wheelLeft1=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	wheelLeft1.position.x=width/2+wheelWidth/2
	wheelLeft1.position.y=height/2
	wheelLeft1.position.z=wheelZ
	wheelLeft1.rotation.z=Math.PI/2
	
	
	const wheelRight1=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	wheelRight1.position.x=-width/2-wheelWidth/2
	wheelRight1.position.y=height/2
	wheelRight1.position.z=wheelZ
	wheelRight1.rotation.z=Math.PI/2
	
	const wheelLeft2=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	wheelLeft2.position.x=width/2+wheelWidth/2
	wheelLeft2.position.y=height/2
	wheelLeft2.position.z=-wheelZ
	wheelLeft2.rotation.z=Math.PI/2

	const wheelRight2=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,5,5),new THREE.MeshPhongMaterial({color:0xffffff}))
	wheelRight2.position.x=-width/2-wheelWidth/2
	wheelRight2.position.y=height/2
	wheelRight2.position.z=-wheelZ
	wheelRight2.rotation.z=Math.PI/2

	carBody.add(frame)//添加车架
	carBody.add(wheelLeft1)//添加车轮
	carBody.add(wheelLeft2)//添加车轮
	carBody.add(wheelRight1)//添加车轮
	carBody.add(wheelRight2)//添加车轮
	// 添加物理
	var chassisShape;
	var centerOfMassAdjust = new CANNON.Vec3(0, 0, 0);
	chassisShape = new CANNON.Box(new CANNON.Vec3(length/2,width/2,height/2));
	var chassisBody = new CANNON.Body({ mass: 150 });
	chassisBody.addShape(chassisShape,centerOfMassAdjust);//centerOfMassAdjust
	// chassisBody.position.set(0, 0, 0);
	// chassisBody.position.copy(frame.position)
	// chassisBody.quaternion.copy(frame.quaternion)
	chassisBody.position.set(0, 4, 0)
	chassisBody.angularVelocity.set(0, 0.5, 0)
	console.log(`shapeOffsets:`,chassisBody.shapeOffsets)
	// Create the vehicle
	const vehicle = new CANNON.RigidVehicle({
		chassisBody: chassisBody
	});

	var wheelGroundContactMaterial = window.wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
		friction: 0.3,
		restitution: 0,
		contactEquationStiffness: 1000
	});
	// We must add the contact materials to the world
	world.addContactMaterial(wheelGroundContactMaterial);
	var axisWidth = width;
	var wheelShape = new CANNON.Cylinder(wheelRadius,wheelRadius,wheelWidth/2,5);
	var down = new CANNON.Vec3(0,0,-1);
	var mass = 1;
	const x=0.5
	const y=0.5
	const z=0.5

	const wheelOptions = {
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

	  wheelOptions.chassisConnectionPointLocal.set(-3, 0, 1)
	  vehicle.addWheel(wheelOptions)
	  wheelOptions.chassisConnectionPointLocal.set(-1, 0, -1)
	  vehicle.addWheel(wheelOptions)

	  wheelOptions.chassisConnectionPointLocal.set(1, 0, 1)
	  vehicle.addWheel(wheelOptions)

	  wheelOptions.chassisConnectionPointLocal.set(1, 2, -1)
	  vehicle.addWheel(wheelOptions)
	  vehicle.addToWorld(world);

	  console.log(`vehicle:`,vehicle)
	  vehicle.wheelBodies.forEach((wheelBody) => {
		const cylinderShape = new CANNON.Cylinder(wheelOptions.radius, wheelOptions.radius, wheelOptions.radius / 2, 20)
		// const wheelBody = new CANNON.Body({
		//   mass: 0,
		//   material: wheelMaterial,
		// })
		// wheelBody.mass=0
		wheelBody.material=wheelMaterial
		// wheelBody.type = CANNON.Body.KINEMATIC
		// wheelBody.collisionFilterGroup = 0 // turn off collisions
		const quaternion = new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), quaternion)
		// world.addBody(wheelBody)
	  })

// 	var wheelBody1 = new CANNON.Body({ mass: mass, material: wheelMaterial });
// 	wheelBody1.addShape(wheelShape);
	
// 	wheelBody1.quaternion.copy(wheelLeft1.quaternion)
// 	vehicle.addWheel({
// 		body: wheelBody1,
// 		position:wheelLeft1.position||new CANNON.Vec3(x,-y,z)||new CANNON.Vec3(width/2,axisWidth/2, 0).vadd(centerOfMassAdjust),
// 		axis: new CANNON.Vec3(0,1,0),
// 		direction: down
// 	});

// 	var wheelBody2 = new CANNON.Body({ mass: mass, material: wheelMaterial });
// 	wheelBody2.addShape(wheelShape);
// 	wheelBody2.quaternion.copy(wheelRight1.quaternion)
// 	vehicle.addWheel({
// 		body: wheelBody2,
// 		position:wheelRight1.position||new CANNON.Vec3(x,y,z)||new CANNON.Vec3(width/2, -axisWidth/2, 0).vadd(centerOfMassAdjust),
// 		axis: new CANNON.Vec3(0, -1, 0),
// 		direction: down
// 	});
// 	var wheelBody3 = new CANNON.Body({ mass: mass, material: wheelMaterial });
// 	// wheelBody3.quaternion.copy(wheelLeft2.quaternion)
// 	var chassisQuaternion = new CANNON.Quaternion(); // 假设CANNON.js有Quaternion类  
// chassisQuaternion.setFromAxisAngle(new CANNON.Vec3(1,1,1),Math.PI * 2);
// 	wheelBody3.addShape(wheelShape, new CANNON.Vec3(0,0,0),chassisQuaternion);
// 	wheelBody3.quaternion.copy(wheelLeft2.quaternion);

// 	vehicle.addWheel({
// 		body: wheelBody3,
// 		position:wheelLeft2.position||new CANNON.Vec3(-x,-y,z)||new CANNON.Vec3(-width/2, axisWidth/2, 0).vadd(centerOfMassAdjust),
// 		axis: new CANNON.Vec3(0,1,0),
// 		direction: down
// 	});

// 	var wheelBody4 = new CANNON.Body({ mass: mass, material: wheelMaterial });

// 	var q = new CANNON.Quaternion();
// 	q.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 2);
// 	wheelBody4.addShape(wheelShape, new CANNON.Vec3(), q);
// 	// wheelBody4.quaternion.copy(wheelRight2.quaternion);
// 	vehicle.addWheel({
// 		body: wheelBody4,
// 		position:wheelRight2.position||new CANNON.Vec3(-x,y,z)||new CANNON.Vec3(-width/2,0, -axisWidth/2).vadd(centerOfMassAdjust),
// 		axis:new CANNON.Vec3(0,-1,0),
// 		direction: down,
		
// 	});

	// world.addBody(wheelBody1)
	// world.addBody(wheelBody2)
	// world.addBody(wheelBody3)
	// world.addBody(wheelBody4)
	bodys.push(frame)
	// visual.push(chassisBody,wheelBody1,wheelBody2,wheelBody3,wheelBody4)
	visual.push(chassisBody)
	const wheelBodies=[wheelLeft1,wheelRight1,wheelLeft2,wheelRight2]
	document.onkeydown = handler;
	document.onkeyup = handler;

	// for(var i=0; i<vehicle.wheelBodies.length; i++){
	// 	vehicle.wheelBodies[i].angularDamping = 0.4;
	// }
	world.addEventListener('postStep', () => {
		for (let i = 0; i < vehicle.wheelBodies.length; i++) {
			//   vehicle.updateWheelTransform(i)
			const transform = vehicle.wheelBodies[i]
			const wheelBody = wheelBodies[i]
			wheelBody.position.copy(transform.position)
			wheelBody.quaternion.copy(transform.quaternion)
		}
	})
	var maxSteerVal = Math.PI / 5;
	var maxSpeed = 10;
	var maxForce = 100;
	function handler(event){
		console.log(`vehicle.wheelBodies[1]:`,vehicle.wheelBodies[1])
		var up = (event.type == 'keyup');
		if(!up && event.type !== 'keydown')
			return;
		switch(event.keyCode){

		case 38: // forward
			vehicle.setWheelForce(up ? 0 : maxForce, 2);
			vehicle.setWheelForce(up ? 0 : -maxForce, 3);
			break;

		case 40: // backward
			vehicle.setWheelForce(up ? 0 : -maxForce/2, 2);
			vehicle.setWheelForce(up ? 0 : maxForce/2, 3);
			break;

		case 39: // right
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
			break;

		case 37: // left
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
			break;

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
	
	world.createModel(CreateVehicle(physicsWorld),{animation:()=>{
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
	// physicsWorld.addBody(box1Body)
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