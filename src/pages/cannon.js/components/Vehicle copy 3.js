import {World} from "@/utils/three.utils.js"
import * as THREE from "three"
import * as CANNON from "cannon-es"

var groundMaterial = new CANNON.Material("groundMaterial");
var wheelMaterial = new CANNON.Material("wheelMaterial");
const bodys=[]
const visual=[]
function CreateVehicle(world,scene){
	const carBody=new THREE.Object3D()
	const width=0.1,height=2,length=4
	const wheelRadius=0.5

	const frame=new THREE.Mesh(new THREE.BoxGeometry(10,1,4),new THREE.MeshPhongMaterial({color:0x0000ff}))
	frame.position.y=5||height/2+wheelRadius
	const chassisShape=new CANNON.Box(new CANNON.Vec3(5,0.5,2))
	const chassisBody=new CANNON.Body({
		mass:10,
		position:new CANNON.Vec3(0,5,0),
		shape:chassisShape,
	})
	const vehicle=new CANNON.RigidVehicle({
		chassisBody:chassisBody,
	})
	bodys.push(frame)
	visual.push(chassisBody)
	scene.add(frame)
	const radius=0.5,wheelHeight=0.25
	const wheelShapeMesh = new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelHeight,5,5)
	const wheelShape=new CANNON.Cylinder(radius, radius, wheelHeight, 5)
	console.log(`wheelShape:`,wheelShape)
	const material=new THREE.MeshPhongMaterial({color:'red',wireframe:true})
	const whelel1=new THREE.Mesh(wheelShapeMesh,material)
	scene.add(whelel1)
	
	const quaternion = new CANNON.Quaternion().setFromEuler( Math.PI / 2,Math.PI / 2,0)
	// wheelBody1.quaternion.copy(quaternion)
	const wheelBody1=new CANNON.Body({
		shape:wheelShape,
		mass:1,
		quaternion
	})
	

	wheelBody1.addShape(wheelShape, new CANNON.Vec3()
	// , quaternion
)
	// world.addBody(wheelBody1)
	vehicle.addWheel({
	    body:wheelBody1,
	    position:new CANNON.Vec3(-4,-0.5,3.5),
	    axis:new CANNON.Vec3(0,-1,0),
		direction:new CANNON.Vec3(0,0,1),
	})
	visual.push(wheelBody1)
	bodys.push(whelel1)

	const whelel2=new THREE.Mesh(wheelShapeMesh,material)
	scene.add(whelel2)
	
	const wheelBody2=new CANNON.Body({
		shape:wheelShape,
		mass:1,
	})
	// world.addBody(wheelBody2)
	vehicle.addWheel({
	    body:wheelBody2,
	    position:new CANNON.Vec3(-4,-0.5,-3.5),
	    axis:new CANNON.Vec3(0,0,-1),
		direction:new CANNON.Vec3(0,1,0),
	})
	visual.push(wheelBody2)
	bodys.push(whelel2)

	const whelel3=new THREE.Mesh(wheelShapeMesh,material)
	scene.add(whelel3)
	
	const wheelBody3=new CANNON.Body({
		shape:wheelShape,
		mass:1,
	})
	// world.addBody(wheelBody3)
	vehicle.addWheel({
	    body:wheelBody3,
	    position:new CANNON.Vec3(4,-0.5,3.5),
	    axis:new CANNON.Vec3(0,0,-1),
		direction:new CANNON.Vec3(0,1,0),
	})
	visual.push(wheelBody3)
	bodys.push(whelel3)

	const whelel4=new THREE.Mesh(wheelShapeMesh,material)
	scene.add(whelel4)
	
	const wheelBody4=new CANNON.Body({
		shape:wheelShape,
		mass:1,
	})
	// world.addBody(wheelBody4)
	vehicle.addWheel({
	    body:wheelBody4,
	    position:new CANNON.Vec3(4,-0.5,-3.5),
	    axis:new CANNON.Vec3(0,0,-1),
		direction:new CANNON.Vec3(0,1,0),
	})
	visual.push(wheelBody4)
	bodys.push(whelel4)

	vehicle.addToWorld(world)
	world.addEventListener('postStep', () => {
		for (let index = 0; index < bodys.length; index++) {
			bodys[index].position.copy(visual[index].position)
			bodys[index].quaternion.copy(visual[index].quaternion)
		}
		// for (let i = 0; i < vehicle.wheelBodies.length; i++) {
		// 	//   vehicle.updateWheelTransform(i)
		// 	const transform = vehicle.wheelBodies[i]
		// 	const wheelBody = wheelBodies[i]
		// 	wheelBody.position.copy(transform.position)
		// 	wheelBody.quaternion.copy(transform.quaternion)
		// }
	})
	var maxSteerVal = Math.PI / 5;
	var maxSpeed = 10;
	var maxForce = 100;
	
	document.onkeydown = handler;
	document.onkeyup = handler;
	function handler(event){
		var up = (event.type == 'keyup');
		if(!up && event.type !== 'keydown')
			return;
		switch(event.keyCode){

		case 38: // forward
			vehicle.setWheelForce(up ? 0 : maxForce, 0);
			vehicle.setWheelForce(up ? 0 : maxForce, 1);
			break;

		case 40: // backward
			vehicle.setWheelForce(up ? 0 : -maxForce/2, 0);
			vehicle.setWheelForce(up ? 0 : -maxForce/2, 1);
			break;

		case 39: // right
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 2);
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 3);
			break;

		case 37: // left
			vehicle.setSteeringValue(up ? 0 : maxSteerVal,2);
			vehicle.setSteeringValue(up ? 0 : maxSteerVal,3);
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
		// wheelRight1.quaternion.copy(wheelBody3.quaternion);
	})
	return carBody
}
export default function(canvas){
	
	const world = new World(canvas)
	world.init()
	world.update()
	world.addOrbitControls()
	world.camera.position.y=10
	world.camera.position.x=10
	world.camera.position.z=10
	world.camera.lookAt(new THREE.Vector3(0,0,0))
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
	// const cube=new THREE.Mesh(geometry,material)
	// cube.castShadow = true; //default is false

	// cube.position.y=0.5
	
	world.createModel(CreateVehicle(physicsWorld,world.scene),{animation:()=>{
		// cube.rotation.x += 0.01;
		// cube.rotation.y += 0.01;
	}})
	const width=5,height=5,length=5
	const cube1=new THREE.Mesh(new THREE.BoxGeometry(width,height,length),new THREE.MeshPhongMaterial({color:"red"}))
	cube1.position.z=-10.5
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