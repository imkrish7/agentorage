import { AuthService } from "@/services/authService";
import type { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
	return <AuthService.Provider>{children}</AuthService.Provider>;
};

export default AuthProvider;
