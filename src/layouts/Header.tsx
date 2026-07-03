import {
	Facebook,
	Instagram,
	Mail,
	Phone,
	Twitter,
	Youtube,
} from "lucide-react";
import type React from "react";

const Header: React.FC = () => {
	return (
		<div className="header text-white bg-[#252B42] hidden md:block">
			<div className="container">
				<div className="flex justify-between items-center p-4">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<Phone />
							<span>(225) 555-0118</span>
						</div>
						<div className="flex items-center space-x-2">
							<Mail />
							<span>michelle.rivera@example.com</span>
						</div>
					</div>
					<div className="text-center">
						Follow Us and get a chance to win 80% off
					</div>
					<div className="flex items-center space-x-4">
						<span>Follow Us:</span>
						<Instagram />
						<Youtube />
						<Facebook />
						<Twitter />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
