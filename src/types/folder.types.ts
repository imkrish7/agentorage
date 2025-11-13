export interface Folder {
	name: string;
	parentId: string;
	createdBy: string;
	ownerBy: string;
	metadata: {
		[name: string]: string | number | [];
	};
	createdAt: string;
	updatedAt: string;
}
