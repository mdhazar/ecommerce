import { z } from "zod";

export const addressSchema = z.object({
	title: z.string().min(1, "Address title is required"),
	name: z.string().min(1, "Name is required"),
	surname: z.string().min(1, "Surname is required"),
	phone: z
		.string()
		.regex(/^05[0-9]{9}$/, "Please enter a valid Turkish phone number"),
	city: z.string().min(1, "City is required"),
	district: z.string().min(1, "District is required"),
	neighborhood: z.string().min(1, "Neighborhood is required"),
	address: z.string().min(1, "Address details are required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;
