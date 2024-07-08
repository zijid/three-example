import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import "./service"
const onFinish = (values) => {
  console.log('Success:', values);
  setTimeout(() => {
	  window.location.href = '/'
  })
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const App = () => {

	// const submit=useCallback(()=>{

	// })
 return (<Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="用户名"
      name="username"
      rules={[
        {
          required: true,
          message: '请输入您的用户名!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
	labelAlign
		// {...{
		// 	validateStatus:'error',
		// 	help:'请输入正确的密码',
		// }}
      label="密码"
      name="password"
      rules={[
        {
          required: true,
          message: '请输入您的密码!',
        },
      ]}
    >
	<Input.Password />
    </Form.Item>
      <Button style={{width:"100%"}} type="primary" htmlType="submit">
        登录
      </Button>
  </Form>
  )
};
export default ()=>(
	<div style={{
		width:'100vw',
		height:'100vh',
		display:'flex',
		flexDirection:"column",
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#f1f1f1'
	}}>
		<div style={{
			display:'flex',
			flexDirection:"column",
			justifyContent:'center',
			alignItems:'center',
			backgroundColor:'#fff',
			borderRadius:'10px',
			padding:'20px',
			boxShadow:'0 0 10px rgba(0,0,0,0.1)',
			display:'flex',
			justifyContent:'center',
			alignItems:'center',
		}}>
			<h2>登录</h2>
			<App />
		</div>
	</div>
);