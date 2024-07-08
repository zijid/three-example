import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { formatRoutes } from "@/utils/router";
import Permission from "@/components/Permission";
import layoutRotes from "./routes";

export default memo(({ children }) => {
	const location = useLocation();
	const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);
	const routeItem = useMemo(
		() => routerPathKeyRouter.pathKeyRouter[location.pathname],
		[location]
	);
	return <Permission role={routeItem?.meta?.roles}>{children}</Permission>;
});
