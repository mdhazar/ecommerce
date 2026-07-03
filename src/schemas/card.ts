import { z } from "zod";

export const cardSchema = z.object({
	card_no: z
		.string()
		.regex(/^[0-9]{16}$/, "Please enter a valid 16-digit card number"),
	name_on_card: z.string().min(1, "Name is required"),
	expire_month: z.string().min(1, "Month is required"),
	expire_year: z.string().min(1, "Year is required"),
});

export type CardFormData = z.infer<typeof cardSchema>;
