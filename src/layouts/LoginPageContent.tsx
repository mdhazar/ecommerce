import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type React from "react";
import { useId } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import coupleWithScarf from "@/assets/coupleWithScarf.png";
import { Input, Label, Spinner } from "@/components/ui/common";
import { Button } from "@/components/ui/common/Button";
import { onImageError } from "@/lib/images";
import { useLogin } from "@/queries/auth";
import { type LoginFormData, loginSchema } from "@/schemas/auth";

const LoginPageContent: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
	const navigate = useNavigate();
	const { redirect } = useSearch({ from: "/login" });
	const login = useLogin();
	const isLoading = login.isPending;
	const emailId = useId();
	const passwordId = useId();
	const rememberId = useId();

	const onSubmit = (data: LoginFormData): void => {
		login.mutate(data, {
			onSuccess: () => {
				navigate({ to: redirect ?? "/", replace: true });
			},
			onError: () => {
				toast.error("Login failed. Please check your credentials.");
			},
		});
	};

	const onError = (formErrors: FieldErrors<LoginFormData>): void => {
		const errorMessages = Object.values(formErrors)
			.map((e) => (e as { message?: string })?.message)
			.filter(Boolean)
			.join(", ");
		toast.error(`Please fix the following: ${errorMessages}`);
	};

	return (
		<div className="flex flex-1 items-stretch">
			{/* Editorial brand image — hidden on small screens. */}
			<div className="relative hidden w-1/2 overflow-hidden lg:block">
				<img
					src={coupleWithScarf}
					onError={onImageError}
					alt="North & Grove — layered knits and warm neutrals"
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-foreground/20" />
				<div className="absolute bottom-10 left-10 right-10">
					<p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
						North &amp; Grove
					</p>
					<p className="mt-3 max-w-sm font-serif text-2xl leading-snug text-primary-foreground">
						Considered pieces for a slower, warmer wardrobe.
					</p>
				</div>
			</div>

			{/* Form panel */}
			<div className="flex w-full items-center justify-center px-4 py-14 md:px-8 lg:w-1/2">
				<div className="w-full max-w-md">
					<div className="mb-8">
						<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							Welcome back
						</p>
						<h1 className="text-3xl font-semibold tracking-tight">
							Sign in to your account
						</h1>
						{redirect ? (
							<p className="mt-3 text-sm text-muted-foreground">
								Sign in to continue where you left off.
							</p>
						) : (
							<p className="mt-3 text-sm text-muted-foreground">
								New here?{" "}
								<Link
									to="/signup"
									className="font-medium text-primary underline-offset-4 hover:underline"
								>
									Create an account
								</Link>
							</p>
						)}
					</div>

					<form
						className="space-y-5"
						onSubmit={handleSubmit(onSubmit, onError)}
						noValidate
					>
						<div className="space-y-2">
							<Label htmlFor={emailId}>Email address</Label>
							<Input
								id={emailId}
								type="email"
								autoComplete="email"
								placeholder="you@example.com"
								aria-invalid={Boolean(errors.email)}
								{...register("email")}
							/>
							{errors.email ? (
								<p className="text-xs text-destructive">
									{errors.email.message}
								</p>
							) : null}
						</div>

						<div className="space-y-2">
							<Label htmlFor={passwordId}>Password</Label>
							<Input
								id={passwordId}
								type="password"
								autoComplete="current-password"
								placeholder="••••••••"
								aria-invalid={Boolean(errors.password)}
								{...register("password")}
							/>
							{errors.password ? (
								<p className="text-xs text-destructive">
									{errors.password.message}
								</p>
							) : null}
						</div>

						<div className="flex items-center justify-between">
							<label
								htmlFor={rememberId}
								className="flex items-center gap-2 text-sm text-foreground"
							>
								<input
									id={rememberId}
									type="checkbox"
									className="h-4 w-4 rounded border-input accent-primary"
									{...register("rememberMe")}
								/>
								Remember me
							</label>
							<Link
								to="/contact"
								className="text-sm font-medium text-primary underline-offset-4 hover:underline"
							>
								Forgot your password?
							</Link>
						</div>

						<Button
							type="submit"
							size="lg"
							disabled={isLoading}
							className="w-full"
						>
							{isLoading ? (
								<>
									<Spinner size={18} className="text-primary-foreground" />
									Signing in…
								</>
							) : (
								"Sign in"
							)}
						</Button>
					</form>

					<p className="mt-8 text-center text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPageContent;
