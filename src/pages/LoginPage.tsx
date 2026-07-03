import type React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPageContent from "@/layouts/LoginPageContent";

const Login: React.FC = () => (
	<AuthLayout>
		<LoginPageContent />
	</AuthLayout>
);

export default Login;
