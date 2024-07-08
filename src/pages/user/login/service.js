import request from "@/utils/request"
import { setToken } from "@/utils/localToken"
export const login = (data) =>{
	request({
		url: '/user/login',
		method: 'post',
		data
	}).then(res => {
		setToken("token", "tttt")
	}).catch(err => {
		setToken("tttt")
		console.log(err)
	})
}