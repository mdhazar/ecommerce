import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
	it("renders its children", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: "Click me" }),
		).toBeInTheDocument();
	});

	it("applies variant and size classes", () => {
		render(
			<Button variant="destructive" size="lg">
				Delete
			</Button>,
		);
		const button = screen.getByRole("button", { name: "Delete" });
		expect(button).toHaveClass("bg-destructive");
		expect(button).toHaveClass("h-11");
	});

	it("fires onClick when pressed", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Go</Button>);
		await userEvent.click(screen.getByRole("button", { name: "Go" }));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it("renders as a child element when asChild is set", () => {
		render(
			<Button asChild>
				<a href="/shop">Shop</a>
			</Button>,
		);
		const link = screen.getByRole("link", { name: "Shop" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveClass("inline-flex");
	});
});
