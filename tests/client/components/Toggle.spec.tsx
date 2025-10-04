import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "../../../src/client/components/Toggle";

describe("Toggle component", () => {
	it("Renders with default properties", () => {
		const id: string = "Test ID";
		const label: string = "Test Label";
		const handleChange = vi.fn();

		render(<Toggle id={id} label={label} checked={false} onChange={handleChange} />);

		const labelElement: HTMLElement = screen.getByText(label);
		const checkbox: HTMLElement = screen.getByRole("checkbox");

		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveClass("form-label");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
		expect(checkbox).toHaveAttribute("id", id);
		expect(screen.getByRole("button")).toHaveClass("toggle-slider");
	});

	it("Renders as checked when checked prop is true", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={true} onChange={handleChange} />);

		expect(screen.getByRole("checkbox")).toBeChecked();
	});

	it("Applies custom className", () => {
		const className: string = "toggle-class";
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={false} onChange={handleChange} className={className} />);

		expect(screen.getByRole("checkbox").parentElement).toHaveClass("toggle", className);
	});

	it("Renders without label when label is empty", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="" checked={false} onChange={handleChange} />);

		expect(screen.queryByLabelText("")).not.toBeInTheDocument();
		expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-labelledby");
	});

	it("Renders label after toggle when labelPosition is 'after'", () => {
		const label: string = "Test Label";
		const handleChange = vi.fn();

		render(<Toggle id="test" label={label} checked={false} onChange={handleChange} labelPosition="after" />);

		const labelElement: HTMLElement = screen.getByText(label);
		const toggleElement: HTMLElement | null = screen.getByRole("checkbox").parentElement;

		expect(labelElement).toBeInTheDocument();
		expect(toggleElement?.nextElementSibling).toBe(labelElement);
	});

	it("Renders label before toggle when labelPosition is 'before' (default)", () => {
		const label: string = "Test Label";
		const handleChange = vi.fn();

		render(<Toggle id="test" label={label} checked={false} onChange={handleChange} labelPosition="before" />);

		const labelElement: HTMLElement = screen.getByText(label);
		const toggleElement: HTMLElement | null = screen.getByRole("checkbox").parentElement;

		expect(labelElement).toBeInTheDocument();
		expect(labelElement.nextElementSibling).toBe(toggleElement);
	});

	it("Calls onChange when checkbox is clicked", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={false} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("checkbox"));

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it("Calls onChange when slider is clicked", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={false} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it("Calls onChange with opposite value when slider is clicked", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={true} onChange={handleChange} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleChange).toHaveBeenCalledWith(false);
	});

	it("Disables toggle when disabled prop is true", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={false} onChange={handleChange} disabled />);

		expect(screen.getByRole("checkbox")).toBeDisabled();
		expect(screen.getByRole("button")).toHaveAttribute("tabIndex", "-1");
	});

	it("Does not call onChange when disabled and slider is clicked", () => {
		const handleChange = vi.fn();

		render(<Toggle id="test" label="Test" checked={false} onChange={handleChange} disabled />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleChange).not.toHaveBeenCalled();
	});

	it("Passes through additional HTML attributes", () => {
		const handleChange = vi.fn();
		const dataTestId: string = "custom-toggle";

		render(<Toggle id="test" label="Test" checked={false} onChange={handleChange} data-testid={dataTestId} />);

		expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
	});

	it("Sets proper aria-labelledby when label is provided", () => {
		const id: string = "test-toggle";
		const label: string = "Test Label";
		const handleChange = vi.fn();

		render(<Toggle id={id} label={label} checked={false} onChange={handleChange} />);

		expect(screen.getByRole("checkbox")).toHaveAttribute("aria-labelledby", `${id}-label`);
	});
});
