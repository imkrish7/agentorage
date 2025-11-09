import Layout from "@/layouts/protected/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: Layout,
});
