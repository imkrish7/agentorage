"use client";

import { MessageCircle, SendHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";

export const ChatInterface = () => {
	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button className="bg-indigo-500">
					<MessageCircle />
					Talk to document
				</Button>
			</DrawerTrigger>
			<DrawerContent className="border-none">
				<div className="flex flex-col h-full">
					<DrawerHeader>
						<DrawerTitle>Ask your question.</DrawerTitle>
						<DrawerDescription>
							Our chatbot help you to explore the document.
						</DrawerDescription>
					</DrawerHeader>
					<div className="flex-1 flex flex-col overflow-auto overflow-x-hidden gap-4 p-2">
						{/* {messages.map((msg: IChat, index: number) => {
							return (
								<div
									key={index}
									className={`flex ${
										msg.type === "AI"
											? "justify-start bg-gray-500 rounded-md p-1"
											: "justify-end"
									}`}
								>
									<span className="text-sm text-gray-100">
										{msg.message}
									</span>
								</div>
							);
						})} */}
						{/* {chatResponseLoading && "loading..."}
						{!chatResponseLoading && streamResponse.length > 0 && (
							<div className={`absolute right-0`}>
								<span className="text-sm">
									{streamResponse}
								</span>
							</div>
						)} */}
					</div>

					<DrawerFooter>
						<div className="flex items-center border-1 rounded-md px-2 active:focus:none">
							<Input
								className="border-none bg-none dark:bg-input-none selection:bg-none focus-visible:ring-[0] border-input-none focus:border-none focus:border-none active:outline-none"
								placeholder="summarise the rfp"
								// value={query}
								// onChange={(e) => setQuery(e.target.value)}
							/>
							<SendHorizontalIcon onClick={() => {}} />
						</div>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
