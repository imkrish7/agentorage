import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form.";

export default function Layout() {
	return (
		<div className="[--header-height:calc(--spacing(14))] h-screen overflow-hidden">
			<SidebarProvider className="flex flex-row backdrop-blur-3xl">
				<AppSidebar />
				<div className="flex flex-1 flex-col">
					<SiteHeader />
					<SidebarInset>
						<div className="flex flex-1 max-h-screen flex-col gap-4 p-4 overflow-scroll">
							<Outlet />
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
