import { searchDocument } from "@/apiService/document";
import DocumentTile from "@/components/DocumentTile";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchForm } from "@/layouts/protected/search-form";
import type { IDocumentRecord } from "@/types/document.types";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { useMemo, useState, useTransition, type ChangeEvent } from "react";
import { toast } from "sonner";

export default function Search() {
	const [open, setOpen] = useState<boolean>(false);
	const [documents, setDocuments] = useState<IDocumentRecord[]>([]);
	const [isPending, startTransition] = useTransition();
	const toggleSearchPannel = () => {
		startTransition(() => {
			setOpen((prev) => !prev);
			setDocuments([]);
		});
	};
	const handleSearch = (search: string) => {
		startTransition(async () => {
			try {
				const response = await searchDocument(search);
				setDocuments([...response.documents]);
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error("Error fetching document");
				}
			}
		});
	};

	const debounce = (fn: (search: string) => void, delay: number) => {
		let timeout: ReturnType<typeof setTimeout>;

		return (search: string) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn(search), delay);
		};
	};

	const debounceSearch = useMemo(() => {
		return debounce(handleSearch, 300);
	}, []);

	return (
		<Dialog open={open} onOpenChange={toggleSearchPannel}>
			<DialogTrigger asChild className="rounded-md">
				<SearchForm handleSearchPannel={toggleSearchPannel} />
			</DialogTrigger>
			<DialogContent className="h-full sm:max-w-4xl sm:max-h-2/3 border-none">
				<DialogHeader>
					<DialogTitle>
						<div className="grid gap-4 mt-2">
							<div className="relative flex border-b-1 gap-2 border-gray-400">
								<SearchIcon className="absolute bottom-2.5 size-4" />
								<Input
									onChange={(
										e: ChangeEvent<HTMLInputElement>,
									) => {
										debounceSearch(e.target.value);
									}}
									className="border-none shadow-none ml-2"
									placeholder="Search..."
								/>
							</div>
						</div>
					</DialogTitle>
				</DialogHeader>
				<div className="flex gap-5">
					{isPending && (
						<Loader2Icon className="size-20 animate-spin" />
					)}
					{documents.length > 0 &&
						documents.map((document) => {
							return (
								<DocumentTile
									key={document._id}
									document={document}
									toggleModel={toggleSearchPannel}
								/>
							);
						})}
				</div>
			</DialogContent>
		</Dialog>
	);
}
