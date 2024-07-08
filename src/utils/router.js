export const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path);
import { merge } from 'lodash/fp';
export const formatRoutes = (routes, parentPath = '/', parentPaths= [])=> {
	const items= [];
	let jsonItems= {};
  
	for (let index = 0; index < routes.length; index++) {
	  const item = routes[index];
	  const newItem = {
		...item,
	  };
	  // 设置路径
	  let path = item.path || '';
	  if (!isExternal(item.path)) {
		path = item.path.startsWith('/')
		  ? item.path
		  : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
	  }
	  newItem.path = path;
  
	  // 设置 meta
	  const meta = item.meta || {};
	  // 设置 meta.parentPath
	  const pPaths = meta.parentPath && meta.parentPath.length > 0 ? meta.parentPath : parentPaths;
	  meta.parentPath = pPaths;
	  newItem.meta = meta;
  
	  // children赋值
	  let children
	  let pkChildren
	  if (item.children) {
		const fRoutes = formatRoutes(item.children, path, [...pPaths, path]);
  
		children = fRoutes.router;
		newItem.children = children;
  
		pkChildren = fRoutes.pathKeyRouter;
	  }
  
	  // 最终 item 赋值
	  items.push(newItem);
	  jsonItems[path] = newItem;
	  if (pkChildren) {
		jsonItems = merge(jsonItems, pkChildren);
	  }
	}
  
	return {
	  router: items,
	  pathKeyRouter: jsonItems,
	};
};
export const pathKeyCreateUseRoutes = (routes)=> {
	let jsonItems = {};
	for (let index = 0; index < routes.length; index++) {
	  const item = routes[index];
	  jsonItems[item.path || ''] = {
		...item,
	  };
  
	  if (item.children) {
		jsonItems = merge(jsonItems, pathKeyCreateUseRoutes(item.children));
	  }
	}
	return jsonItems;
};