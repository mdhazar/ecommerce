import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Check, MapPin, Plus } from "lucide-react";
import type React from "react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/api/api";
import {
	Button,
	Container,
	Input,
	Label,
	PageHeader,
	Section,
	Spinner,
	Textarea,
} from "@/components/ui/common";
import OrderSummary from "@/components/ui/PaymentPage/OrderSummary";
import { cn } from "@/lib/utils";
import { type AddressFormData, addressSchema } from "@/schemas/address";
import { useCartStore } from "@/stores/cart-store";
import type { Address } from "@/types/models";

const CheckoutSteps: React.FC<{ current: 1 | 2 | 3 }> = ({ current }) => {
	const steps = ["Address", "Payment", "Confirmation"];
	return (
		<ol className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-sm">
			{steps.map((label, index) => {
				const step = index + 1;
				const done = step < current;
				const active = step === current;
				return (
					<li key={label} className="flex items-center gap-2">
						<span
							className={cn(
								"flex size-7 items-center justify-center rounded-full border text-xs font-medium",
								active && "border-primary bg-primary text-primary-foreground",
								done && "border-primary bg-primary/10 text-primary",
								!active && !done && "border-border text-muted-foreground",
							)}
						>
							{done ? <Check className="size-4" aria-hidden="true" /> : step}
						</span>
						<span
							className={cn(
								"font-sans uppercase tracking-[0.15em]",
								active ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{label}
						</span>
						{step < steps.length ? (
							<span className="mx-1 hidden h-px w-8 bg-border sm:block" />
						) : null}
					</li>
				);
			})}
		</ol>
	);
};

interface AddressFormProps {
	onSubmit: (data: AddressFormData) => void;
	initialData?: Address | null;
	onCancel: () => void;
	isSubmitting?: boolean;
}

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
	message ? <p className="mt-1.5 text-sm text-destructive">{message}</p> : null;

const AddressForm: React.FC<AddressFormProps> = ({
	onSubmit,
	initialData = null,
	onCancel,
	isSubmitting = false,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddressFormData>({
		resolver: zodResolver(addressSchema),
		defaultValues: initialData ?? undefined,
	});

	const titleId = useId();
	const nameId = useId();
	const surnameId = useId();
	const phoneId = useId();
	const cityId = useId();
	const districtId = useId();
	const neighborhoodId = useId();
	const addressId = useId();

	useEffect(() => {
		if (initialData) reset(initialData);
	}, [initialData, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			<div>
				<Label htmlFor={titleId}>Address label</Label>
				<Input
					id={titleId}
					placeholder="Home, Work…"
					aria-invalid={errors.title ? true : undefined}
					className="mt-1.5"
					{...register("title")}
				/>
				<FieldError message={errors.title?.message} />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<Label htmlFor={nameId}>First name</Label>
					<Input
						id={nameId}
						autoComplete="given-name"
						aria-invalid={errors.name ? true : undefined}
						className="mt-1.5"
						{...register("name")}
					/>
					<FieldError message={errors.name?.message} />
				</div>
				<div>
					<Label htmlFor={surnameId}>Last name</Label>
					<Input
						id={surnameId}
						autoComplete="family-name"
						aria-invalid={errors.surname ? true : undefined}
						className="mt-1.5"
						{...register("surname")}
					/>
					<FieldError message={errors.surname?.message} />
				</div>
			</div>

			<div>
				<Label htmlFor={phoneId}>Phone</Label>
				<Input
					id={phoneId}
					type="tel"
					autoComplete="tel"
					placeholder="+1 555 123 4567"
					aria-invalid={errors.phone ? true : undefined}
					className="mt-1.5"
					{...register("phone")}
				/>
				<FieldError message={errors.phone?.message} />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<Label htmlFor={cityId}>City</Label>
					<Input
						id={cityId}
						autoComplete="address-level2"
						aria-invalid={errors.city ? true : undefined}
						className="mt-1.5"
						{...register("city")}
					/>
					<FieldError message={errors.city?.message} />
				</div>
				<div>
					<Label htmlFor={districtId}>District / State</Label>
					<Input
						id={districtId}
						autoComplete="address-level1"
						aria-invalid={errors.district ? true : undefined}
						className="mt-1.5"
						{...register("district")}
					/>
					<FieldError message={errors.district?.message} />
				</div>
			</div>

			<div>
				<Label htmlFor={neighborhoodId}>Neighborhood</Label>
				<Input
					id={neighborhoodId}
					aria-invalid={errors.neighborhood ? true : undefined}
					className="mt-1.5"
					{...register("neighborhood")}
				/>
				<FieldError message={errors.neighborhood?.message} />
			</div>

			<div>
				<Label htmlFor={addressId}>Street address</Label>
				<Textarea
					id={addressId}
					rows={3}
					placeholder="Street, building, apartment…"
					aria-invalid={errors.address ? true : undefined}
					className="mt-1.5"
					{...register("address")}
				/>
				<FieldError message={errors.address?.message} />
			</div>

			<div className="flex justify-end gap-3">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{initialData ? "Update address" : "Save address"}
				</Button>
			</div>
		</form>
	);
};

interface AddressCardProps {
	address: Address;
	shippingSelected: boolean;
	billingSelected: boolean;
	billingEnabled: boolean;
	onSelectShipping: () => void;
	onSelectBilling: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
	address,
	shippingSelected,
	billingSelected,
	billingEnabled,
	onSelectShipping,
	onSelectBilling,
	onEdit,
	onDelete,
}) => (
	<div
		className={cn(
			"rounded-lg border bg-card p-5 text-card-foreground shadow-xs transition-colors",
			shippingSelected
				? "border-primary ring-2 ring-primary/30"
				: "border-border",
		)}
	>
		<div className="flex items-start justify-between gap-3">
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-primary" aria-hidden="true" />
				<h3 className="font-medium text-foreground">{address.title}</h3>
			</div>
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="sm" onClick={onEdit}>
					Edit
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className="text-destructive hover:text-destructive"
					onClick={onDelete}
				>
					Delete
				</Button>
			</div>
		</div>

		<div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
			<p className="font-medium text-foreground">
				{address.name} {address.surname}
			</p>
			<p>{address.phone}</p>
			<p>
				{address.address}, {address.neighborhood}
			</p>
			<p>
				{address.district}, {address.city}
			</p>
		</div>

		<div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4 text-sm">
			<label className="flex cursor-pointer items-center gap-2">
				<input
					type="radio"
					name="shippingAddress"
					checked={shippingSelected}
					onChange={onSelectShipping}
					className="size-4 accent-[var(--color-primary)]"
				/>
				<span className="text-foreground">Ship here</span>
			</label>
			{billingEnabled ? (
				<label className="flex cursor-pointer items-center gap-2">
					<input
						type="radio"
						name="billingAddress"
						checked={billingSelected}
						onChange={onSelectBilling}
						className="size-4 accent-[var(--color-primary)]"
					/>
					<span className="text-foreground">Bill here</span>
				</label>
			) : null}
		</div>
	</div>
);

const OrderPageContent: React.FC = () => {
	const setAddress = useCartStore((state) => state.setAddress);
	const cart = useCartStore((state) => state.cart);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [showForm, setShowForm] = useState(false);
	const [editing, setEditing] = useState<Address | null>(null);
	const [shippingId, setShippingId] = useState<number | null>(null);
	const [billingId, setBillingId] = useState<number | null>(null);
	const [billingSame, setBillingSame] = useState(true);

	const { data: addresses = [], isLoading } = useQuery({
		queryKey: ["addresses"],
		queryFn: async () => (await api.get<Address[]>("/user/address")).data,
	});

	const invalidate = () =>
		queryClient.invalidateQueries({ queryKey: ["addresses"] });

	const saveAddress = useMutation({
		mutationFn: async (data: AddressFormData) => {
			if (editing?.id) {
				await api.put("/user/address", { ...data, id: editing.id });
			} else {
				await api.post("/user/address", data);
			}
		},
		onSuccess: async () => {
			toast.success(editing ? "Address updated" : "Address saved");
			await invalidate();
			setShowForm(false);
			setEditing(null);
		},
		onError: () => toast.error("We couldn't save that address."),
	});

	const deleteAddress = useMutation({
		mutationFn: async (id: number) => {
			await api.delete(`/user/address/${id}`);
		},
		onSuccess: async (_data, id) => {
			toast.success("Address removed");
			if (shippingId === id) setShippingId(null);
			if (billingId === id) setBillingId(null);
			await invalidate();
		},
		onError: () => toast.error("We couldn't remove that address."),
	});

	const hasItems = cart.some((item) => item.checked !== false);

	const handleContinue = () => {
		if (!hasItems) {
			toast.error("Your cart is empty.");
			return;
		}
		const shipping = addresses.find((a) => a.id === shippingId);
		if (!shipping) {
			toast.error("Please choose a shipping address.");
			return;
		}
		const billing = billingSame
			? shipping
			: addresses.find((a) => a.id === billingId);
		if (!billing) {
			toast.error("Please choose a billing address.");
			return;
		}
		setAddress({ shipping, billing });
		navigate({ to: "/payment" });
	};

	const continueDisabled =
		!hasItems || shippingId === null || (!billingSame && billingId === null);

	return (
		<Container>
			<Section>
				<PageHeader
					eyebrow="Checkout"
					title="Where should we send it?"
					description="Choose a delivery address, or add a new one. You can use a separate billing address if you'd like."
				/>
				<CheckoutSteps current={1} />

				<div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold tracking-tight">
								Delivery addresses
							</h2>
							{!showForm ? (
								<Button
									variant="outline"
									onClick={() => {
										setEditing(null);
										setShowForm(true);
									}}
								>
									<Plus className="size-4" aria-hidden="true" />
									Add address
								</Button>
							) : null}
						</div>

						{showForm ? (
							<div className="rounded-lg border border-border bg-card p-6 shadow-xs">
								<h3 className="mb-5 text-lg font-medium">
									{editing ? "Edit address" : "Add a new address"}
								</h3>
								<AddressForm
									onSubmit={(data) => saveAddress.mutate(data)}
									initialData={editing}
									isSubmitting={saveAddress.isPending}
									onCancel={() => {
										setShowForm(false);
										setEditing(null);
									}}
								/>
							</div>
						) : isLoading ? (
							<div className="flex justify-center py-12">
								<Spinner />
							</div>
						) : addresses.length === 0 ? (
							<div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
								<span className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
									<MapPin className="size-6" aria-hidden="true" />
								</span>
								<p className="font-medium text-foreground">
									No addresses saved yet
								</p>
								<p className="mt-1 text-sm text-muted-foreground">
									Add a delivery address to continue to payment.
								</p>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									{addresses.map((address) => (
										<AddressCard
											key={address.id}
											address={address}
											shippingSelected={shippingId === address.id}
											billingSelected={billingId === address.id}
											billingEnabled={!billingSame}
											onSelectShipping={() => setShippingId(address.id ?? null)}
											onSelectBilling={() => setBillingId(address.id ?? null)}
											onEdit={() => {
												setEditing(address);
												setShowForm(true);
											}}
											onDelete={() =>
												address.id && deleteAddress.mutate(address.id)
											}
										/>
									))}
								</div>

								<label className="flex cursor-pointer items-center gap-2 text-sm">
									<input
										type="checkbox"
										checked={billingSame}
										onChange={(event) => {
											setBillingSame(event.target.checked);
											if (event.target.checked) setBillingId(null);
										}}
										className="size-4 accent-[var(--color-primary)]"
									/>
									<span className="text-foreground">
										Billing address is the same as shipping
									</span>
								</label>
							</>
						)}
					</div>

					<div>
						<OrderSummary
							buttonText="Continue to payment"
							buttonDisabled={continueDisabled}
							onButtonClick={handleContinue}
						/>
					</div>
				</div>
			</Section>
		</Container>
	);
};

export default OrderPageContent;
