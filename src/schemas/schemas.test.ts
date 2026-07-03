import { describe, expect, it } from "vitest";
import { addressSchema } from "./address";
import { loginSchema } from "./auth";
import { cardSchema } from "./card";

describe("loginSchema", () => {
	it("accepts a valid login", () => {
		expect(
			loginSchema.safeParse({ email: "a@b.com", password: "secret1" }).success,
		).toBe(true);
	});

	it("rejects an invalid email", () => {
		expect(
			loginSchema.safeParse({ email: "nope", password: "secret1" }).success,
		).toBe(false);
	});

	it("rejects a password shorter than 6 characters", () => {
		expect(
			loginSchema.safeParse({ email: "a@b.com", password: "123" }).success,
		).toBe(false);
	});
});

describe("cardSchema", () => {
	const base = {
		name_on_card: "A B",
		expire_month: "01",
		expire_year: "2030",
	};

	it("accepts a 16-digit card number", () => {
		expect(
			cardSchema.safeParse({ ...base, card_no: "1234123412341234" }).success,
		).toBe(true);
	});

	it("rejects a card number that is not 16 digits", () => {
		expect(cardSchema.safeParse({ ...base, card_no: "123" }).success).toBe(
			false,
		);
	});
});

describe("addressSchema", () => {
	const base = {
		title: "Home",
		name: "A",
		surname: "B",
		city: "istanbul",
		district: "X",
		neighborhood: "Y",
		address: "Z",
	};

	it("accepts a valid Turkish phone number", () => {
		expect(
			addressSchema.safeParse({ ...base, phone: "05321234567" }).success,
		).toBe(true);
	});

	it("rejects an invalid phone number", () => {
		expect(addressSchema.safeParse({ ...base, phone: "123" }).success).toBe(
			false,
		);
	});
});
