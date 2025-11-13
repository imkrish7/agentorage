import {
	BrainCircuitIcon,
	DockIcon,
	FolderCheck,
	GroupIcon,
	MessageSquare,
	OrigamiIcon,
	SearchCheck,
} from "lucide-react";

export const features = [
	{
		icon: DockIcon,
		header: "Intelligent Document Storage",
		content:
			"Agentorage stores all your files in one secure workspace. Instead of relying on folder depth and naming conventions, the system analyzes the content inside your documents. This makes information locatable based on meaning, not just filenames.",
	},
	{
		icon: OrigamiIcon,
		header: "Automatic Structuring and Tagging",
		content:
			"Documents are automatically grouped by meaning, project, and context. No manual tagging required.",
	},
	{
		icon: SearchCheck,
		header: "Context-Aware Search",
		content:
			"Search using natural language, not keywords. Ask: 'Show me the proposal we sent to Acme last quarter' and Agentorage retrieves it instantly—along with relevant parts inside the file",
	},
	{
		icon: MessageSquare,
		header: "Conversational Q&A on Your Files",
		content:
			"Ask questions directly about your PDFs, Docs, or spreadsheets. Agentorage reads, interprets, and responds with clear summaries or precise excerpts. Example: “What are the main risks listed in this contract?” No manual scanning. No re-reading.",
	},
	{
		icon: BrainCircuitIcon,
		header: "Continuous Learning On Your Workspace",
		content:
			"As you add or change files, Agentorage updates its internal understanding. You never have to “re-index” or configure anything.",
	},
	{
		icon: GroupIcon,
		header: "Team Collaboration with Knowledge Boundaries",
		content:
			"Share spaces with teammates while maintaining data access controls. Each user sees only what they should, and the reasoning engine respects the same boundaries.",
	},
	{
		icon: FolderCheck,
		header: "Private and Secure by Design",
		content:
			"Your documents remain your documents. All processing happens in a controlled environment. No training on your data. No silent leakage into global models.",
	},
];
