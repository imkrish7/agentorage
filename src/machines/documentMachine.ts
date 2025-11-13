import { getFoldersAction } from "@/apiService/folder";
import type { Folder } from "@/types/folder.types";
import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";

export const documentMachine = setup({
	types: {
		context: {} as {
			folders: Folder[] | null;
		},
		events: {} as
			| {
					type: "GOTO_FOLDER";
			  }
			| {
					type: "CANCEL";
			  },
	},
	actors: {
		fetchFolders: fromPromise(async () => {
			const response = await getFoldersAction();
			return response;
		}),
	},
}).createMachine({
	id: "document",
	initial: "idle",
	context: {
		folders: null,
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
							target: "..loaded",
							actions: assign(({ event }) => {
								return {
									folders: event.output,
								};
							}),
						},
						onError: {
							target: "..loaded",
							actions: () => {
								toast.error("Failed to load folders!");
							},
						},
					},
				},
				retry: {
					after: {
						500: {
							target: "..loadFolders",
						},
					},
				},
				loaded: {
					on: {
						CANCEL: "..idle",
					},
				},
			},
		},
	},
});
