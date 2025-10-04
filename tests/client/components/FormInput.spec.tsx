import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormInput } from "../../../src/client/components/FormInput";

describe("FormInput component", () => {
	it("Renders with default properties", () => {
		render(<FormInput />);

		const input: HTMLElement = screen.getByRole("textbox");

		expect(input).toBeInTheDocument();
		expect(input).toHaveClass("form-control");
		expect(input.parentElement).not.toHaveClass("form-control-icon");
	});

	it("Applies custom className", () => {
		const className: string = "input-class";

		render(<FormInput className={className} />);

		const input: HTMLElement = screen.getByRole("textbox");

		expect(input).toHaveClass("form-control", className);
	});

	it("Spreads input props correctly", () => {
		const placeholder: string = "Test Placeholder";
		const value: string = "Test Value";
		const name: string = "Test Name";
		const id: string = "formInput-id";
		const type: string = "email";

		render(<FormInput placeholder={placeholder} value={value} name={name} id={id} type={type} readOnly />);

		const input: HTMLElement = screen.getByRole("textbox");

		expect(input).toHaveAttribute("placeholder", placeholder);
		expect(input).toHaveValue(value);
		expect(input).toHaveAttribute("name", name);
		expect(input).toHaveAttribute("id", id);
		expect(input).toHaveAttribute("type", type);
		expect(input).toHaveAttribute("readonly");
	});

	it("Renders with icon in wrapper structure", () => {
		const iconText: string = "Test Text";

		render(<FormInput icon={<span>{iconText}</span>} />);

		const input: HTMLElement = screen.getByRole("textbox");
		const wrapper: HTMLElement | null = input.parentElement;
		const iconSpan: HTMLElement | null = screen.getByText(iconText).parentElement;

		expect(wrapper).toHaveClass("form-control-icon");
		expect(input).toHaveClass("form-control");
		expect(iconSpan).toHaveClass("form-icon");
		expect(screen.getByText(iconText)).toBeInTheDocument();
	});

	it("Applies custom className with icon", () => {
		const className: string = "custom-icon-input";

		render(<FormInput icon={<span>Icon</span>} className={className} />);

		const input: HTMLElement = screen.getByRole("textbox");

		expect(input).toHaveClass("form-control", className);
		expect(input.parentElement).toHaveClass("form-control-icon");
	});

	it("Handles different input types", () => {
		const type: string = "password";

		const { rerender }: RenderResult = render(<FormInput type={type} />);

		const passwordInput: HTMLElement = screen.getByDisplayValue("");

		expect(passwordInput).toHaveAttribute("type", type);

		rerender(<FormInput type="number" />);

		expect(screen.getByRole("spinbutton")).toBeInTheDocument();

		rerender(<FormInput type="checkbox" />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("Handles input events", () => {
		const value: string = "Test Value";

		render(<FormInput />);

		const input: HTMLElement = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: value } });

		expect(input).toHaveValue(value);
	});

	it("Renders complex icon content", () => {
		const id: string = "Test ID";

		render(
			<FormInput
				icon={
					<svg data-testid={id}>
						<path d="test" />
					</svg>
				}
			/>
		);

		const input: HTMLElement = screen.getByRole("textbox");
		const icon: HTMLElement = screen.getByTestId(id);

		expect(input.parentElement).toHaveClass("form-control-icon");
		expect(icon.parentElement).toHaveClass("form-icon");
	});
});
