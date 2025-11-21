import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useDocumentServiceState } from "@/services/documentService";
import FolderCreate from "@/components/FolderCreate";
import DocumentCreate from "@/components/DocumentCreate";

// export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form.";

export default function Layout() {
	const documentServiceState = useDocumentServiceState((state) => state);
	return (
		<div className="[--header-height:calc(--spacing(14))] h-screen overflow-hidden background-g">
			<SidebarProvider className="flex flex-row backdrop-blur-3xl">
				<AppSidebar />
				<div className="flex flex-1 flex-col">
					<SiteHeader />
					<SidebarInset>
						<div className="flex flex-1 max-h-screen flex-col gap-4 p-4 overflow-auto overflow-x-hidden">
							<Outlet />
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
			{documentServiceState.matches("folder") && <FolderCreate />}
			{documentServiceState.matches("document") && <DocumentCreate />}
		</div>
	);
}
