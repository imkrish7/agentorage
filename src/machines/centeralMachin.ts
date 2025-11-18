import { getRootFolderAction } from "@/apiService/folder";
import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";

export const centeralMachine = setup({
	types: {
		context: {} as {
			root: string | null;
		},
	},
	actors: {
		fetchingRoot: fromPromise(async () => {
			const response = await getRootFolderAction();
			return response.data.root;
		}),
	},
}).createMachine({
	id: "centeral",
	context: {
		root: null,
	},
	initial: "fetchRootFolder",
	states: {
		fetchRootFolder: {
			invoke: {
				src: "fetchingRoot",
				onDone: {
					target: "rootLoaded",
					actions: assign(({ event }) => {
						console.log("called");
						return {
							root: event.output,
						};
					}),
				},
				onError: {
					target: "",
					actions: () => {
						toast.error("Error fetching contents");
					},
				},
			},
		},
		rootLoaded: {},
	},
});
