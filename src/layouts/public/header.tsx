import { Link } from "@tanstack/react-router";

const Header = () => {
	return (
		<header className="h-16 w-full flex justify-between items-center px-4">
			<div>
				<span className="text-xl font-bold">Agentorage</span>
			</div>
			<div className="flex gap-2">
				<Link to="/about">
					<span className="text-lg font-semibold">About</span>
				</Link>
				<Link to="/features">
					<span className="text-lg font-semibold">Features</span>
				</Link>
			</div>
		</header>
	);
};

export default Header;
