import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { useAuthState } from "./services/authService";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultStaleTime: 5000,
	scrollRestoration: true,
	context: {
		isAuthorized: null,
	},
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const App = () => {
	const authState = useAuthState((state) => state.context.isAuthorized);

	return (
		<RouterProvider router={router} context={{ isAuthorized: authState }} />
	);
};

export default App;
