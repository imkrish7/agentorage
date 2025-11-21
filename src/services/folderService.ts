import { fromTransition, createActor } from "xstate";

const folderService = fromTransition((state, event) => {
	switch (event.type) {
		case "FETCH": {
			console.log("fetch");
			return state;
		}
		default: {
			return state;
		}
	}
}, {});
