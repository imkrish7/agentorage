import { CircleChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import type { FC } from "react";
import type { Folder } from "@/types/folder.types";
import { useNavigate } from "@tanstack/react-router";
import FolderCardAction from "./FolderCardAction";

interface IProps {
	className?: string;
	folder: Folder;
}

const FolderCard: FC<IProps> = ({ className, folder }) => {
	const navigation = useNavigate();
	return (
		<Card className={`w-60 h-40 border-none shadow-md p-0 ${className}`}>
			<CardContent className="h-full w-full p-0">
				<div className="w-full h-full bg-indigo-200 grid grid-cols-2 rounded-md border-4 border-indigo-200">
					<div className="h-full relative justify-end flex flex-col">
						<div className="rounded-br-md folded-rectangle flex justify-center bg-indigo-200 z-10">
							<span className="text-md text-center font-bold">
								{folder.alias}
							</span>
						</div>
						<div className="h-[90%] bg-white/60 backdrop-blur-3xl relative rounded-l-md w-full relative">
							<div className="absolute bottom-10 *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
								<Avatar>
									<AvatarImage
										src="https://github.com/shadcn.png"
										alt="@shadcn"
									/>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<Avatar>
									<AvatarImage
										src="https://github.com/maxleiter.png"
										alt="@maxleiter"
									/>
									<AvatarFallback>LR</AvatarFallback>
								</Avatar>
								<Avatar>
									<AvatarImage
										src="https://github.com/evilrabbit.png"
										alt="@evilrabbit"
									/>
									<AvatarFallback>ER</AvatarFallback>
								</Avatar>
							</div>
						</div>
					</div>
					<div className="bg-white/60 backdrop-blur-3xl relative h-full rounded-r-md rounded-tl-xl z-10">
						<div className="absolute right-1 top-1">
							<FolderCardAction />
						</div>
						<Button
							variant={"secondary"}
							className="absolute right-1 bottom-1 cursor-pointer"
							onClick={() => {
								navigation({ to: `/folder/${folder._id}` });
							}}
						>
							<CircleChevronRight />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export { FolderCard };
