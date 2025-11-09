import { CircleChevronRight, EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const FolderCard = () => {
	return (
		<Card className="w-60 h-40 border-none shadow-md p-0">
			<CardContent className="h-full w-full p-0">
				<div className="w-full h-full bg-indigo-200 grid grid-cols-2 rounded-md border-4 border-indigo-200">
					<div className="h-full relative justify-end flex flex-col">
						<div className="rounded-br-md folded-rectangle flex justify-center bg-indigo-200 z-10">
							<span className="text-md text-center font-bold">
								Documents
							</span>
						</div>
						<div className="h-[90%] bg-white relative rounded-l-md w-full relative">
							<div className=" absolute bottom-10 *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
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
					<div className="bg-white relative h-full rounded-r-md rounded-tl-xl">
						<Button
							variant={"ghost"}
							className="absolute right-1 top-1 cursor-pointer"
						>
							<EllipsisVertical />
						</Button>
						<Button
							variant={"ghost"}
							className="absolute right-1 bottom-1 cursor-pointer"
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
