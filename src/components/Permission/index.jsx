
import { useRecoilValue } from "recoil";
import { user } from "@/store";
import { Result, Button } from 'antd';
import {Link }from "react-router-dom"
const Forbidden = (
	<Result
	  status={403}
	  title='403'
	  subTitle='对不起，您没有权限访问此页面。'
	  extra={
		<Button type='primary'>
		  <Link to='/'>去首页</Link>
		</Button>
	  }
	/>
);
export const hasPermissionRoles = (userRoles, roles)=> {
	if (userRoles.length < 1) {
	  return false;
	}
  
	if (userRoles.includes('admin')) {
	  return true;
	}
  
	if (typeof roles === 'undefined') {
	  return true;
	}
  
	if (typeof roles === 'string') {
	  return userRoles.includes(roles);
	}
  
	if (roles instanceof Array && roles.length === 0) {
	  return true;
	}
  
	if (roles instanceof Array && roles.length > 0) {
	  return roles.some((role) => userRoles.includes(role));
	}
  
	return false;
};
export default function({role,children, noNode = Forbidden}){
	console.log(`role:`,role)
	const userState = useRecoilValue(user);
	return <>{hasPermissionRoles(userState.roles,role)?children:noNode}</>
}