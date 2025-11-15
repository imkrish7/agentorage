export interface Folder {
	_id: string;
	name: string;
	alias: string;
	parentId: string;
	createdBy: string;
	ownerBy: string;
	metadata: {
		[name: string]: string | number | [];
	};
	createdAt: string;
	updatedAt: string;
}

export interface CreateFolder {
	parentId: string;
	name: string;
}
