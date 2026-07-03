import type React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import SignUpContent from "@/layouts/SignUpContent";

const SignUp: React.FC = () => (
	<AuthLayout>
		<SignUpContent />
	</AuthLayout>
);

export default SignUp;
