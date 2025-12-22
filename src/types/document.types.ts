export type IDocumentRecord = {
	type: "document";
	sourceFile: {
		status: boolean;
	};
	_id: string;
	filename: string;
	mime: string;
	textContent: string;
	folderId: string;
	createdAt: string;
	updatedAt: string;
};
