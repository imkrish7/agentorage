"use client";

import { type LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

interface Item {
	title: string;
	url: string;
	icon: LucideIcon;
	activeBackground: string;
	iconColor: string;
	iconBackground: string;
	textColor: string;
}

export function NavMain({ items }: { items: Item[] }) {
	return (
		<SidebarGroup className="border-none">
			<SidebarMenu className="grid grid-cols-2 gap-4">
				{items.map((item) => {
					return <MenuItem key={item.title} item={item} />;
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}

const MenuItem = ({ item }: { item: Item }) => {
	return (
		<SidebarMenuItem
			className="h-20 border rounded-md border-gray-200"
			key={item.title}
		>
			<Link
				activeProps={{
					className: `${item.activeBackground} ${item.textColor} backdrop-blur-2xl`,
				}}
				activeOptions={{
					exact: true,
				}}
				to={item.url}
				className="cursor-pointer flex rounded-md w-full h-full font-bold"
			>
				<SidebarMenuButton
					className="flex flex-col bg-white/40 backdrop-blur-3xl items-start h-full w-full gap-2 hover:bg-sidebar-none"
					tooltip={item.title}
				>
					<span
						className={`h-6 w-6 rounded-full flex items-center shadow-md justify-center ${item.iconBackground}`}
					>
						<item.icon className={`${item.iconColor} h-4 w-4`} />
					</span>
					<span>{item.title}</span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
};
