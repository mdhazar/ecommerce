import { Link } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/api/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Select,
	Spinner,
} from "@/components/ui/common";
import { Button } from "@/components/ui/common/Button";

interface Role {
	id: string;
	name: string;
}

interface SignUpPayload {
	name: string;
	email: string;
	password: string;
	role_id: string;
	store?: {
		name?: string;
		phone?: string;
		tax_no?: string;
		bank_account?: string;
	};
}

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
	role_id: string;
	store_name?: string;
	store_phone?: string;
	store_tax_no?: string;
	store_bank_account?: string;
}

const SignUpContent: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpFormData>();
	const [roles, setRoles] = useState<Role[]>([]);
	const [selectedRole, setSelectedRole] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [storeFieldsVisible, setStoreFieldsVisible] = useState<boolean>(false);
	const [storeRoleId, setStoreRoleId] = useState<string | null>(null);
	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const confirmPasswordId = useId();
	const roleFieldId = useId();
	const storeNameId = useId();
	const storePhoneId = useId();
	const storeTaxId = useId();
	const storeBankId = useId();

	useEffect(() => {
		api
			.get("/roles")
			.then((response) => {
				setRoles(response.data);

				const storeRole = response.data.find((role: Role) =>
					["mağaza", "store"].includes(role.name.toLowerCase()),
				);
				if (storeRole) {
					setStoreRoleId(storeRole.id);
				}

				const customerRole = response.data.find((role: Role) =>
					["müşteri", "customer"].includes(role.name.toLowerCase()),
				);
				if (customerRole) {
					setSelectedRole(customerRole.id);
				} else if (response.data.length > 0) {
					setSelectedRole(response.data[0].id);
				}
			})
			.catch(() => {
				toast.error("Unable to load account types. Please try again.");
			});
	}, []);

	useEffect(() => {
		setStoreFieldsVisible(selectedRole === storeRoleId);
	}, [selectedRole, storeRoleId]);

	const onSubmit = (data: SignUpFormData) => {
		setIsSubmitting(true);

		const formData: SignUpPayload = {
			name: data.name,
			email: data.email,
			password: data.password,
			role_id: selectedRole,
		};

		if (selectedRole === storeRoleId) {
			formData.store = {
				name: data.store_name,
				phone: data.store_phone,
				tax_no: data.store_tax_no,
				bank_account: data.store_bank_account,
			};
		}

		api
			.post("/signup", formData)
			.then(() => {
				setIsSubmitting(false);
				toast.success(
					"Account created! Check your inbox for an activation link — don't forget the spam folder.",
				);
			})
			.catch((error) => {
				setIsSubmitting(false);
				toast.error(error.response?.data?.message || "Signup failed");
			});
	};

	const password = watch("password");

	const isValidIBAN = (iban: string): boolean => {
		// Basic IBAN validation for Türkiye (TR).
		const ibanRegex =
			/^TR[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{2}$/;
		return ibanRegex.test(iban.replace(/\s/g, "").toUpperCase());
	};

	return (
		<div className="flex flex-1 items-center justify-center px-4 py-14 md:px-8">
			<Card className="w-full max-w-lg">
				<CardHeader className="space-y-3 text-center">
					<p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						Join North &amp; Grove
					</p>
					<CardTitle className="font-serif text-3xl">
						Create your account
					</CardTitle>
					<CardDescription>
						Save your favorites, track orders, and check out faster.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
						noValidate
					>
						<div className="space-y-2">
							<Label htmlFor={nameId}>Name</Label>
							<Input
								id={nameId}
								type="text"
								autoComplete="name"
								aria-invalid={Boolean(errors.name)}
								{...register("name", { required: true, minLength: 3 })}
							/>
							{errors.name ? (
								<p className="text-xs text-destructive">
									Name is required and should be at least 3 characters.
								</p>
							) : null}
						</div>

						<div className="space-y-2">
							<Label htmlFor={emailId}>Email</Label>
							<Input
								id={emailId}
								type="email"
								autoComplete="email"
								placeholder="you@example.com"
								aria-invalid={Boolean(errors.email)}
								{...register("email", {
									required: true,
									pattern: /^\S+@\S+$/i,
								})}
							/>
							{errors.email ? (
								<p className="text-xs text-destructive">
									A valid email is required.
								</p>
							) : null}
						</div>

						<div className="space-y-2">
							<Label htmlFor={passwordId}>Password</Label>
							<Input
								id={passwordId}
								type="password"
								autoComplete="new-password"
								aria-invalid={Boolean(errors.password)}
								{...register("password", {
									required: true,
									minLength: 8,
									validate: (value) =>
										/[a-z]/.test(value) &&
										/[A-Z]/.test(value) &&
										/[0-9]/.test(value) &&
										/[^A-Za-z0-9]/.test(value),
								})}
							/>
							{errors.password ? (
								<p className="text-xs text-destructive">
									Password must be at least 8 characters and include numbers,
									uppercase, lowercase, and special characters.
								</p>
							) : null}
						</div>

						<div className="space-y-2">
							<Label htmlFor={confirmPasswordId}>Confirm password</Label>
							<Input
								id={confirmPasswordId}
								type="password"
								autoComplete="new-password"
								aria-invalid={Boolean(errors.confirm_password)}
								{...register("confirm_password", {
									required: true,
									validate: (value) =>
										value === password || "Passwords do not match",
								})}
							/>
							{errors.confirm_password ? (
								<p className="text-xs text-destructive">
									{errors.confirm_password.message ??
										"Please confirm your password."}
								</p>
							) : null}
						</div>

						<div className="space-y-2">
							<Label htmlFor={roleFieldId}>Account type</Label>
							<Select
								id={roleFieldId}
								{...register("role_id", { required: true })}
								value={selectedRole}
								onChange={(e) => setSelectedRole(e.target.value)}
							>
								{roles.map((role) => (
									<option key={role.id} value={role.id}>
										{role.name}
									</option>
								))}
							</Select>
							{errors.role_id ? (
								<p className="text-xs text-destructive">
									Account type is required.
								</p>
							) : null}
						</div>

						{storeFieldsVisible ? (
							<div className="space-y-5 rounded-md border border-border bg-muted/40 p-4">
								<p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
									Store details
								</p>

								<div className="space-y-2">
									<Label htmlFor={storeNameId}>Store name</Label>
									<Input
										id={storeNameId}
										type="text"
										aria-invalid={Boolean(errors.store_name)}
										{...register("store_name", {
											required: true,
											minLength: 3,
										})}
									/>
									{errors.store_name ? (
										<p className="text-xs text-destructive">
											Store name is required and should be at least 3
											characters.
										</p>
									) : null}
								</div>

								<div className="space-y-2">
									<Label htmlFor={storePhoneId}>Store phone</Label>
									<Input
										id={storePhoneId}
										type="tel"
										placeholder="+90…"
										aria-invalid={Boolean(errors.store_phone)}
										{...register("store_phone", {
											required: true,
											pattern: /^\+90\d{10}$/,
										})}
									/>
									{errors.store_phone ? (
										<p className="text-xs text-destructive">
											A valid Türkiye phone number is required.
										</p>
									) : null}
								</div>

								<div className="space-y-2">
									<Label htmlFor={storeTaxId}>Store tax ID</Label>
									<Input
										id={storeTaxId}
										type="text"
										placeholder="TXXXXVXXXXXX"
										aria-invalid={Boolean(errors.store_tax_no)}
										{...register("store_tax_no", {
											required: true,
											pattern: /^T\d{4}V\d{6}$/,
										})}
									/>
									{errors.store_tax_no ? (
										<p className="text-xs text-destructive">
											Tax ID must match the pattern TXXXXVXXXXXX.
										</p>
									) : null}
								</div>

								<div className="space-y-2">
									<Label htmlFor={storeBankId}>Store bank account (IBAN)</Label>
									<Input
										id={storeBankId}
										type="text"
										placeholder="TR…"
										aria-invalid={Boolean(errors.store_bank_account)}
										{...register("store_bank_account", {
											required: true,
											validate: (value) =>
												isValidIBAN(value ?? "") || "Invalid IBAN address",
										})}
									/>
									{errors.store_bank_account ? (
										<p className="text-xs text-destructive">
											{errors.store_bank_account.message ??
												"A valid IBAN is required."}
										</p>
									) : null}
								</div>
							</div>
						) : null}

						<Button
							type="submit"
							size="lg"
							disabled={isSubmitting}
							className="w-full"
						>
							{isSubmitting ? (
								<>
									<Spinner size={18} className="text-primary-foreground" />
									Creating account…
								</>
							) : (
								"Sign up"
							)}
						</Button>

						<p className="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-medium text-primary underline-offset-4 hover:underline"
							>
								Sign in
							</Link>
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUpContent;
