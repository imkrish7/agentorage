/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDocumentURLToView } from "@/apiService/document";
import ErrorComponent from "@/components/Error";
import Loader from "@/components/Loader";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
	startTransition,
	useCallback,
	useEffect,
	useRef,
	useState,
	useTransition,
} from "react";
import { getDocument } from "pdfjs-dist";

import { GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";

GlobalWorkerOptions.workerSrc = workerSrc;

export const Route = createFileRoute("/_authenticated/documents/$docid/view/")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	errorComponent: ErrorComponent,
	pendingComponent: Loader,
});

function RouteComponent() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const { docid } = Route.useParams();
	const [isPending, fetchTransition] = useTransition();
	const [currentPage, setCurrentPage] = useState(1);
	const [docurl, setDocurl] = useState<string | null>(null);
	const [pages, setPages] = useState<number>();
	useEffect(() => {
		fetchTransition(async () => {
			const response = await getDocumentURLToView(docid);

			setDocurl(response.data);
		});
	}, [docid]);

	const renderPDF = useCallback(() => {
		startTransition(async () => {
			if (docurl) {
				const pdf = await getDocument(docurl).promise;
				const pages = pdf.numPages;

				setPages(pages);
				const page = await pdf.getPage(currentPage);

				const outputScale = window.devicePixelRatio || 1;

				const viewport = page.getViewport({ scale: 1.5 });
				const canvas = canvasRef.current;
				if (canvas) {
					const context = canvas.getContext("2d");
					if (!context) {
						throw new Error("Failed to render document");
					}

					canvas.height = Math.floor(viewport.height * outputScale);
					canvas.width = Math.floor(viewport.width * outputScale);
					canvas.style.width = Math.floor(viewport.width) + "px";
					canvas.style.height = Math.floor(viewport.height) + "px";

					page.render({
						canvasContext: context,
						...(outputScale !== 1 && {
							transform: [outputScale, 0, 0, outputScale, 0, 0],
						}),
						viewport,
						canvas,
					});
				}
			}
		});
	}, [docurl, currentPage]);

	useEffect(() => {
		if (docurl && canvasRef) {
			renderPDF();
		}
	}, [docurl, canvasRef, renderPDF]);

	useEffect(() => {
		document.addEventListener("resize", renderPDF);
		return () => document.removeEventListener("resize", renderPDF);
	}, [renderPDF]);

	const changePage = (pageNumber: number) => {
		if (
			pages &&
			currentPage + pageNumber > 0 &&
			currentPage + pageNumber < pages
		) {
			setCurrentPage(currentPage + pageNumber);
		}
	};

	console.log(pages);

	return (
		<div>
			<div className="grid grid-cols-2 justify-between gap-2 items-center mb-2">
				<div className="flex gap-2 items-center justify-center">
					<Button
						onClick={() => {
							changePage(-1);
						}}
						variant={"outline"}
						className="border-none bg-white hover:bg-white"
					>
						Prev
					</Button>
					<span className="bg-white w-8 h-8 rounded-md flex items-center justify-center">
						{currentPage}
					</span>
					<Button
						onClick={() => {
							changePage(1);
						}}
						variant={"outline"}
						className="border-none bg-white hover:bg-white"
					>
						Next
					</Button>
				</div>
				<ChatInterface />
			</div>
			<div className="w-full h-inherit relative flex">
				{isPending && <Loader />}

				<canvas ref={canvasRef} className="max-w-full rounded-md" />
			</div>
		</div>
	);
}
