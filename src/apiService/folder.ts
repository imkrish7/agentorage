import { config } from "@/config";
import { headers } from "./apiConfig";
import type { CreateFolder } from "@/types/folder.types";
interface Search {
	view: string;
	resources: string;
}

export const getFoldersAction = async (
	rootFolder?: string,
	search?: Search,
) => {
	try {
		const response = await fetch(
			rootFolder
				? `${config.API_END}/folders/${rootFolder}?view=${search?.view}&resources=${search?.resources}`
				: `${config.API_END}/folders`,
			{
				method: "GET",
				headers: {
					...headers,
					Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
				},

				credentials: "include",
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch folders");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getRootFolderAction = async () => {
	try {
		const response = await fetch(`${config.API_END}/folders/root`, {
			method: "GET",
			headers: {
				...headers,
				Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch folders");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createFolderAction = async (payload: CreateFolder) => {
	try {
		const response = await fetch(`${config.API_END}/folders/create`, {
			method: "POST",
			headers: {
				...headers,
				Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
			},
			body: JSON.stringify(payload),
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Failed to fetch folders");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
