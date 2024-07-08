import { Result, Button } from 'antd';
import {Link }from "react-router-dom"
export default function(){
	return  (
		<Result
		  status={404}
		  title='404'
		  subTitle='您访问的页面不存在！'
		  extra={
			<Button type='primary'>
			  <Link to='/'>去首页</Link>
			</Button>
		  }
		/>
	)
}