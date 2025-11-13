import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth";
import { useAuth, useAuthState } from "@/services/authService";
import type z from "zod";
import Loader from "@/components/Loader";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigation = useNavigate();
	const authState = useAuthState((state) => state);
	const auth = useAuth();
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleLogin = (data: z.infer<typeof loginSchema>) => {
		auth.send({
			type: "LOGIN",
			loginCredential: data,
		});
	};

	if (authState.matches("authorized")) {
		navigation({ to: "/dashboard" });
	}

	useEffect(() => {
		auth.subscribe((state) => {
			console.log(state.value);
		});
	});

	if (authState.matches("refreshSession")) {
		return <h1>Krishna</h1>;
	}

	return (
		<div className="w-full h-full flex items-center justify-center relative">
			<Card className="border-none shadow-none bg-transparent">
				<CardHeader>
					<CardTitle>
						<span className="text-4xl font-bold">Login</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="w-sm sm:w-md md:w-xl">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleLogin)}>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem className="mt-2">
										<FormLabel className="text-md">
											Username
										</FormLabel>
										<FormControl>
											<Input
												placeholder="example@test.com"
												{...field}
												className="border-black rounded-none border-2"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="mt-2">
										<FormLabel className="text-md">
											Password
										</FormLabel>
										<FormControl>
											<Input
												placeholder="**************"
												{...field}
												className={cn(
													"border-black rounded-none border-2",
												)}
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								variant={"outline"}
								className="border-2 bg-transparent hover:transparent mt-2 rounded-none"
							>
								Log in
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
			{(authState.matches({ unauthorized: "trySigningin" }) ||
				authState.matches("refreshSession")) && (
				<div className="absolute top-0 left-0 h-full w-full flex items-center bg-gray-100/20 backdrop-blur-2xl">
					<Loader />
				</div>
			)}
		</div>
	);
}
