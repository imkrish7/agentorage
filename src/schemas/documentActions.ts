import z from "zod";

export const createFolderSchema = z.object({
	name: z.string().min(3, "Folder name is required"),
});
