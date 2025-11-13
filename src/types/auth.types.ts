export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
	nextStep: "activate" | "dashboard" | string;
}

export interface ActivateToken {
	otp: string;
}

export interface SignupRequest {
	name: string;
	email: string;
	password: string;
}

export interface SignupResponse {
	nextStep: "activate";
}
