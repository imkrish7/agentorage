import { config } from "@/config";
import { headers } from "./apiConfig";

export const getRecentResourcesdAction = async () => {
	try {
		const response = await fetch(`${config.API_END}/recents`, {
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
