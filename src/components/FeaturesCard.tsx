import type { ReactNode } from "react";

interface IProps {
	icon: ReactNode;
	header: string;
	content: string;
}

const FeaturesCard = ({ icon, header, content }: IProps) => {
	return (
		<div className="flex w-[300px] bg-white/40  rounded-md p-4 flex-col gap-2">
			<span className="bg-white/40 shadow-md backdrop-blur-xl h-10 w-10 rounded-full flex items-center justify-center">
				{icon}
			</span>
			<span className="text-lg font-bold">{header}</span>
			<p className="text-sm font-semibold text-gray-500">{content}</p>
		</div>
	);
};

export default FeaturesCard;
