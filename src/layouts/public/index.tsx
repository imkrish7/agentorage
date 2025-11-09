import { Outlet } from "@tanstack/react-router";
import Header from "./header";

const PublicLayout = () => {
	return (
		<div className="w-full relative h-screen background-g backdrop-blur-5xl">
			<div className="fixed w-full top-0">
				<Header />
			</div>
			<main className="absolute top-16 h-[calc(100%-64px)] w-full">
				<Outlet />
			</main>
		</div>
	);
};

export default PublicLayout;
