import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Form } from "../../../src/client/components/Form";

describe("Form component", () => {
	it("Renders with default properties", () => {
		const content: string = "Test Form";

		render(<Form>{content}</Form>);

		const container: HTMLDivElement | null = screen.getByText(content).closest("div");
		const formElement: HTMLFormElement | null | undefined = container?.querySelector("form");

		expect(formElement).toBeInTheDocument();
		expect(screen.getByText(content)).toBeInTheDocument();

		const cardElement: Element | null | undefined = container?.closest(".card");

		expect(cardElement).toBeInTheDocument();
		expect(cardElement).toHaveClass("card");
	});

	it("Renders with title as header", () => {
		const title: string = "Test Form Title";

		render(<Form title={title}>Test Form</Form>);

		expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
		expect(screen.getByText(title)).toBeInTheDocument();

		const headerElement = screen.getByText(title).closest(".card__header");
		expect(headerElement).toBeInTheDocument();
	});

	it("Renders without header when no title is provided", () => {
		const content: string = "Test Form";

		render(<Form>{content}</Form>);

		expect(screen.queryByRole("heading")).not.toBeInTheDocument();

		const container = screen.getByText(content).closest("div");
		const headerElement = container?.querySelector(".card__header");

		expect(headerElement).not.toBeInTheDocument();
	});

	it("Applies custom className", () => {
		const className: string = "form-class";
		const content: string = "Test Form";

		render(<Form className={className}>{content}</Form>);

		const container: HTMLDivElement | null = screen.getByText(content).closest("div");
		const cardElement: Element | null | undefined = container?.closest(".card");

		expect(cardElement).toHaveClass(className);
	});

	it("Passes through HTML attributes", () => {
		const id: string = "test-form";
		const content: string = "Test form content";

		render(<Form data-testid={id}>{content}</Form>);

		const cardElement: HTMLElement = screen.getByTestId(id);

		expect(cardElement).toHaveAttribute("data-testid", id);
		expect(cardElement).toHaveClass("card");
	});

	it("Renders children inside form element", () => {
		const label: string = "Test Input";

		render(
			<Form>
				<label htmlFor="test-input">{label}</label>
				<input id="test-input" type="text" />
			</Form>
		);

		const labelElement: HTMLElement = screen.getByLabelText(label);
		const inputElement: HTMLElement = screen.getByRole("textbox");

		expect(labelElement).toBeInTheDocument();
		expect(inputElement).toBeInTheDocument();

		const container: HTMLDivElement | null = labelElement.closest("div");
		const formElement: HTMLFormElement | null | undefined = container?.querySelector("form");

		expect(formElement).toContainElement(labelElement);
		expect(formElement).toContainElement(inputElement);
	});

	it("Renders with both title and custom className", () => {
		const title: string = "Test Form Title";
		const className: string = "form-class";
		const content: string = "Test Form";

		render(
			<Form title={title} className={className}>
				{content}
			</Form>
		);

		expect(screen.getByText(title)).toBeInTheDocument();

		const container: HTMLDivElement | null = screen.getByText(content).closest("div");
		const cardElement: Element | null | undefined = container?.closest(".card");

		expect(cardElement).toHaveClass(className);
	});
});
