import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const Header = () => {
	return (
		<header className="h-16 w-full flex justify-between items-center px-4">
			<Link to="/">
				<span className="text-xl font-bold">Agentorage</span>
			</Link>
			<div className="flex gap-4">
				<Link to="/about">
					<span className="text-lg font-semibold cursor-pointer">
						About
					</span>
				</Link>
				<Link to="/features">
					<span className="text-lg font-semibold cursor-pointer">
						Features
					</span>
				</Link>
			</div>
			<div className="flex gap-2">
				<Link to="/login">
					<Button
						variant={"outline"}
						className="bg-transparent hover:bg-transparent rounded-none border-2 cursor-pointer"
					>
						Log In
					</Button>
				</Link>
				<Link to="/signup">
					<Button className="rounded-none border-black border-2 text-white bg-black hover:bg-black cursor-pointer">
						Sign up
					</Button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
