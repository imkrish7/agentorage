import { ChevronRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";

const DocumentRow = () => {
	return (
		<div className="flex w-full flex-col gap-6">
			<Item variant="outline" className="w-full bg-slate-900">
				<ItemMedia>
					<Avatar className="size-10 bg-gray-200">
						<AvatarImage src="https://github.com/evilrabbit.png" />
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent>
					<ItemTitle className="text-white">Evil Rabbit</ItemTitle>
					<ItemDescription>Last seen 5 months ago</ItemDescription>
				</ItemContent>
				<ItemActions className="">
					<Button
						size="icon-sm"
						variant="ghost"
						className="cursor-pointer"
					>
						<ChevronRight className="text-white" />
					</Button>
				</ItemActions>
			</Item>
		</div>
	);
};

export default DocumentRow;
