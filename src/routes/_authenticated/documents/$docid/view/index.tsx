/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDocumentURLToView } from "@/apiService/document";
import ErrorComponent from "@/components/Error";
import Loader from "@/components/Loader";
import PDFViewer from "@/components/PDFViewer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

type DocumentSearch = {
	viewer: "image" | "pdf" | string;
};

export const Route = createFileRoute("/_authenticated/documents/$docid/view/")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	validateSearch: (search: Record<string, string>): DocumentSearch => {
		// validate and parse the search params into a typed state
		return {
			viewer: search.viewer,
		};
	},
	errorComponent: ErrorComponent,
	pendingComponent: Loader,
});

function RouteComponent() {
	const { docid } = Route.useParams();
	const { viewer } = Route.useSearch();
	const [isPending, fetchTransition] = useTransition();

	const [docurl, setDocurl] = useState<string | null>(null);

	useEffect(() => {
		fetchTransition(async () => {
			const response = await getDocumentURLToView(docid);

			setDocurl(response.data);
		});
	}, [docid]);

	return (
		<div className="flex flex-col">
			{viewer === "image" ? (
				isPending ? (
					<Loader />
				) : docurl ? (
					<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
						<img className="Image" src={docurl} alt="document" />
					</AspectRatio>
				) : (
					<span className="text-red-300">Failed to fetch image</span>
				)
			) : (
				<PDFViewer {...{ docid, docurl, isPending }} />
			)}
			<div className="w-full h-15" />
		</div>
	);
}
