import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';

const modules = import.meta.glob('../*/index.jsx')
const arr=[
    "404",
    "Home",
    "defaultTHREE",
    "permission",
    "user",
	"vehicle"
]

const pageNames=Object.keys(modules).map(i=>{
    const name=/\.\.\/(.+)\/.+/.exec(i)[1]
    return name
}).filter(i=>!arr.includes(i))
export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
		
	  }
	}, []);

	return <>
	
	<div className='box'>
		{
			pageNames.map((i,index)=>{
				return <iframe frameBorder={0} width={window.innerWidth/2-20} height={window.innerHeight/2} key={index} src={`/#/three-example/${i}`}></iframe>
			})
		}
		{/* <iframe src="/water"></iframe>
		<iframe src="/cannon.js"></iframe>
		<iframe src="/CollisionGame"></iframe>
		<iframe src="/InstancedMesh"></iframe>
		<iframe src="/RenderTransitionPass"></iframe>
		<iframe src="/vehicle"></iframe> */}
	</div>
	    <canvas style={{display:"block"}} ref={canvasRef} width="500" height="500" />
	</>
}