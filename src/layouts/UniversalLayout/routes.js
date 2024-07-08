import { lazy } from "react";
const universalLayoutRotes = [
	{
		path: "",
		meta: {
			icon: "home",
			title: "universal-layout.menu.home",
		},
		component: lazy(() => import("@/pages/home")),
	},
	{
		path: "workplace",
		meta: {
			roles: ["admin1","user"],
			icon: "control",
			title: "universal-layout.menu.home.workplace",
		},
		component: lazy(() => import("@/pages/home")),
	},
	{
		path: "permission",
		meta: {
			roles: ["admin"],
			icon: "control",
			title: "universal-layout.menu.home.permission",
		},
		component: lazy(() => import("@/pages/permission")),
	}
];

export default universalLayoutRotes;
