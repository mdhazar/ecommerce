import { z } from "zod";

export const addressSchema = z.object({
	title: z.string().min(1, "Address label is required"),
	name: z.string().min(1, "First name is required"),
	surname: z.string().min(1, "Last name is required"),
	// Generic international phone: optional leading +, then 7–15 digits.
	phone: z
		.string()
		.regex(
			/^\+?[0-9]{7,15}$/,
			"Enter a valid phone number (7–15 digits, optional +)",
		),
	city: z.string().min(1, "City is required"),
	district: z.string().min(1, "District is required"),
	neighborhood: z.string().min(1, "Neighborhood is required"),
	address: z.string().min(1, "Street address is required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;
