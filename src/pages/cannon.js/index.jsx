import { useEffect ,useRef} from "react"
import * as CANNON from "cannon-es"
import Vehicle from "./components/Vehicle"
export default function(){
	const canvas =useRef(null)
	useEffect(()=>{
		if(canvas.current){
			Vehicle(canvas.current)//
		}
	},[])
	return (<>
		<canvas style={{width:'100vw',height:'100vh',display:'block'}} ref={canvas}></canvas>
	</>)
}
