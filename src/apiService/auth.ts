import { config } from "@/config";
import type { LoginRequest, SignupRequest } from "@/types/auth.types";
import { headers } from "./apiConfig";

export const loginAction = async (credential: LoginRequest) => {
	try {
		const response = await fetch(`${config.API_END}/auth/login`, {
			method: "POST",
			body: JSON.stringify(credential),
			headers: headers,
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Failed to login");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const signupAction = async (credential: SignupRequest) => {
	try {
		const response = await fetch(`${config.API_END}/auth/signup`, {
			method: "POST",
			body: JSON.stringify(credential),
			headers: headers,
		});

		if (!response.ok) {
			throw new Error("Failed to Signup");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const refreshSessionAction = async () => {
	try {
		const response = await fetch(`${config.API_END}/auth/refresh-session`, {
			method: "POST",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Failed to refresh session");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
