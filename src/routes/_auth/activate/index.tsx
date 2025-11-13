import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import {
	useRef,
	useState,
	type ChangeEvent,
	type KeyboardEvent,
	type ClipboardEvent,
} from "react";

export const Route = createFileRoute("/_auth/activate/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [otp, setOtp] = useState(Array(4).fill("")); // Array with 6 empty strings
	const inputRefs = useRef<HTMLInputElement[]>([]); // Array of refs for each input field

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (
			!/^[0-9]{1}$/.test(e.key) &&
			e.key !== "Backspace" &&
			e.key !== "Delete" &&
			e.key !== "Tab" &&
			!e.metaKey
		) {
			e.preventDefault();
		}

		if (e.key === "Delete" || e.key === "Backspace") {
			const index = inputRefs.current.indexOf(e.target);
			if (index > 0) {
				setOtp((prevOtp) => [
					...prevOtp.slice(0, index - 1),
					"",
					...prevOtp.slice(index),
				]);
				inputRefs.current[index - 1].focus();
			}
		}
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		const index = inputRefs.current.indexOf(target);
		if (target.value) {
			setOtp((prevOtp) => [
				...prevOtp.slice(0, index),
				target.value,
				...prevOtp.slice(index + 1),
			]);
			if (index < otp.length - 1) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.select();
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const text = e.clipboardData.getData("text");
		if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
			return;
		}
		const digits = text.split("");
		setOtp(digits);
	};
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Card className="border-none shadow-none bg-transparent">
				<CardHeader>
					<CardTitle>
						<span className="text-4xl font-bold">
							Activate Account
						</span>
					</CardTitle>
					<CardDescription>
						Complete activation to access your files and start using
						Agentorage.
					</CardDescription>
				</CardHeader>
				<CardContent className="w-sm sm:w-md md:w-xl">
					<section className="dark:bg-dark">
						<div className="container">
							<form id="otp-form" className="flex gap-2 flex-col">
								<div className="flex gap-2">
									{otp.map((digit, index) => (
										<input
											key={index}
											type="text"
											maxLength={1}
											value={digit}
											onChange={handleInput}
											onKeyDown={handleKeyDown}
											onFocus={handleFocus}
											onPaste={handlePaste}
											ref={(el) => {
												if (el) {
													inputRefs.current[index] =
														el as HTMLInputElement;
												}
											}}
											className="shadow-xs flex w-[64px] items-center justify-center rounded-lg bg-white p-2 text-center text-2xl font-medium text-gray-5 sm:text-4xl"
										/>
									))}
								</div>
								<div className="mt-2">
									<Button
										variant={"outline"}
										className="cursor-pointer rounded-none bg-gray-100/50 backdrop-blur-xl shadow-md border-2 border-white hover:bg-transparent"
									>
										Activte
									</Button>
								</div>
							</form>
						</div>
					</section>
				</CardContent>
			</Card>
		</div>
	);
}
