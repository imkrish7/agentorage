import { authMachine } from "@/machines/authMachin";
import { createActorContext } from "@xstate/react";

export const AuthService = createActorContext(authMachine, {
	inspect: () => {
		// console.log(inspectEvent);
	},
});

export const useAuthState = AuthService.useSelector;
export const useAuth = AuthService.useActorRef;
