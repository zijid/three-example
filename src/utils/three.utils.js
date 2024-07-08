import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
//控制摄像机
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es'
import { uid } from './index';

class Model{
	static ANIMATION="animation"
	static STATIC="static"
	static STATICFUNCTION=()=>{}
	state=Model.STATIC//static 静止，animation 动画
	id=uid()
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

class ModelUtils{
	models=[]
	animationGroup=[]
	constructor(){
		this.update()
	}
	update(){
		requestAnimationFrame(this.update.bind(this))
		this.models.forEach(model=>{
			if(model.animation){
				model.update()
			}
		})
	}
	createModel(model,options={}){
	    this.models.push(
			new Model(model,{
				animation:options.animation
			})
		)
		this.scene.add(model)
	}
	removeModel(model){
		this.models=this.models.filter(item=>item.id!=model.id)
		this.scene.remove(model)
		this.removeAnimation(model.id)
	}
	addAnimation(id,fun){
		this.animationGroup.push({id,fun})
	}
	removeAnimation(id){
		this.animationGroup=this.animationGroup.filter(item=>item.id!=id)
	}
}
class World extends ModelUtils{
	canvas=null
	renderer=null
	scene=null
	camera=null
	width=0
	height=0
	actions=[]
	orbitControls=null
	updateActionState=false
	test=false
	

	canvasSizeSet=()=>({width:window.innerWidth,height:window.innerHeight})
	constructor(canvas,options={}){
		super()
		// this.actions.push(super.update)
		this.canvas=canvas
		this.options=options
		this.canvasSizeSet=this.options.canvasSizeSet||this.canvasSizeSet
		this.updateAction()
		// this.init()
		// this.update()
	}
	init() {
		const canvas=this.canvas
		if(!canvas&&canvas.tagName!=="CANVAS"){
			throw new Error("Game:没有找到canvas")
		}
		this.createScene()
		this.updateSize()//更新画布大小
	}
	addOrbitControls(camera,domElement){
		if(domElement&&camera){
			this.orbitControls=new OrbitControls(camera,domElement)
		}else{
			this.orbitControls=new OrbitControls(this.camera,this.renderer.domElement)
		}
		
	}
	updateSize(){
		const {width,height}=this.canvasSizeSet()
		this.renderer.setSize(width,height)
		this.camera.aspect=width/height
		this.camera.updateProjectionMatrix()
		window.addEventListener("resize",()=>{
			if(this.canvasSizeSet){
				const {width,height}=this.canvasSizeSet()
				this.renderer.setSize(width,height)
				this.camera.aspect=width/height
				this.camera.updateProjectionMatrix()
			}
		})
	}
	createScene() {
		const renderer=new THREE.WebGLRenderer({
			canvas:this.canvas
		})
		const scene=new THREE.Scene()
		const {width,height}=this.canvasSizeSet()
		const camera=new THREE.PerspectiveCamera(75,width/height,0.1,10000)
		
		camera.position.x=-4
		camera.position.y=2
		camera.position.z=5
		scene.add(camera)

		this.renderer=renderer
		this.scene=scene
		this.camera=camera
		this.camera.updateProjectionMatrix()
	}
	addAction(fun){
		if((fun) instanceof Function)
			this.actions.push(fun)
	}
	updateAction(){
		// this.updateActionState=true
		// const {renderer,scene,camera,models}=this
		// if(renderer&&scene&&camera){
		// 	this.actions.forEach(fun=>{
		// 	    fun.bind(this)()
		// 	})
		// }
		// this.update()
		// requestAnimationFrame(this.updateAction.bind(this))
	}
	update() {
		const {renderer,scene,camera,models}=this
		if(renderer&&scene&&camera){
			renderer.render(scene,camera)
			this.actions.forEach(fun=>{
			    fun.bind(this)()
			})
		}
		if(this.update)
			requestAnimationFrame(this.update.bind(this))
	}
	clear(){//结束动画 
		try {
			this.renderer.clear()
		} catch (error) {
			
		}
		this.updateActionState=false
		this.updateAction=null//清除updateAction函数引用，防止内存泄漏
		this.update=null//清除update函数引用，防止内存泄漏
		this.actions=null//清除actions数组引用，防止内存泄漏
		this.scene=null//清除scene引用，防止内存泄漏
		this.camera=null//清除camera引用，防止内存泄漏
		this.renderer=null//清除renderer引用，防止内存泄漏
		this.models=null//清除models引用，防止内存泄漏
		this.orbitControls=null//清除orbitControls引用，防止内存泄漏
		this.canvas=null//清除canvas引用，防止内存泄漏
		this.canvasSizeSet=null//清除canvasSizeSet函数引用，防止内存泄漏
		this.createScene=null//清除createScene函数引用，防止内存泄漏
		this.addAction=null//清除addAction函数引用，防止内存泄漏
		this.updateAction=null//清除updateAction函数引用，防止内存泄漏
		this.createRoom=null//清除createRoom函数引用，防止内存泄漏
	}
	/**  
	 * 创建一个房间  
	 *  
	 * @param option 房间的配置项  
	 * @param option.box 房间的盒子尺寸和厚度  
	 * @param option.box.width 房间的宽度  
	 * @param option.box.height 房间的高度  
	 * @param option.box.length 房间的长度  
	 * @param option.box.thickness 房间的盒子厚度  
	 * @param option.box.pillar 柱子大小  
	 * @param option.material 房间的材质列表（默认为null）  
	 * @param option.position 房间的位置（默认为{x:0, y:0, z:0}）  
	 * @param option.position.x 房间在x轴上的位置  
	 * @param option.position.y 房间在y轴上的位置  
	 * @param option.position.z 房间在z轴上的位置  
	 * @returns object3D 
	 */  
	createRoom(
		option={
			box:{
				width:10,height:10,length:10,thickness:1,pillar:1
			},
			material:null,
			pillarMaterial:null,
			position:{x:0,y:0,z:0},
		}){
			
			const {width:w,height:h,length:d,thickness,pillar:pillarWidth}=option.box||{width:10,height:15,length:10,thickness:1,pillar:1}//墙的厚度
			const {x,y,z}=option.position||{x:0,y:0,z:0}
			const lineColor = new THREE.Color(
				Math.random() * 0.5 + 0.5,
				Math.random() * 0.5 + 0.5,
				Math.random() * 0.5 + 0.5
			);
			let material=option.material||(new THREE.MeshPhongMaterial({color:lineColor,side:THREE.DoubleSide,wireframe:false}))
	
		// const width=10,height=5,length=40
		const obj=new THREE.Object3D()
		const width=w,height=h,length=d
		
		const bottom=new THREE.Mesh(new THREE.BoxGeometry(width-pillarWidth,length-pillarWidth,thickness),material)
		bottom.rotation.x=Math.PI/2
		bottom.position.y=-height/2
	
		const top=new THREE.Mesh(new THREE.BoxGeometry(width-pillarWidth,length-pillarWidth,thickness),material)
		top.rotation.x=-Math.PI/2
		top.position.y=height/2
	
		const left=new THREE.Mesh(new THREE.BoxGeometry(width-pillarWidth,height-pillarWidth,thickness),material)
		// left.rotation.z=Math.PI/2
		left.position.z=length/2
	
		const right=new THREE.Mesh(new THREE.BoxGeometry(width-pillarWidth,height-pillarWidth,thickness),material)
		right.position.z=-length/2
		
		const before=new THREE.Mesh(new THREE.BoxGeometry(length-pillarWidth,height-pillarWidth,thickness),material)
		before.rotation.y=Math.PI/2
		before.position.x=-width/2
	
		const after=new THREE.Mesh(new THREE.BoxGeometry(length-pillarWidth,height-pillarWidth,thickness),material)
		after.rotation.y=-Math.PI/2
		after.position.x=width/2
	
		// 创建柱子
		//网格
		const pillarMaterial=option.pillarMaterial||material||new THREE.MeshPhongMaterial({color:0xffffff,side:THREE.DoubleSide})//材质
		const pillar1=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,height+pillarWidth,pillarWidth),pillarMaterial)
		const pillar2=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,height+pillarWidth,pillarWidth),pillarMaterial)
		const pillar3=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,height+pillarWidth,pillarWidth),pillarMaterial)
		const pillar4=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,height+pillarWidth,pillarWidth),pillarMaterial)
	
		pillar1.position.set(width/2,0,length/2)//左前
		pillar2.position.set(-width/2,0,length/2)//左后
		pillar3.position.set(width/2,0,-length/2)//右前
		pillar4.position.set(-width/2,0,-length/2)//右后
		obj.add(pillar1,pillar2,pillar3,pillar4)
		
		const pillar5=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,width-pillarWidth,pillarWidth),pillarMaterial)
		const pillar6=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,width-pillarWidth,pillarWidth),pillarMaterial)
		const pillar7=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,width-pillarWidth,pillarWidth),pillarMaterial)
		const pillar8=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,width-pillarWidth,pillarWidth),pillarMaterial)
		pillar5.position.set(0,height/2,length/2)//左上
		pillar5.rotation.z=Math.PI/2
		pillar6.position.set(0,-height/2,length/2)//左下
		pillar6.rotation.z=Math.PI/2
		pillar7.position.set(0,height/2,-length/2)//右上
		pillar7.rotation.z=Math.PI/2
		pillar8.position.set(0,-height/2,-length/2)//右下
		pillar8.rotation.z=Math.PI/2
		obj.add(pillar5,pillar6,pillar7,pillar8)
	
		const pillar9=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,length-pillarWidth,pillarWidth),pillarMaterial)
		const pillar10=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,length-pillarWidth,pillarWidth),pillarMaterial)
		const pillar11=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,length-pillarWidth,pillarWidth),pillarMaterial)
		const pillar12=new THREE.Mesh(new THREE.BoxGeometry(pillarWidth,length-pillarWidth,pillarWidth),pillarMaterial)
		pillar9.position.set(-width/2,height/2,0)//前上
		pillar9.rotation.x=Math.PI/2
		pillar10.position.set(width/2,height/2,0)//后上
		pillar10.rotation.x=Math.PI/2
		pillar11.position.set(-width/2,-height/2,0)//前下
		pillar11.rotation.x=Math.PI/2
		pillar12.position.set(width/2,-height/2,0)//后下
		pillar12.rotation.x=Math.PI/2
		obj.add(pillar9,pillar10,pillar11,pillar12)
		
		obj.add(
			bottom,
			top,
			left,right,
			before,
			after
		)
		if(this.test){
			obj.remove(top)
		}
		this.createModel(obj)
		
		obj.position.set(x,y,z)
		obj.traverse(i=>{
			i.castShadow = true;
			i.receiveShadow = true;
		})
		return {
			obj,
			bottom,top,
			left,right,
			before,after
		}
	}
}

export {
	World,
	Model,
}