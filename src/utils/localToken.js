import settings from '@/config/settings';

/**
 * 获取本地Token
 */
export const getToken = () => localStorage.getItem(settings.siteTokenKey);

/**
 * 设置存储本地Token
 */
export const setToken = (token) => {
  localStorage.setItem(settings.siteTokenKey, token);
};

/**
 * 移除本地Token
 */
export const removeToken = () => {
  localStorage.removeItem(settings.siteTokenKey);
};
