import {
	startTransition,
	useCallback,
	useEffect,
	useRef,
	useState,
	type FC,
} from "react";
import { Button } from "./ui/button";
import { getDocument } from "pdfjs-dist";
import { ChatInterface } from "./ChatInterface";

import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import Loader from "./Loader";

import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = workerSrc;

interface IProps {
	docurl: string | null;
	isPending: boolean;
	docid: string;
}

const PDFViewer: FC<IProps> = ({ docurl, isPending, docid }) => {
	const [pages, setPages] = useState<number>();
	const [currentPage, setCurrentPage] = useState(1);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const changePage = (pageNumber: number) => {
		if (
			pages &&
			currentPage + pageNumber > 0 &&
			currentPage + pageNumber < pages
		) {
			setCurrentPage(currentPage + pageNumber);
		}
	};

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
	return (
		<div className="flex w-full flex-col">
			<div className="grid grid-cols-2 justify-between gap-2 items-center">
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
				<ChatInterface docid={docid} />
			</div>
			<div className="w-full h-5" />
			<div className="w-full h-inherit relative flex mb-5">
				{isPending && <Loader />}

				<canvas ref={canvasRef} className="max-w-full rounded-md" />
			</div>
		</div>
	);
};

export default PDFViewer;
