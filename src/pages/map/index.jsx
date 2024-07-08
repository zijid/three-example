import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';

import * as d3 from "d3";
import SVGPathParser from "svg-path-parser"
import * as t from "svg-path-parser"
import { SVGPathData } from 'svg-pathdata';

import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
const map=new THREE.Object3D()
console.log(`SVGPathParser:`,t)
const projection = d3.geoMercator() // 使用墨卡托投影  
    .center([0, 0]) // 设置投影中心  
    .translate([0, 0]) // 设置投影偏移量  
    .scale(1); // 设置投影比例  
  
const loader = new THREE.FileLoader();  

// fetch()  
//     .then(response =>{
// 		console.log(` response:`, response)
// 		return  response.json()
// 	})  
//     .then(geoJsonData => {  
// 		console.log(`geoJsonData:`,geoJsonData)
// console.log(`path:`,path(geoJsonData))

//         // 处理 GeoJSON 数据  
//     });
export default function(){
	
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
		
		const labelRenderer = new CSS2DRenderer();
		labelRenderer.setSize( window.innerWidth, window.innerHeight );
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = '0px';
		console.log(`labelRenderer.domElement:`,labelRenderer.domElement)
		document.body.appendChild( labelRenderer.domElement );
		// const sceneCSS = new THREE.Scene();

			const world=new World(canvas)
			world.init()
			// world.update()
			world.updateSize()
			const {scene,camera,renderer}=world

			world.addOrbitControls(camera,labelRenderer.domElement)

			world.addAction(()=>{
			})
			world.updateAction()
			camera.position.set(0,-150,100)
			// camera.rotation.set(0,Math.PI*2,0)

			
			camera.lookAt(new THREE.Vector3(0,0,0))  // 设置相机朝向
			const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
			world.createModel(light)

			const projection1 = d3.geoMercator().center([116, 39]).translate([0, 0,0]);

			function onPointerMove( event ) {
				pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}
			const raycaster = new THREE.Raycaster();
			const pointer = new THREE.Vector2();

			
			window.addEventListener( 'pointermove', onPointerMove );
			
			function createRow(k,Label){
				const lineGeometry = new THREE.BufferGeometry();
				const pointsArray = new Array();

				const shape = new THREE.Shape();
				k.forEach((row,i)=>{
					
					const [x, y] = projection1(row);
					pointsArray.push(new THREE.Vector3(x, -y, 9));
					
					if (i === 0) {
						// 创建起点,使用moveTo方法
						// 因为计算出来的y是反过来，所以要进行颠倒
						shape.moveTo(x, -y);
					}
					shape.lineTo(x, -y);
				})

				const geometry = new THREE.ExtrudeGeometry(shape, {
					depth: 1,
					bevelEnabled: true,
				});
				const randomColor = (0.5 + Math.random() * 0.5) * 0xffffff;
				const material = new THREE.MeshBasicMaterial({
					color: randomColor,
					transparent: true,
					opacity: 0.5,
				});
				const mesh=new THREE.Mesh(geometry, material)
				mesh.position.z=10
				mesh.userData.label=Label
				lineGeometry.setFromPoints(pointsArray);
							
				const lineColor = new THREE.Color(
					Math.random() * 0.5 + 0.5,
					Math.random() * 0.5 + 0.5,
					Math.random() * 0.5 + 0.5
				);
				const lineMaterial = new THREE.LineBasicMaterial({
					color: lineColor,
				});
				const line=new THREE.Line(lineGeometry, lineMaterial)
				window.mesh=mesh
				// mesh.add(line) ;
				return mesh
			}
			loader.load("100000_full.json", function(data) {//"https://geo.datav.aliyun.com/areas_v3/bound/330000_full.json"" 浙江省的链接"
				const geoJsonData = JSON.parse(data);
				const province = new THREE.Object3D();
				geoJsonData.features.forEach(i=>{
					if (i.geometry.type === "MultiPolygon"||i.geometry.type === "Polygon") {
						const object=new THREE.Object3D();
						province.add(object);
						const name=i.properties.name
						const center=i.properties.center
						const span=document.createElement('div');
						span.textContent=name;
						
						object.name=name
						span.style.color='red';
						span.style.fontSize='10px';
						span.style.fontWeight='bold';
						const Label = new CSS2DObject( span );
						Label.visible=false
						if(center){
							const [x,y]=projection1(center)
							Label.position.set(x,-y,10)
						}
                        object.add(Label);
						i.geometry.coordinates.forEach(j=>{
							if(name==="内蒙古自治区"){
								object.add(createRow(j,Label))
							}else{

								j.forEach(k=>{
									object.add(createRow(k,Label))
								})
							}
						})
						
					}
				})
				province.layers.enableAll();
				scene.add(province)
				let arr=[]
				const scene2 = new THREE.Scene();
				renderer.setClearColor(0x000000, 0)
				renderer.autoClear = false;
				const materials={}
				
				const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
				const layers=new THREE.Layers()
				layers.set(1)
				window.layers=layers
				function darkenNonBloomed( obj ) {
					if ( obj.isMesh && layers.test( obj.layers ) === false) {
						materials[ obj.uuid ] = obj.material;
						obj.material = darkMaterial;
					}else if(obj.isMesh){
					}
				}
				function restoreMaterial( obj ) {
					if ( materials[ obj.uuid ] ) {
						obj.material = materials[ obj.uuid ];
						delete materials[ obj.uuid ];
					}
				}
				world.addAction(()=>{
					raycaster.setFromCamera( pointer, camera );
                    raycaster.layers.enable(1);
					const intersects = raycaster.intersectObjects( [...scene2.children,...scene.children],true );
                    raycaster.layers.enable(0);
					const intersects1 = raycaster.intersectObjects( [...scene2.children,...scene.children],true );
					intersects1.push(...intersects1)
					// if(intersects.length){
					// 	console.log(`intersects:`,intersects)
					// }
					arr.forEach(i=>{
						try{
							const geometry = new THREE.ExtrudeGeometry(
								i.object.geometry.parameters.shapes, {
								depth: 1,
								bevelEnabled: true,
							});
							i.object.geometry=geometry
							i.object.geometry.verticesNeedUpdate = true;
							i.object.geometry.needsUpdate = true;
							i.object.geometry.uvsNeedUpdate = true;
							i.object.material.opacity=0.5
							if(i.object.userData.label)
								i.object.userData.label.visible=false
							i.object.layers.set(0)
						}catch(err){
							console.error(`err:`,err)
						}
					})
					intersects.forEach(i=>{
						try{
							const geometry = new THREE.ExtrudeGeometry(
								i.object.geometry.parameters.shapes, {
								depth: 10,
								bevelEnabled: true,
							});
							i.object.geometry=geometry
							i.object.geometry.verticesNeedUpdate = true;
							i.object.geometry.needsUpdate = true;
							i.object.geometry.uvsNeedUpdate = true;
							i.object.material.opacity=1
							if(i.object.userData.label)
								i.object.userData.label.visible=true
							i.object.layers.enable(1)
						}catch(err){
							console.log(`err:`,err)
						}
					})
					arr=intersects
					labelRenderer.render(scene, camera);
					let arr1=intersects.map(i=>i.object)
					scene.traverse(darkenNonBloomed)
					composer.render();
					scene.traverse( restoreMaterial );
					// arr.forEach(restoreMaterial)
					composer2.render();
				})

				const composer = new EffectComposer(renderer);
				const composer2 = new EffectComposer(renderer);
				const renderPass = new RenderPass( scene, camera );
				composer.addPass( renderPass );
				const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight), 0.8, 0.5, 0);
				composer.addPass( unrealBloomPass );
				const outputPass = new OutputPass();
			
				composer.addPass( outputPass );


				
				const mixPass = new ShaderPass(
					new THREE.ShaderMaterial({
						uniforms: {
							baseTexture: { value: null },
							bloomTexture: { value: composer.renderTarget2.texture }
						},
						vertexShader: document.getElementById( 'vertexshader' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						defines: {}
					}), 'baseTexture'
				);
				mixPass.needsSwap = true;


				const renderPass2 = new RenderPass( scene, camera );

				
				composer2.addPass( renderPass2 );
				composer2.addPass( mixPass );
				
				composer2.addPass( outputPass );
			});
	  }
	}, []);

	return <>
	
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}