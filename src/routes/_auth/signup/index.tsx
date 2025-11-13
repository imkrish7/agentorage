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
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/auth";
import type z from "zod";
import { useAuth, useAuthState } from "@/services/authService";
import Loader from "@/components/Loader";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/signup/")({
	component: RouteComponent,
});

function RouteComponent() {
	const authState = useAuthState((state) => state);
	const auth = useAuth();
	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = (data: z.infer<typeof signupSchema>) => {
		auth.send({
			type: "SIGNUP",
			signupRequest: data,
		});
	};

	if (authState.matches({ unauthorized: "trySigningup" })) {
		return <Loader />;
	}

	if (authState.matches({ unauthorized: "gotoLogin" })) {
		toast.success("Signup completed!");
		return <Navigate to="/login" />;
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<Card className="border-none shadow-none bg-transparent">
				<CardHeader>
					<CardTitle>
						<span className="text-4xl font-bold">Sign up</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="w-sm sm:w-md md:w-xl">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="mt-2">
										<FormLabel className="text-md">
											Name
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
								name="email"
								render={({ field }) => (
									<FormItem className="mt-2">
										<FormLabel className="text-md">
											Email
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
								Sign up
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
