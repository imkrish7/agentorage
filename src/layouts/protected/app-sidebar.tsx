"use client";

import * as React from "react";
import { Heart, HomeIcon, Share2, Tag, TimerIcon } from "lucide-react";

import { NavMain } from "./nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { DocumentAction } from "@/components/DocumentAction";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Home",
			url: "/dashboard",
			icon: HomeIcon,
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
			iconColor: "text-indigo-600",
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
			className="top-0 left-0 fixed border-none backdrop-blur-xl"
			{...props}
			collapsible="offcanvas"
		>
			<SidebarHeader className="h-16 bg-white/20">
				<div>
					<span className="font-bold text-xl">Agentorage</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<div className="p-2 border-none">
					<div className="border-b border-white py-2">
						<DocumentAction />
					</div>
					<span className="h-1 w-full"></span>
					<NavMain items={data.navMain} />
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
