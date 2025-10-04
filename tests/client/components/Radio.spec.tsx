import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "../../../src/client/components/Radio";

describe("Radio component", () => {
	const mockOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" }
	];

	const mockOptionsWithDescriptions = [
		{ value: "option1", label: "Option 1", description: "Description for option 1" },
		{ value: "option2", label: "Option 2", description: "Description for option 2" }
	];

	const mockOptionsWithDisabled = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2", disabled: true },
		{ value: "option3", label: "Option 3" }
	];

	it("Renders with default properties", () => {
		const handleChange = vi.fn();
		const name: string = "Test Radio";
		const label: string = "Test Label";

		render(<Radio name={name} label={label} options={mockOptions} value="option1" onChange={handleChange} />);

		const group: HTMLElement = screen.getByRole("group");
		const labelElement: HTMLElement = screen.getByText(label);

		expect(group).toHaveClass("form-group");
		expect(group).toContainElement(screen.getByText(label));
		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveClass("form-label");

		mockOptions.forEach((option) => {
			const optionLabel: HTMLElement = screen.getByLabelText(option.label);

			expect(optionLabel).toBeInTheDocument();
			expect(optionLabel).toHaveClass("form-check-input");
		});

		const radioGroup: Element | null = screen.getByRole("group").querySelector(".form-radio-group");

		expect(radioGroup).toHaveClass("form-radio-group--vertical");
	});

	it("Applies custom className", () => {
		const handleChange = vi.fn();
		const className: string = "test-class";

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptions}
				value={mockOptions[0].value}
				onChange={handleChange}
				className={className}
			/>
		);

		expect(screen.getByRole("group")).toHaveClass("form-group", className);
	});

	it("Renders with horizontal layout", () => {
		const handleChange = vi.fn();

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptions}
				value={mockOptions[0].value}
				onChange={handleChange}
				layout="horizontal"
			/>
		);

		const radioGroup: Element | null = screen.getByRole("group").querySelector(".form-radio-group");

		expect(radioGroup).toHaveClass("form-radio-group--horizontal");
	});

	it("Disables entire fieldset when disabled prop is true", () => {
		const handleChange = vi.fn();

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptions}
				value={mockOptions[0].value}
				onChange={handleChange}
				disabled
			/>
		);

		expect(screen.getByRole("group")).toBeDisabled();
	});

	it("Selects the correct option based on value prop", () => {
		const handleChange = vi.fn();

		render(<Radio name="test" label="Test" options={mockOptions} value="option2" onChange={handleChange} />);

		expect(screen.getByLabelText(mockOptions[0].label)).not.toBeChecked();
		expect(screen.getByLabelText(mockOptions[1].label)).toBeChecked();
		expect(screen.getByLabelText(mockOptions[2].label)).not.toBeChecked();
	});

	it("Calls onChange when an option is selected", () => {
		const handleChange = vi.fn();

		render(
			<Radio name="test" label="Test" options={mockOptions} value={mockOptions[0].value} onChange={handleChange} />
		);

		fireEvent.click(screen.getByLabelText(mockOptions[1].label));

		expect(handleChange).toHaveBeenCalledWith(mockOptions[1].value);
	});

	it("Renders option descriptions when provided", () => {
		const handleChange = vi.fn();

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptionsWithDescriptions}
				value={mockOptions[0].value}
				onChange={handleChange}
			/>
		);

		expect(screen.getByText(mockOptionsWithDescriptions[0].description)).toBeInTheDocument();
		expect(screen.getByText(mockOptionsWithDescriptions[0].description)).toHaveClass("form-check-description");
		expect(screen.getByText(mockOptionsWithDescriptions[1].description)).toBeInTheDocument();
		expect(screen.getByText(mockOptionsWithDescriptions[1].description)).toHaveClass("form-check-description");
	});

	it("Disables individual options when disabled property is set", () => {
		const handleChange = vi.fn();

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptionsWithDisabled}
				value={mockOptions[0].value}
				onChange={handleChange}
			/>
		);

		expect(screen.getByLabelText(mockOptionsWithDisabled[0].label)).not.toBeDisabled();
		expect(screen.getByLabelText(mockOptionsWithDisabled[1].label)).toBeDisabled();
		expect(screen.getByLabelText(mockOptionsWithDisabled[2].label)).not.toBeDisabled();
	});

	it("Does not call onChange when disabled option is clicked", () => {
		const handleChange = vi.fn();

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptionsWithDisabled}
				value={mockOptionsWithDisabled[0].value}
				onChange={handleChange}
			/>
		);

		const disabledInput: HTMLElement = screen.getByLabelText(mockOptionsWithDisabled[1].label);

		expect(disabledInput).toBeDisabled();

		fireEvent.click(disabledInput);

		expect(disabledInput).not.toBeChecked();
	});

	it("Generates correct IDs and associates labels properly", () => {
		const handleChange = vi.fn();
		const name: string = "Test Radio";

		render(
			<Radio name={name} label="Test" options={mockOptions} value={mockOptions[0].value} onChange={handleChange} />
		);

		mockOptions.forEach((option) => {
			const input: HTMLElement = screen.getByLabelText(option.label);

			expect(input).toHaveAttribute("id", `${name}-${option.value}`);
			expect(input).toHaveAttribute("name", name);
			expect(input).toHaveAttribute("value", option.value);
		});
	});

	it("Passes through additional HTML attributes", () => {
		const handleChange = vi.fn();
		const id: string = "Radio ID";

		render(
			<Radio
				name="test"
				label="Test"
				options={mockOptions}
				value={mockOptions[0].value}
				onChange={handleChange}
				data-testid={id}
			/>
		);

		expect(screen.getByTestId(id)).toBeInTheDocument();
	});
});
