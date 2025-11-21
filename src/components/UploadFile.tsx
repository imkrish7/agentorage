import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
} from "@/components/ui/empty";
import { CloudIcon } from "lucide-react";
import {
	type ChangeEvent,
	type Dispatch,
	type DragEvent,
	type FC,
	type SetStateAction,
} from "react";

interface IProps {
	setFiles: Dispatch<SetStateAction<File[]>>;
}

export const UploadFile: FC<IProps> = ({ setFiles }) => {
	const dragCapture = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		console.log("Drag drop", e.target);
	};
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setFiles([...e.dataTransfer.files]);
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e);
		setFiles([...e.target.files!]);
	};
	return (
		<Empty
			onDragCapture={dragCapture}
			onDragOver={dragCapture}
			onDrop={handleDrop}
			className="border border-dashed relative"
		>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<CloudIcon />
				</EmptyMedia>
				<EmptyDescription>
					Upload files to your cloud storage to access them anywhere.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					type="button"
					variant="outline"
					className="border-white bg-white/80"
					size="sm"
				>
					Upload Files
				</Button>
				<EmptyDescription>drag & drop</EmptyDescription>
			</EmptyContent>
			<input
				onChange={handleChange}
				// value={files}
				multiple
				type="file"
				className="opacity-0 absolute h-full h-full"
			/>
		</Empty>
	);
};
