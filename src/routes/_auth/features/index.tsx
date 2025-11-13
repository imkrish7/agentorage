import FeaturesCard from "@/components/FeaturesCard";
import { features } from "@/lib/features";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/features/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col items-center overflow-hidden w-full h-full overflow-scroll p-4 overflow-x-hidden">
			<span className="p-2 text-md text-gray-600 font-semibold text-center">
				Agentorage turns your documents into usable knowledge. It
				organizes files automatically, lets you search by meaning, and
				allows you to ask questions directly from your stored content.
				Workspaces stay secure, collaborative, and always up-to-date —
				so you spend less time searching and more time doing.
			</span>

			<div className="grid grid-cols-1 grid-flow-row-dense gap-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-2 md:gap-8 justify-center mt-2">
				{features.map((feature, index) => {
					return (
						<FeaturesCard
							key={index}
							icon={<feature.icon />}
							header={feature.header}
							content={feature.content}
						/>
					);
				})}
			</div>
		</div>
	);
}
