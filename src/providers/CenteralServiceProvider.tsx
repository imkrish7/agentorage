import { CenteralService } from "@/services/centeralService";
import type { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const CenteralServiceProvider: FC<IProps> = ({ children }) => {
	return <CenteralService.Provider>{children}</CenteralService.Provider>;
};

export default CenteralServiceProvider;
