import { createFolderAction, getFoldersAction } from "@/apiService/folder";
import type { CreateFolder, Folder } from "@/types/folder.types";
import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";

export const documentMachine = setup({
	types: {
		context: {} as {
			folders: Folder[];
			newFolder: CreateFolder | null;
		},
		events: {} as
			| {
					type: "GOTO_FOLDER";
			  }
			| {
					type: "CANCEL";
			  }
			| {
					type: "CREATE_FOLDER";
					folder: CreateFolder;
			  },
	},
	actors: {
		fetchFolders: fromPromise(async () => {
			console.log("callleddd");
			const response = await getFoldersAction();
			return response.data;
		}),
		addingFolder: fromPromise(
			async ({ input }: { input: CreateFolder }) => {
				const response = await createFolderAction(input);
				return response;
			},
		),
	},
}).createMachine({
	id: "document",
	initial: "idle",
	context: {
		folders: [],
		newFolder: null,
	},
	states: {
		idle: {
			on: {
				GOTO_FOLDER: "folder",
			},
		},
		folder: {
			initial: "loadFolders",
			states: {
				loadFolders: {
					invoke: {
						src: "fetchFolders",
						onDone: {
							target: "loaded",
							actions: assign(({ event }) => {
								return {
									folders: event.output,
								};
							}),
						},
						onError: {
							target: "loaded",
							actions: () => {
								toast.error("Failed to load folders!");
							},
						},
					},
				},
				loaded: {
					on: {
						CANCEL: "#document.idle",
						CREATE_FOLDER: {
							target: "creatingFolder",
							actions: assign(({ event }) => {
								return {
									newFolder: event.folder,
								};
							}),
						},
					},
				},
				creatingFolder: {
					invoke: {
						src: "addingFolder",
						input: ({ context }) => {
							if (!context.newFolder) {
								throw new Error("Bad request!");
							}
							return context.newFolder;
						},
						onDone: {
							target: "#document.idle",
						},
						onError: {
							target: "loaded",
						},
					},
				},
			},
		},
	},
});
