import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "sonner";
import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<App />
			<Toaster
				richColors={true}
				icons={{
					success: <CircleCheckIcon className="size-4 " />,
					info: <InfoIcon className="size-4" />,
					warning: <TriangleAlertIcon className="size-4" />,
					error: <OctagonXIcon className="size-" />,
					loading: <Loader2Icon className="size-4 animate-spin" />,
				}}
			/>
		</AuthProvider>
	</StrictMode>,
);
