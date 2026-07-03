import { z } from "zod";

export const cardSchema = z
	.object({
		// Accepts the display-formatted value ("1234 5678 9012 3456"); we strip
		// the grouping spaces before validating the 16 digits.
		card_no: z
			.string()
			.refine(
				(value) => /^[0-9]{16}$/.test(value.replace(/\s+/g, "")),
				"Enter a valid 16-digit card number",
			),
		name_on_card: z.string().min(1, "Name on card is required"),
		expire_month: z.string().min(1, "Month is required"),
		expire_year: z.string().min(1, "Year is required"),
		cvv: z.string().regex(/^[0-9]{3,4}$/, "Enter the 3–4 digit security code"),
	})
	.refine(
		(data) => {
			const month = Number(data.expire_month);
			const year = Number(data.expire_year);
			if (!month || !year) return true;
			const now = new Date();
			// A month already past within the current year is invalid.
			return (
				year > now.getFullYear() ||
				(year === now.getFullYear() && month >= now.getMonth() + 1)
			);
		},
		{ path: ["expire_month"], message: "This card has already expired" },
	);

export type CardFormData = z.infer<typeof cardSchema>;

/** Format raw card digits into groups of four: "1234 5678 9012 3456". */
export function formatCardNumber(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 16);
	return digits.replace(/(.{4})/g, "$1 ").trim();
}
