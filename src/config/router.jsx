import { useLocation, useRoutes } from "react-router-dom";
import { createElement ,lazy,Suspense,memo} from "react";
import { Navigate } from "react-router-dom";
import SecurityLayout from "@/layouts/SecurityLayout";
import UserLayoutRoutes from "@/layouts/UserLayout/routes";
import UserLayout from '@/layouts/UserLayout';
import { redirect } from "react-router-dom";
import UniversalLayoutRoutes from "../layouts/UniversalLayout/routes";
import UniversalLayout from '@/layouts/UniversalLayout';
import PageLoading from '@/components/PageLoading';
import {pathKeyCreateUseRoutes} from "@/utils/router"
export const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path);
export const SuspenseLazy = memo(({ children }) => (
	<Suspense fallback={<PageLoading />}>{children}</Suspense>
));

const createUseRoutes = (configRoutes, parentPath = "/") => {
	const routes = [];
	for (let index = 0; index < configRoutes.length; index++) {
		const item = configRoutes[index];
		if (isExternal(item.path)) {
			// eslint-disable-next-line no-continue
			continue;
		}
		const routesItem = {};

		// path
		routesItem.path = item.path.startsWith("/")
			? item.path
			: `${parentPath.endsWith("/") ? parentPath : `${parentPath}/`}${
					item.path
			  }`;
		// element
		if (item.component) {
			routesItem.element = createElement(item.component);
		}
		if (item.element) {
			routesItem.element = item.element;
		}
		// children
		const children = [];
		if (item.redirect) {
			children.push({
				path: routesItem.path,
				element: createElement(Navigate, { to: item.redirect }),
			});
		}
		if (item.children) {
			children.push(...createUseRoutes(item.children, routesItem.path));
		}
		if (children.length > 0) {
			routesItem.children = children;
		}

		// newItem push
		routes.push(routesItem);
	}

	return routes;
};

const routes = createUseRoutes([
	// {
	// 	path: "/",
	// 	redirect: "/",
	// 	children: [
	// 		{
	// 			path: "a",
	// 			element: (
	// 				<SecurityLayout>
	// 					<div>a</div>
	// 				</SecurityLayout>
	// 			),
	// 		},
	// 		{
	// 			path: "b",
	// 			element: <div>b</div>,
	// 		},
	// 	],
	// },
	{
		path: "/",
		component: lazy(() => import("@/pages/home")),
	},
	{
		path: "vehicle",
		component: lazy(() => import("@/pages/vehicle")),
	},
	{
		path: "cannon.js",
		component: lazy(() => import("@/pages/cannon.js")),
	},
	{
		path: "CollisionGame",
		component: lazy(() => import("@/pages/CollisionGame")),
	},
	{
		path: "water",
		component: lazy(() => import("@/pages/water")),
	},
	{
		path: "InstancedMesh",
		component: lazy(() => import("@/pages/InstancedMesh")),
	},
	{
		path: "RenderTransitionPass",
		component: lazy(() => import("@/pages/RenderTransitionPass")),
	},
	{
		path: "nebula",
		component: lazy(() => import("@/pages/Nebula")),
	},
	{
		path: "map",
		component: lazy(() => import("@/pages/map")),
	},
	{
		path: "CssRenderer",
		component: lazy(() => import("@/pages/CssRenderer")),
	},
	{
		path: "UnrealBloomPass",
		component: lazy(() => import("@/pages/UnrealBloomPass")),
	},
	{
		path: "ExhibitionArea",
		component: lazy(() => import("@/pages/ExhibitionArea")),
	},
	{
		path: "DirectionalLight",
		component: lazy(() => import("@/pages/DirectionalLight")),
	},
	{
		path: "Worldlet",
		component: lazy(() => import("@/pages/Worldlet")),
	},
	{
		path: "Edit",
		component: lazy(() => import("@/pages/Edit")),
	},
	{
		path: "ExtrudeGeometry",
		component: lazy(() => import("@/pages/ExtrudeGeometry")),
	},
	{
		path: "Corners",
		component: lazy(() => import("@/pages/Corners")),
	},
	{
		path: '*',
		component: lazy(() => import('@/pages/404')),
	}
]);
export default () => {
	const routesElement = useRoutes(routes);
	return 	<SuspenseLazy>{routesElement}</SuspenseLazy>
};
