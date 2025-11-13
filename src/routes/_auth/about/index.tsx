import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/about/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid grid-cols-2 w-full h-full">
			<div className="flex flex-col p-4 justify-center">
				<div className="flex flex-col">
					<span className="text-4xl font-bold">
						Your stored knowledge,
					</span>
					<span className="text-4xl font-bold">
						{" "}
						made instantly useful.
					</span>
				</div>
				<div className="flex mt-4">
					<p className="text-gray-600 font-semibold">
						Agentorage is a new way to work with your documents.
						Instead of just storing files, Agentorage reads them,
						understands them, and lets you interact with them
						naturally. Upload anything—PDFs, spreadsheets,
						presentations, research documents, project folders—and
						simply ask questions. The system retrieves and
						summarizes the information you need without requiring
						manual search, scrolling, or digging through files.
					</p>
				</div>
			</div>
			<div className="relative">
				<div className="absolute backdrop-blur-2xl bg-white/40 top-0 h-[25%] gradient-1 w-[50%] rounded-b-full"></div>
				<div className="absolute backdrop-blur-2xl bg-green-100/40 bottom-0 h-[25%] w-[50%] gradient-2 rounded-b-full"></div>
				<div className="absolute backdrop-blur-2xl bg-indigo-100/50 left-[60%] h-[50%] w-[25%] gradient-3 rotate-45 rounded-r-full"></div>
				<div className="absolute backdrop-blur-2xl bg-violet-100/50 animate-pulse h-[50%] bottom-0 right-0  gradient-4 w-40 rounded-md"></div>
				<div className="absolute h-[200px] animate-bounce bottom-35 left-20 bg-gray-200/40 left-0 w-[200px] gradient-5 rounded-full"></div>
			</div>
		</div>
	);
}
