import {
	loginAction,
	logoutAction,
	refreshSessionAction,
	signupAction,
} from "@/apiService/auth";
import type {
	ActivateToken,
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
} from "@/types/auth.types";
import { toast } from "sonner";
import { assign, fromPromise, setup } from "xstate";

export const authMachine = setup({
	types: {
		context: {} as {
			loginResponse: LoginResponse | null;
			loginCredential: LoginRequest | null;
			signupRequest: SignupRequest | null;
			signupResponse: SignupResponse | null;
			activateAccount: ActivateToken | null;
			isAuthorized: boolean;
			email: string | null;
		},
		events: {} as
			| {
					type: "LOGIN";
					loginCredential: LoginRequest;
			  }
			| {
					type: "ACTIVATE";
					activateRequest: ActivateToken;
			  }
			| {
					type: "SIGNUP";
					signupRequest: SignupRequest;
			  }
			| {
					type: "LOGOUT";
			  },
	},
	guards: {
		hasAccessToken: () => {
			const accessToken = localStorage.getItem("AUTH_ACCESS");

			if (!accessToken) {
				return false;
			}
			return true;
		},
		isAccountActivated: ({ context }) => {
			return context.loginResponse?.nextStep === "activate";
		},
	},
	actors: {
		getSignin: fromPromise(async ({ input }: { input: LoginRequest }) => {
			const response = await loginAction(input);
			console.log(response);
			return response;
		}),
		getSignup: fromPromise(async ({ input }: { input: SignupRequest }) => {
			const response = await signupAction(input);
			return response;
		}),
		getRefreshSession: fromPromise(async () => {
			const response = await refreshSessionAction();
			return response;
		}),
		getAccountActivated: fromPromise(
			async ({ input }: { input: ActivateToken }) => {
				console.log(input);
				return {
					accessToken: "",
					nextStep: "",
				};
			},
		),
		gettingUserLoggedout: fromPromise(async () => {
			const response = await logoutAction();
			return response;
		}),
	},
}).createMachine({
	id: "auth",
	initial: "idle",
	context: {
		loginResponse: null,
		loginCredential: null,
		signupRequest: null,
		signupResponse: null,
		isAuthorized: false,
		activateAccount: null,
		email: null,
	},
	states: {
		idle: {
			always: [
				{
					guard: "hasAccessToken",
					target: "refreshSession",
				},
				{
					target: "unauthorized",
				},
			],
		},
		unauthorized: {
			initial: "userActions",
			states: {
				userActions: {
					on: {
						LOGIN: {
							target: "trySigningin",
							actions: assign(({ event }) => {
								return {
									loginCredential: event.loginCredential,
								};
							}),
						},
						SIGNUP: {
							target: "trySigningup",
							actions: assign(({ event }) => {
								return {
									signupRequest: event.signupRequest,
								};
							}),
						},
					},
				},
				trySigningin: {
					invoke: {
						src: "getSignin",
						input: ({ context }) => {
							if (!context.loginCredential) {
								throw new Error("Bad request!");
							}
							return context.loginCredential;
						},
						onDone: {
							target: "#auth.authorized",
							actions: assign(({ event }) => {
								localStorage.setItem(
									"AUTH_ACCESS",
									event.output.accessToken,
								);
								return {
									loginResponse: event.output,
									isAuthorized: true,
								};
							}),
						},
						onError: {
							target: "userActions",
							actions: () => {
								toast.error("Failed to login");
							},
						},
					},
				},
				validateResponse: {
					always: [
						{
							guard: "isAccountActivated",
							target: "activateAccount",
						},
						{
							target: "...authorized",
							actions: assign(({ context }) => {
								return {
									isAuthorized: context.loginResponse
										? true
										: false,
								};
							}),
						},
					],
				},
				activateAccount: {
					on: {
						ACTIVATE: {
							target: "..activating",
							actions: assign(({ event, context }) => {
								const userEmail =
									context.loginCredential?.username ||
									context.signupRequest?.email;
								return {
									activateAccount: event.activateRequest,
									email: userEmail,
									loginCredential: null,
									signupRequest: null,
								};
							}),
						},
					},
				},
				activating: {
					invoke: {
						src: "getAccountActivated",
						input: ({ context }) => {
							if (!context.activateAccount) {
								throw new Error("Bad request!");
							}
							return context.activateAccount;
						},
						onDone: {
							target: "#auth.authorized",
							actions: assign(({ event }) => {
								return {
									loginResponse: event.output,
								};
							}),
						},
						onError: {
							target: "..activateAccount",
							actions: () => {
								toast.error("Failed to activate account");
							},
						},
					},
				},
				trySigningup: {
					invoke: {
						src: "getSignup",
						input: ({ context }) => {
							if (!context.signupRequest) {
								throw new Error("Bad request!");
							}
							return context.signupRequest;
						},
						onDone: {
							target: "gotoLogin",
							actions: () => {
								console.log("Signup completed!");
							},
						},
						onError: {
							target: "userActions",
							actions: () => {
								toast.error("Failed to signup");
							},
						},
					},
				},
				gotoLogin: {
					target: "#auth.unauthorized.userActions",
				},
			},
		},
		refreshSession: {
			invoke: {
				src: "getRefreshSession",
				onDone: {
					target: "#auth.authorized",
					actions: assign(({ event }) => {
						localStorage.setItem(
							"AUTH_ACCESS",
							event.output.accessToken,
						);
						return {
							loginResponse: event.output,
							isAuthorized: true,
						};
					}),
				},
				onError: {
					target: "#auth.unauthorized",
					actions: () => {
						localStorage.clear();
						return {
							loginResponse: null,
							loginRequest: null,
							email: null,
							isAuthorized: false,
						};
					},
				},
			},
		},
		authorized: {
			initial: "actions",
			states: {
				actions: {
					on: {
						LOGOUT: {
							target: "loggingout",
						},
					},
				},
				loggingout: {
					invoke: {
						src: "gettingUserLoggedout",
						onDone: {
							target: "#auth.unauthorized",
							actions: assign(() => {
								localStorage.clear();
								return {
									loginResponse: null,
									loginRequest: null,
									email: null,
									isAuthorized: false,
								};
							}),
						},
						onError: {
							target: "#auth.unauthorized",
							actions: assign(() => {
								localStorage.clear();
								return {
									loginResponse: null,
									loginRequest: null,
									email: null,
									isAuthorized: false,
								};
							}),
						},
					},
				},
			},
		},
	},
});
