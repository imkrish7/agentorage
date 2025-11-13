import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface AuthContext {
	isAuthorized: boolean | null;
}

const Root = () => {
	return <Outlet />;
};

export const Route = createRootRouteWithContext<AuthContext>()({
	component: Root,
});

export default Root;
