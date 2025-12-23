import { config } from "@/config";
import { headers } from "./apiConfig";

export const getUploadDocumentPresignedURL = async (
	rootFolder: string,
	filename: string,
	mime: string,
) => {
	const response = await fetch(`${config.API_END}/${rootFolder}/upload`, {
		method: "POST",
		headers: {
			...headers,
			Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
		},
		body: JSON.stringify({ filename, mime }),
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Failed to upload file");
	}
	const data = await response.json();
	return data;
};

export const uploadDocument = async (uploadURL: string, file: File) => {
	try {
		const response = await fetch(uploadURL, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": file.type,
			},
		});
		if (!response.ok) {
			return false;
		}
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const updateUploadStatus = async (
	docid: string,
	status: "FAILED" | "UPLOADED",
	rootFolder: string,
) => {
	const response = await fetch(
		`${config.API_END}/${rootFolder}/upload/update`,
		{
			method: "POST",
			headers: {
				...headers,
				Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
			},
			body: JSON.stringify({ docid, status }),
			credentials: "include",
		},
	);
	if (!response.ok) {
		throw new Error("Failed to upload file");
	}
	const data = await response.json();
	return data;
};

export const getDocumentURLToView = async (docid: string) => {
	const response = await fetch(`${config.API_END}/${docid}/view`, {
		method: "GET",
		headers: {
			...headers,
			Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
		},

		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch document");
	}
	const data = await response.json();
	return data;
};

export const talkToDocument = async (docid: string, query: string) => {
	const response = await fetch(`${config.API_END}/${docid}/chat`, {
		method: "POST",
		headers: {
			...headers,
			Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
		},
		body: JSON.stringify({ query }),
		credentials: "include",
	});
	return response;
};

export const deleteDocument = async (documentId: string) => {
	const response = await fetch(`${config.API_END}/${documentId}/delete`, {
		method: "POST",
		headers: {
			...headers,
			Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
		},

		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch delete");
	}
	const data = await response.json();
	return data;
};

export const searchDocument = async (query: string) => {
	const response = await fetch(`${config.API_END}/search`, {
		method: "POST",
		headers: {
			...headers,
			Authorization: `Bearer ${localStorage.getItem("AUTH_ACCESS")}`,
		},
		body: JSON.stringify({ query }),
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch delete");
	}
	const data = await response.json();
	return data;
};
