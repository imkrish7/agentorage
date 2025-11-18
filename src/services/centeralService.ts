import { centeralMachine } from "@/machines/centeralMachin";
import { createActorContext } from "@xstate/react";

export const CenteralService = createActorContext(centeralMachine, {
	inspect: (log) => {
		console.log("Centeral Service:", log);
	},
});

export const useCenteralServiceState = CenteralService.useSelector;
export const useCenteralService = CenteralService.useActorRef;
