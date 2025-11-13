"use client";
import { Button } from "@/components/ui/button";
import { SearchForm } from "./search-form";
import { Bell } from "lucide-react";
import { NavUser } from "./nav-user";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl flex w-full items-center border-b border-gray-200 h-16 px-4">
			<div className="flex flex-1 w-full justify-between items-center gap-2 px-4">
				<SearchForm className="w-full sm:w-auto flex-1" />
				<Button variant={"ghost"} className="cursor-pointer">
					<Bell className="text-black" />
				</Button>
			</div>
			<div className="w-40">
				<NavUser
					user={{
						name: "Krishna",
						email: "email@exmaple.com",
						avatar: "",
					}}
				/>
			</div>
		</header>
	);
}
