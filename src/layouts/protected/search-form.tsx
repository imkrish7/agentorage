import { Search } from "lucide-react";

interface IProps {
	handleSearchPannel: () => void;
}

export function SearchForm({ handleSearchPannel }: IProps) {
	return (
		<div
			onClick={handleSearchPannel}
			className="relative flex-1 rounded-md"
		>
			<div
				id="search"
				className="h-8 pl-7 bg-white/60 backdrop-blur-md border-white rounded-md"
			/>
			<Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
		</div>
	);
}
