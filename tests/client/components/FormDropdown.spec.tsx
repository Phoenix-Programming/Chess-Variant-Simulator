import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormDropdown } from "../../../src/client/components/FormDropdown";

describe("FormDropdown component", () => {
	const options = [
		{ label: "Option 1", value: "opt1" },
		{ label: "Option 2", value: "opt2", disabled: true },
		{ label: "Option 3", value: "opt3" }
	];

	it("Renders with default properties", () => {
		const label: string = "Test Label";

		render(<FormDropdown options={options} label={label} />);

		const dropdown: HTMLElement = screen.getByText(label);
		const combobox: HTMLElement = screen.getByRole("combobox");

		expect(dropdown).toBeInTheDocument();
		expect(combobox).toBeInTheDocument();
		expect(combobox.closest(".form-group")).toBeInTheDocument();
		expect(dropdown).toHaveClass("form-label");
		expect(combobox).toHaveAttribute("data-required", "false");
	});

	it("Renders without FormGroup wrapper when no label provided", () => {
		render(<FormDropdown options={options} />);

		const combobox: HTMLElement = screen.getByRole("combobox");

		expect(combobox).toBeInTheDocument();
		expect(combobox.closest(".form-group")).not.toBeInTheDocument();
	});

	it("Applies required styling and attributes", () => {
		const label: string = "Required Field";

		render(<FormDropdown options={options} label={label} required />);

		expect(screen.getByText(label)).toHaveClass("form-label", "required");
		expect(screen.getByRole("combobox")).toHaveAttribute("data-required", "true");
	});

	it("Passes through dropdown props correctly", () => {
		const handleChange = vi.fn();
		const value: string = options[0].value;
		const className: string = "custom-class";
		const id: string = "test-dropdown";

		render(
			<FormDropdown
				options={options}
				label="Test Dropdown"
				value={value}
				className={className}
				onChange={handleChange}
				data-testid={id}
				disabled
			/>
		);

		const dropdown: HTMLElement = screen.getByRole("combobox");

		expect(dropdown).toHaveValue(value);
		expect(dropdown).toBeDisabled();
		expect(dropdown).toHaveClass(className);
		expect(dropdown).toHaveAttribute("data-testid", id);
	});

	it("Renders all options with correct properties", () => {
		render(<FormDropdown options={options} label="Test Options" />);

		const option1: HTMLElement = screen.getByRole("option", { name: options[0].label });
		expect(option1).toHaveValue(options[0].value);
		expect(option1).not.toBeDisabled();

		const option2: HTMLElement = screen.getByRole("option", { name: options[1].label });
		expect(option2).toHaveValue(options[1].value);
		expect(option2).toBeDisabled();

		const option3: HTMLElement = screen.getByRole("option", { name: options[2].label });
		expect(option3).toHaveValue(options[2].value);
		expect(option3).not.toBeDisabled();
	});

	it("Handles onChange events", () => {
		const value: string = options[2].value;
		const handleChange = vi.fn();

		render(<FormDropdown options={options} onChange={handleChange} />);

		fireEvent.change(screen.getByRole("combobox"), { target: { value: value } });

		expect(handleChange).toHaveBeenCalledWith(value);
		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});
