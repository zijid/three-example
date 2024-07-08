import { useState } from "react";
import Routes from "./config/router.jsx";
import { ConfigProvider } from "antd";
// import 'dayjs/locale/zh-cn';
import zhCN from "antd/locale/zh_CN";
function App() {
	return (
		<ConfigProvider locale={zhCN}>
			<Routes />
		</ConfigProvider>
	);
}

export default App;
