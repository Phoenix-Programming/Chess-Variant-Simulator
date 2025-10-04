import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "../../../src/client/components/Card";

describe("Card component", () => {
	it("Renders children inside the body", () => {
		const text: string = "Test Text";

		render(<Card>{text}</Card>);

		expect(screen.queryByText(text)).toBeInTheDocument();
	});

	it("Renders with default properties", () => {
		const text: string = "Test Text";

		render(<Card>{text}</Card>);

		const card: HTMLElement | null | undefined = screen.queryByText(text)?.closest("div.card");

		expect(card).toBeInTheDocument();
		expect(card).not.toHaveClass("card--compact");
		expect(card).not.toHaveClass("card--interactive");
		expect(card).not.toHaveClass("card--default");
	});

	it("Applies variant classes", () => {
		const text: string = "Test text";

		render(<Card variant="danger">{text}</Card>);

		expect(screen.getByText(text).closest("div.card")).toHaveClass("card--danger");
	});

	it("Renders header and footer when provided", () => {
		const header: string = "Header test";
		const footer: string = "Footer test";

		render(<Card header={header} footer={footer}>""</Card>);

		expect(screen.queryByText(header)).toBeInTheDocument();
		expect(screen.queryByText(footer)).toBeInTheDocument();
		expect(screen.getByText(header)).toHaveClass("card__header");
		expect(screen.getByText(footer)).toHaveClass("card__footer");
	});

	it("Doesn't render header and footer when not provided", () => {
		render(<Card>""</Card>);

		expect(document.querySelector(".card__header")).toBeNull();
		expect(document.querySelector(".card__footer")).toBeNull();
	})

	it("Applies compact and interactive classes to header, body, and footer", () => {
		const text: string = "Test text";
		const header: string = "Header test";
		const footer: string = "Footer test";

		render(<Card compact={true} interactive={true} header={header} footer={footer}>{text}</Card>);

		expect(screen.getByText(text).closest("div.card")).toHaveClass("card--compact", "card--interactive");
		expect(screen.getByText(header)).toHaveClass("card--compact", "card--interactive");
		expect(screen.getByText(footer)).toHaveClass("card--compact", "card--interactive");
	});

	it("Forwards extra props to root div", () => {
		const id: string = "Test ID";

		render(<Card data-testid={id}>""</Card>);

		expect(screen.queryByTestId(id)).toBeInTheDocument();
	});
});
