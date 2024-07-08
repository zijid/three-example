import {World} from "@/utils/three.utils.js"
import * as THREE from "three"
export default function(canvas){
	
	const world = new World(canvas)
	world.init()
	world.update()
	world.addOrbitControls()
	
	world.renderer.shadowMap.enabled = true;
	world.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	const geometry=new THREE.BoxGeometry(1,1,1)
	const material=new THREE.MeshPhongMaterial({color:0xffffff,shininess:0})
	const cube=new THREE.Mesh(geometry,material)
	cube.castShadow = true; //default is false

	cube.position.y=0.5
	world.createModel(cube,{animation:()=>{
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	}})
	const plane=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshPhongMaterial({color:0xffffff,shininess:0}))
	plane.receiveShadow = true;
	plane.rotation.x = -Math.PI / 2;
	world.createModel(plane)
	//创建灯光
	
	const ambientLight = new THREE.AmbientLight( 0xffffff, 3);
	// world.scene.add( ambientLight );
	
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