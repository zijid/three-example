/**
 * 自定义 request 网络请求工具,基于axios
 * @author LiQingSong
 */
import axios from 'axios';
import { notification } from 'antd';
import settings from '@/config/settings';
import { getToken } from '@/utils/localToken';
const customCodeMessage = {
  10002: '当前用户登入信息已失效，请重新登入再操作', // 未登陆
};

const serverCodeMessage={
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response, message } = error;
  if (message === 'CustomError') {
    // 自定义错误
    const { config, data } = response;
    const { url, baseURL } = config;
    const { code, message:msg } = data;
    const reqUrl = url.split('?')[0].replace(baseURL, '');
    const noVerifyBool =[
		"/auth/login",
		"/auth/register",
	].includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: `提示`,
        description: customCodeMessage[code] || msg || 'Error',
      });

    //   if (code === 10002) {
    //     setTimeout(() => {
    //       window.location.href = '/login';
    //     }, 500);
    //   }
    }
  } else if (message === 'CancelToken') {
    // 取消请求 Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    notification.error({
      message: `请求错误 ${status}: ${request.responseURL}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return Promise.reject(error);
};

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_APIHOST || '', // url = api url + request url
  withCredentials: false, // 当跨域请求时发送cookie
  timeout: 0, // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

// 全局设置 - post请求头
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 请求前
 * 请求拦截器
 */
request.interceptors.request.use(
  (config) => {
    // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
    if (config.cType) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }

    // 自定义添加token header
    const headerToken = getToken();
    if (headerToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers[settings.ajaxHeadersTokenKey] = headerToken;
    }

    return config;
  },
  /* ,error=> {} */ // 已在 export default catch
);

/**
 * 请求后
 * 响应拦截器
 */
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { code } = res;

    // 自定义状态码验证
    if (code !== 200&&code!==undefined) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        response,
        message: 'CustomError',
      });
    }

    return response;
  },
  /* , error => {} */ // 已在 export default catch
);

/**
 * ajax 导出
 *
 * Method: get
 *     Request Headers
 *         无 - Content-Type
 *     Query String Parameters
 *         name: name
 *         age: age
 *
 * Method: post
 *     Request Headers
 *         Content-Type:application/json;charset=UTF-8
 *     Request Payload
 *         { name: name, age: age }
 *         Custom config parameters
 *             { cType: true }  Mandatory Settings Content-Type:application/json;charset=UTF-8
 * ......
 */
export default function ajax(
  config,
){
  return request(config)
    .then((response) => response.data)
    .catch((error) => errorHandler(error));
}