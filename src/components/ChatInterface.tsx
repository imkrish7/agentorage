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
import { startTransition, useOptimistic, useState, type FC } from "react";
import { talkToDocument } from "@/apiService/document";
import { toast } from "sonner";
import { processChunk } from "@/lib/processChunk";
import { StreamMessageType } from "@/types/chat";

interface IProps {
	docid: string;
}

interface IMessage {
	type: "user" | "ai" | string;
	message: string;
}
export const ChatInterface: FC<IProps> = ({ docid }) => {
	const [query, setQuery] = useState<string>("");
	const [chatResponseLoading, setChatResponseLoading] =
		useState<boolean>(false);
	const [streamResponse, setStreamResponse] = useOptimistic(
		"",
		(_state, newState: string) => {
			return newState;
		},
	);
	const [messages, setMessages] = useState<IMessage[]>([]);

	const processStream = async (
		reader: ReadableStreamDefaultReader,
		onChunk: (chunk: string) => Promise<void>,
	) => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				await onChunk(new TextDecoder().decode(value));
			}
		} catch (error) {
			toast.error(`Error in fetching response: ${JSON.stringify(error)}`);
			reader.releaseLock();
		}
	};
	const handleQuerySubmit = async () => {
		try {
			let fullResponse = "";
			setChatResponseLoading(true);
			const response = await talkToDocument(docid, query);
			if (!response.ok) throw new Error(await response.text());
			if (!response.body)
				throw new Error("No response body is available");
			setMessages((prev) => [
				...prev,
				{
					type: "user",
					message: query,
				},
			]);

			const reader = response.body?.getReader();

			await processStream(reader, async (chunk: string) => {
				const { parser } = processChunk();
				const _messages = parser(chunk);

				for (const _message of _messages) {
					console.log(_message);
					switch (_message.type) {
						case StreamMessageType.Token: {
							if ("token" in _message) {
								fullResponse += _message.token;
								startTransition(() => {
									setStreamResponse(fullResponse);
									setChatResponseLoading(false);
								});
							}
							break;
						}
						case StreamMessageType.Done: {
							startTransition(() => {
								setMessages((prev) => [
									...prev,
									{ type: "ai", message: fullResponse },
								]);
							});

							break;
						}
					}
				}
			});
		} catch (error) {
			console.error(error);
			toast.error("OOPS!, something went wrong!");
			setChatResponseLoading(false);
		}
	};
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
						{messages.map((msg: IMessage, index: number) => {
							return (
								<div
									key={index}
									className={`flex ${
										msg.type === "ai"
											? "justify-start bg-indigo-200 rounded-md p-1"
											: "justify-end"
									}`}
								>
									<span className="text-sm text-indigo-500">
										{msg.message}
									</span>
								</div>
							);
						})}
						{chatResponseLoading && "loading..."}
						{!chatResponseLoading && streamResponse.length > 0 && (
							<div className={`absolute right-0`}>
								<span className="text-sm">
									{streamResponse}
								</span>
							</div>
						)}
					</div>

					<DrawerFooter>
						<div className="flex items-center border-1 rounded-md px-2 active:focus:none">
							<Input
								className="border-none bg-none dark:bg-input-none selection:bg-none focus-visible:ring-[0] border-input-none focus:border-none focus:border-none active:outline-none"
								placeholder="summarise the rfp"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<SendHorizontalIcon onClick={handleQuerySubmit} />
						</div>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
