import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type React from "react";

const DefaultCatchBoundary: React.FC<ErrorComponentProps> = ({ error }) => (
	<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
		<h1 className="text-4xl font-bold text-[#252B42]">Something went wrong</h1>
		<p className="text-red-500 max-w-lg break-words">{error.message}</p>
		<Link
			to="/"
			className="bg-[#23A6F0] text-white px-6 py-3 rounded-lg hover:bg-[#1a8dd3] transition-colors"
		>
			Back to Home
		</Link>
	</div>
);

export default DefaultCatchBoundary;
