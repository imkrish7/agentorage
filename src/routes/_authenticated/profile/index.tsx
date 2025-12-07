import ErrorComponent from "@/components/Error";
import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile/")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: RouteComponent,
	pendingComponent: Loader,
	errorComponent: ErrorComponent,
});

function RouteComponent() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<Card className="border-none p-0 w-2xl">
				<CardContent className="relative flex flex-col p-0">
					{/* background */}
					<div className="h-40 w-full bg-[#273469] backdrop-blur-3xl rounded-md"></div>
					{/* profile section */}
					<div className="absolute top-20 w-40 h-40 border-white border-2 rounded-full bg-indigo-500 left-[50%] translate-x-[-50%]"></div>
					<div className="h-20 w-full"></div>
					<div className="flex flex-col w-full px-8">
						<div className="flex justify-between w-full border-b border-gray-300/50">
							<span className="text-md font-semibold">Name</span>
							<span className="text-md font-semibold">
								Krishna
							</span>
						</div>
						<div className="flex justify-between w-full border-b border-gray-300/50 mt-10">
							<span className="text-md font-semibold">
								Profession
							</span>
							<span className="text-md font-semibold">
								Developer
							</span>
						</div>
					</div>
					<div className="w-full h-10" />
				</CardContent>
			</Card>
		</div>
	);
}
