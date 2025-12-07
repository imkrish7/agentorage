import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

const ErrorComponent = () => {
	const router = useRouter();
	return (
		<div className="flex justify-center items-center h-full w-full">
			<Card className="relative w-lg h-xl border-none shadow-drop shadow-gray-200/60 bg-white/60">
				<CardHeader className="text-center">
					<CardTitle className="text-4xl font-bold text-red-800/30">
						An Error occured
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex flex-col items-center">
					<div className="relative w-40 h-40 rounded-full bg-indigo-400 backdrop-blur-xl flex items-center justify-center">
						<div className="flex flex-col z-20">
							<div className="w-2 h-10 bg-indigo-600 rounded-md"></div>
							<div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
						</div>
						<div className="absolute origin-bottom w-full h-full bg-white/20 rounded-full z-1 backdrop-blur-4xl" />
					</div>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button
						variant={"outline"}
						className="border-white border-2 bg-white cursor-pointer"
						onClick={() => {
							router.invalidate();
						}}
					>
						Refresh
					</Button>
				</CardFooter>
				<div className="absolute left-0 bottom-0 h-40 w-20 bg-purple-500/10 backdrop-blur-4xl rounded-lg" />
				<div className="absolute right-0 top-0 h-40 w-20 bg-green-500/10 backdrop-blur-4xl rounded-lg" />
				<div className="absolute left-0 top-0 h-20 w-40 bg-orange-500/10 backdrop-blur-4xl rounded-lg" />
				<div className="absolute right-0 bottom-0 h-20 w-40 bg-blue-500/10 backdrop-blur-4xl rounded-lg" />
			</Card>
		</div>
	);
};

export default ErrorComponent;
