"use client";

import * as React from "react";
import {
	FolderIcon,
	Heart,
	PlusIcon,
	Share2,
	Tag,
	TimerIcon,
} from "lucide-react";

import { NavMain } from "./nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "All Files",
			url: "/dashboard",
			icon: FolderIcon,
			activeBackground: "bg-blue-300",
			iconColor: "text-blue-600",
			iconBackground: "bg-blue-200",
			textColor: "text-blue-600",
		},

		{
			title: "Recents",
			url: "/recent",
			icon: TimerIcon,
			activeBackground: "bg-indigo-300",
			iconColor: "text-indigo",
			iconBackground: "bg-indigo-200",
			textColor: "text-indigo-600",
		},
		{
			title: "Favourites",
			url: "/favorites",
			icon: Heart,
			activeBackground: "bg-amber-300",
			iconColor: "text-amber-600",
			iconBackground: "bg-amber-200",
			textColor: "text-amber-600",
		},
		{
			title: "Shared",
			url: "/shared",
			icon: Share2,
			activeBackground: "bg-green-300",
			iconColor: "text-green-600",
			iconBackground: "bg-green-200",
			textColor: "text-green-600",
		},
		{
			title: "Tags",
			url: "/tags",
			icon: Tag,
			activeBackground: "bg-yellow-300",
			iconColor: "text-yellow-600",
			iconBackground: "bg-yellow-200",
			textColor: "text-yellow-600",
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			className="top-0 fixed h-screen overflow-hidden border-none"
			{...props}
		>
			<SidebarHeader className="h-16">
				<div>
					<span className="font-bold text-xl">Agentorage</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<div className="shadow p-2 border-1 rounded-md border-gray-200">
					<div className="border-b border-gray-300 py-2">
						<Button className="bg-indigo-500">
							<PlusIcon className="" />
							Add New
						</Button>
					</div>
					<span className="h-1 w-full"></span>
					<NavMain items={data.navMain} />
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
