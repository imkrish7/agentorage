import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full w-full grid grid-cols-2">
			<div className="grid ">
				<div className="h-10" />
				<div className="flex h-auto flex-col p-4">
					<div className="text-6xl flex flex-col gap-y-2">
						<span className="font-bold">Manage all</span>
						<span className="font-bold">your files</span>
						<span className="font-bold flex gap-2">
							in
							<span className="bg-red-100/80 rounded-sm drop-shadow p-2 -rotate-5">
								one place
							</span>
						</span>
					</div>
					<div className="mt-2">
						<span className="text-md text-gray-500/50 font-semibold">
							Store your files in one place. Let the agent read,
							understand, and organize them. Ask questions instead
							of searching folders. Get answers instantly from
							your own documents.
						</span>
					</div>
					<div className="mt-4 flex gap-2">
						<Button className="cursor-pointer hover:bg-black rounded-none border-2 border-black bg-black text-white">
							Get 30 GB free
						</Button>
						<Button
							variant={"outline"}
							className="cursor-pointer rounded-none border-2 text-black bg-white/40 font-semibold"
						>
							Get started
						</Button>
					</div>
				</div>
			</div>
			<div className="relative w-full backdrop-blur-4xl">
				<div className="absolute backdrop-blur-2xl bg-white/40 top-0 h-[25%] gradient-1 w-[50%] rounded-b-full"></div>
				<div className="absolute backdrop-blur-2xl bg-green-100/40 top-40 h-[25%] w-[50%] gradient-2 rounded-t-full"></div>
				<div className="absolute backdrop-blur-2xl bg-indigo-100/50 left-[60%] h-[50%] w-[25%] gradient-3 rotate-45 rounded-r-full"></div>
				<div className="absolute backdrop-blur-2xl bg-violet-100/50 animate-pulse h-[50%] bottom-0 right-0  gradient-4 w-40 rounded-md"></div>
				<div className="absolute h-[200px] animate-bounce bottom-0 bg-gray-200/40 left-0 w-[200px] gradient-5 rounded-full"></div>
			</div>
		</div>
	);
}
