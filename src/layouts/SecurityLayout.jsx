import {useCallback,useMemo,useEffect,useState}from "react"

import { useRecoilValue } from "recoil";
import {user} from "@/store"
export default ({children})=>{
	const userState=useRecoilValue(user)
	console.log(`userState:`,userState)
	const [loginState,setLoginState]=useState(false)
	const isLogin=useMemo(()=>loginState,[loginState])
	const getUser=useCallback(()=>{
		setTimeout(()=>{
			setLoginState(true)
		},1000)
	},[loginState])
	useEffect(() => {
		getUser();
	  }, []);
	return <>
	{/* <div onClick={()=>setLoginState(!loginState)}>aaa</div> */}
	{isLogin?children:"登录中..."}</>
}