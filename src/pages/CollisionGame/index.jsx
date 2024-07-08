import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
//控制摄像机
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es'
class Model{
	static ANIMATION="animation"
	static STATIC="static"
	static STATICFUNCTION=()=>{}
	state=Model.STATIC//static 静止，animation 动画
	constructor(model, options={
		animation:Model.STATICFUNCTION,
	}){
		this.model=model
		this.options=options
		this.animation=options.animation
		if(this.animation!==Model.STATICFUNCTION){
			this.state=Model.ANIMATION
		}
	}
	addAnimation(fun){
		this.animation=fun
		this.state=Model.ANIMATION
	}
	removeAnimation(){
		this.animation=Model.STATICFUNCTION
		this.state=Model.STATIC
	}
	stop(){
		this.state=Model.STATIC
	}
	play(){
		this.state=Model.ANIMATION
	}
	update(){
		if(this.state==Model.ANIMATION){
			this.animation()
		}
	}
}
class Game{
	canvas=null
	renderer=null
	scene=null
	camera=null
	world=null
	models=[]
	animationGroup=[]

	sphereBody=null
	constructor(canvas){
		this.canvas=canvas
		this.init()
		this.update()
	}

	init() {
		const canvas=this.canvas
		if(!canvas&&canvas.tagName!=="CANVAS"){
			throw new Error("Game:没有找到canvas")
		}
		this.createScene()
		this.createPhysics()
		// this.newModel()
		this.createGameScene()
		this.createGameHairclippers()
		for (let index = 0; index < 100; index++) {
			this.easeInMoney()
		}

		this.updateSize()//更新画布大小
		this.addOrbitControls()
	}
	MoneyList=[]
	easeInMoneyTime=null
	easeInMoney(){
		this.MoneyList.push(this.createGameMoney)
		if(!this.easeInMoneyTime){
			this.easeInMoneyTime=setInterval(()=>{
				if(this.MoneyList.length>0){
					this.MoneyList.shift().bind(this)()
				}else{
					clearInterval(this.easeInMoneyTime)
					this.easeInMoneyTime=null
				}
			},100)
		}
	}
	
	addOrbitControls(){
		new OrbitControls(this.camera,this.renderer.domElement)
	}
	updateSize(){
		this.renderer.setSize(window.innerWidth,window.innerHeight)
		this.camera.aspect=window.innerWidth/window.innerHeight
		this.camera.updateProjectionMatrix()
		window.addEventListener("resize",()=>{
			this.renderer.setSize(window.innerWidth,window.innerHeight)
			this.camera.aspect=window.innerWidth/window.innerHeight
			this.camera.updateProjectionMatrix()
		})
	}
	createGameScene(){
		const width=4
		const height=0.5
		const length=24
		const planeGeometry=new THREE.BoxGeometry(width,height,length)
		const planeMaterial=new THREE.MeshBasicMaterial({color:0xffffff})
		const plane=new THREE.Mesh(planeGeometry,planeMaterial)
		plane.position.y=0
		this.scene.add(plane)

		
		//添加物理的形状
		const halfExtents = new CANNON.Vec3(width/2, height/2, length/2)
		const boxShape = new CANNON.Box(halfExtents)
		const sphereBody = new CANNON.Body({
			mass: 0, // kg
			shape:boxShape,
			type:CANNON.Body.STATIC
		})
		sphereBody.position.set(...plane.position) // m
		sphereBody.quaternion.set(...plane.quaternion) // m
		this.world.addBody(sphereBody)

		{
			const width=4
			const height=10
			const length=5
			const hairclippersGeometry=new THREE.BoxGeometry(width,height,length)
			const hairclippersMaterial=new THREE.MeshBasicMaterial({color:0xff0000})
			const hairclippers=new THREE.Mesh(hairclippersGeometry,hairclippersMaterial)
			this.scene.add(hairclippers)
	
			hairclippers.position.y=height/2+1.25
			hairclippers.position.z=-5.5
			// hairclippers.position.z=-2
			
			//添加物理的形状
			const halfExtents = new CANNON.Vec3(width/2, height/2, length/2)
			const boxShape = new CANNON.Box(halfExtents)
			const sphereBody = new CANNON.Body({
				mass: 0, // kg
				shape:boxShape
			})
			sphereBody.position.set(...hairclippers.position) // m
			sphereBody.quaternion.set(...hairclippers.quaternion) // m
			
			this.world.addBody(sphereBody)
		}

	}
	createGameMoney(){
		const radius = 0.4
		const height = 0.08
		const numSegments = 12

		const geometry = new THREE.CylinderGeometry(radius,  radius,height, numSegments ,1,false,0,2*Math.PI);

		const material=new THREE.MeshBasicMaterial({color:0x00ff00,side:THREE.DoubleSide})
		const cube=new THREE.Mesh(geometry,material)
		this.scene.add(cube)
		let fw=2
		cube.position.x=Math.random()*fw-fw/2
		cube.position.y=2
		cube.position.z=-2

		//添加物理的形状
		const cylinderShape = new CANNON.Cylinder(radius, radius, height, numSegments)
		const sphereBody = new CANNON.Body({
			mass: 5, // kg
			shape:cylinderShape
		})
		sphereBody.position.set(...cube.position) // m
		this.world.addBody(sphereBody)
		
		this.models.push(
			new Model(cube,{
				animation:()=>{
					// cube.rotation.x += 0.01;
					// cube.rotation.y += 0.01;
					cube.position.copy(sphereBody.position)
					cube.quaternion.copy(sphereBody.quaternion)
				}
			})
		)
	}
	gameHairclippers=null
	hairclippersState=false
	stopHairclippers(){
		this.hairclippersState=true
	}
	createGameHairclippers(){
		const width=4
		const height=1
		const length=5
		const hairclippersGeometry=new THREE.BoxGeometry(width,height,length)
		const hairclippersMaterial=new THREE.MeshBasicMaterial({color:0x00ffff})
		const hairclippers=new THREE.Mesh(hairclippersGeometry,hairclippersMaterial)
		this.scene.add(hairclippers)

		hairclippers.position.y=height/2+0.24
		hairclippers.position.z=-5.5
		// hairclippers.position.z=-2
		
		//添加物理的形状
		const halfExtents = new CANNON.Vec3(width/2, height/2, length/2)
		const boxShape = new CANNON.Box(halfExtents)
		const sphereBody = new CANNON.Body({
			mass:500, // kg
			shape:boxShape,
			//摩擦
			type:CANNON.Body.KINEMATIC
		})
		sphereBody.position.set(...hairclippers.position) // m
		sphereBody.quaternion.set(...hairclippers.quaternion) // m
		this.world.addBody(sphereBody)
		this.state=false
		const velocity=0.05

		this.models.push(
			new Model(hairclippers,{
				animation:()=>{
					// if(!this.hairclippersState){
					// 	if(hairclippers.position.z>-5.4){
					// 		hairclippers.position.z-=velocity
					// 	}
					// 	return 						
					// }
					if(hairclippers.position.z<-5.4){
						this.state=true
					}
					if(hairclippers.position.z>-2){
						this.state=false
					}
					// sphereBody.applyForce(new CANNON.Vec3(0,0,this.state?velocity:-1*velocity))
					hairclippers.position.z+=this.state?velocity:-1*velocity
					// const z=sphereBody.position.z
					// const v=new THREE.Vector3(hairclippers.position.x,hairclippers.position.y,z)
					// sphereBody.position.copy(v)
					sphereBody.position.copy(hairclippers.position)
					sphereBody.quaternion.copy(hairclippers.quaternion)
					hairclippers.position.copy(sphereBody.position)
					hairclippers.quaternion.copy(sphereBody.quaternion)
				}
			})
		)
	}
	newModel(){
		const geometry=new THREE.BoxGeometry()
		const material=new THREE.MeshBasicMaterial({color:0x00ff00})
		const cube=new THREE.Mesh(geometry,material)
		this.scene.add(cube)
		this.models.push(
			new Model(cube,{
				animation:()=>{
					cube.rotation.x += 0.01;
					cube.rotation.y += 0.01;
				}
			})
		)
	}
	createScene() {
		const renderer=new THREE.WebGLRenderer({
			canvas:this.canvas
		})
		const scene=new THREE.Scene()
		const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
		
		camera.position.x=-4
		camera.position.y=2
		camera.position.z=5
		scene.add(camera)

		this.renderer=renderer
		this.scene=scene
		this.camera=camera
		this.camera.updateProjectionMatrix()

	}
	addAnimation(fun){
		this.animationGroup.push(fun)
	}
	removeAnimation(fun){
		this.animationGroup=this.animationGroup.filter(item=>item!=fun)
	}
	createPhysics(){
		const world = new CANNON.World({
			gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
		})
		this.world=world
	}
	update() {
		requestAnimationFrame(this.update.bind(this))
		const {renderer,scene,camera,models}=this

		if(renderer&&scene&&camera){
			models.forEach(model=>{
			    model.update()
			})
			renderer.render(scene,camera)
		}
		this.world.fixedStep()
	}
}
export default function(){
	const canvasRef = useRef(null);  
	const renderer=useRef(null)
	useEffect(() => {
	  if (canvasRef.current) {  
		new Game(canvasRef.current)
	  }
	}, []);

	return <>
	    <canvas style={{display:"block"}} ref={canvasRef} width="500" height="500" />  
	</>
}