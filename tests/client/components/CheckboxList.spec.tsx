import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CheckboxList } from "../../../src/client/components/CheckboxList";

describe("CheckboxList component", () => {
	const options = [
		{ id: "opt1", label: "Option 1" },
		{ id: "opt2", label: "Option 2", description: "Extra info" },
		{ id: "opt3", label: "Option 3", disabled: true }
	];

	const defaultProps = {
		name: "test-checkbox",
		legend: "Test Legend",
		options,
		values: [],
		onChange: vi.fn()
	};

	it("Renders with default properties", () => {
		const legend: string = "Test Checkbox List";
		const name: string = "test-name";

		render(<CheckboxList {...defaultProps} name={name} legend={legend} />);

		expect(screen.getByText(legend)).toBeInTheDocument();
		expect(screen.getByRole("group")).toHaveClass("checkbox-list", "checkbox-list--vertical");
		expect(screen.getByText(options[0].label)).toBeInTheDocument();
		expect(screen.getByText(options[1].label)).toBeInTheDocument();
		expect(screen.getByText(options[1].description as string)).toBeInTheDocument();
		expect(screen.getByText(options[2].label)).toBeInTheDocument();
	});

	it("Applies custom layout and className", () => {
		const className: string = "custom-class";

		render(<CheckboxList {...defaultProps} layout="horizontal" className={className} />);

		expect(screen.getByRole("group")).toHaveClass("checkbox-list--horizontal", className);
	});

	it("Renders checkboxes with correct ids and labels", () => {
		render(<CheckboxList {...defaultProps} />);

		const checkbox1: HTMLElement = screen.getByRole("checkbox", { name: options[0].label });
		const checkbox2: HTMLElement = screen.getByRole("checkbox", { name: options[1].label });
		const checkbox3: HTMLElement = screen.getByRole("checkbox", { name: options[2].label });

		expect(checkbox1).toHaveAttribute("id", `${defaultProps.name}-opt1`);
		expect(checkbox2).toHaveAttribute("id", `${defaultProps.name}-opt2`);
		expect(checkbox3).toHaveAttribute("id", `${defaultProps.name}-opt3`);
	});

	it("Shows checked state for selected values", () => {
		const values: string[] = [options[0].id, options[2].id];

		render(<CheckboxList {...defaultProps} values={values} />);

		expect(screen.getByRole("checkbox", { name: options[0].label })).toBeChecked();
		expect(screen.getByRole("checkbox", { name: options[1].label })).not.toBeChecked();
		expect(screen.getByRole("checkbox", { name: options[2].label })).toBeChecked();
	});

	it("Disables fieldset when disabled prop is true", () => {
		render(<CheckboxList {...defaultProps} disabled={true} />);

		expect(screen.getByRole("group")).toBeDisabled();
	});

	it("Disables individual checkbox when option is disabled", () => {
		render(<CheckboxList {...defaultProps} />);

		expect(screen.getByRole("checkbox", { name: options[0].label })).not.toBeDisabled();
		expect(screen.getByRole("checkbox", { name: options[1].label })).not.toBeDisabled();
		expect(screen.getByRole("checkbox", { name: options[2].label })).toBeDisabled();
	});

	it("Calls onChange when checkbox is checked", () => {
		const handleChange = vi.fn();

		render(<CheckboxList {...defaultProps} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("checkbox", { name: options[0].label }));

		expect(handleChange).toHaveBeenCalledWith([options[0].id]);
	});

	it("Calls onChange when checkbox is unchecked", () => {
		const handleChange = vi.fn();
		const values: string[] = [options[0].id, options[1].id];

		render(<CheckboxList {...defaultProps} values={values} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("checkbox", { name: options[0].label }));

		expect(handleChange).toHaveBeenCalledWith([values[1]]);
	});

	it("Adds to existing values when checking new checkbox", () => {
		const handleChange = vi.fn();
		const values: string[] = [options[0].id];

		render(<CheckboxList {...defaultProps} values={values} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("checkbox", { name: options[1].label }));

		expect(handleChange).toHaveBeenCalledWith([values[0], options[1].id]);
	});

	it("Renders descriptions when provided", () => {
		render(<CheckboxList {...defaultProps} />);

		const extraInfo: HTMLElement = screen.getByText("Extra info");

		expect(extraInfo).toBeInTheDocument();
		expect(extraInfo).toHaveClass("form-check-description");
	});

	it("Does not render descriptions when not provided", () => {
		const optionsWithoutDescription = [{ id: "opt1", label: "Option 1" }];

		render(<CheckboxList {...defaultProps} options={optionsWithoutDescription} />);

		expect(screen.queryByText("Extra info")).not.toBeInTheDocument();
	});

	it("Handles grid layout", () => {
		render(<CheckboxList {...defaultProps} layout="grid" />);

		expect(screen.getByRole("group")).toHaveClass("checkbox-list--grid");
	});
});
