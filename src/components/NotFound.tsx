import { Link } from "@tanstack/react-router";
import type React from "react";

const NotFound: React.FC = () => (
	<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
		<h1 className="text-6xl font-bold text-[#252B42]">404</h1>
		<p className="text-gray-600">The page you're looking for doesn't exist.</p>
		<Link
			to="/"
			className="bg-[#23A6F0] text-white px-6 py-3 rounded-lg hover:bg-[#1a8dd3] transition-colors"
		>
			Back to Home
		</Link>
	</div>
);

export default NotFound;
