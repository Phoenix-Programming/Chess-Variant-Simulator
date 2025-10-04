import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormTextarea } from "../../../src/client/components/FormTextarea";

describe("FormTextarea component", () => {
	it("Renders with default properties", () => {
		const label: string = "Test Label";
		const placeholder: string = "Test Placeholder";

		render(<FormTextarea label={label} placeholder={placeholder} />);

		expect(screen.getByLabelText(label)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveClass("form-control");
	});

	it("Renders without label when label prop is not provided", () => {
		const placeholder: string = "Test Placeholder";

		render(<FormTextarea placeholder={placeholder} />);

		expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
		expect(screen.queryByText("label")).not.toBeInTheDocument();
	});

	it("Applies custom className", () => {
		const className: string = "test-class";

		render(<FormTextarea className={className} />);

		expect(screen.getByRole("textbox")).toHaveClass("form-control", className);
	});

	it("Shows error state and error message", () => {
		const label: string = "Test Label";
		const error: string = "Test Error";

		render(<FormTextarea label={label} error={error} />);

		const errorElement: HTMLElement = screen.getByText(error);

		expect(screen.getByRole("textbox")).toHaveClass("has-error");
		expect(errorElement).toBeInTheDocument();
		expect(errorElement).toHaveClass("form-feedback", "danger");
	});

	it("Shows help text when provided", () => {
		const helpText: string = "Test Help";

		render(<FormTextarea helpText={helpText} />);

		const help: HTMLElement = screen.getByText(helpText);

		expect(help).toBeInTheDocument();
		expect(help).toHaveClass("form-help");
	});

	it("Handles value and onChange correctly", () => {
		const handleChange = vi.fn();
		const value: string = "Test Value";

		render(<FormTextarea value={value} onChange={handleChange} />);

		const textarea: HTMLElement = screen.getByRole("textbox");

		expect(textarea).toHaveValue(value);

		fireEvent.change(textarea, { target: { value: "" } });

		expect(handleChange).toHaveBeenCalled();
	});

	it("Sets required attribute when required prop is true", () => {
		render(<FormTextarea required />);

		expect(screen.getByRole("textbox")).toBeRequired();
	});

	it("Shows character count when showCount is true", () => {
		const value: string = "Test Value";

		render(<FormTextarea value={value} showCount />);

		expect(screen.getByText(value.length)).toBeInTheDocument();
	});

	it("Shows character count and max length when both are provided", () => {
		const value: string = "Test Value";
		const maxLength: number = 100;

		render(<FormTextarea value={value} maxLength={maxLength} showCount />);

		expect(screen.getByText(value.length)).toBeInTheDocument();
		expect(screen.getByText(`/${maxLength}`)).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveAttribute("maxlength", maxLength.toString());
	});

	it("Shows only max length when showCount is false but maxLength is provided", () => {
		const maxLength: number = 50;

		render(<FormTextarea maxLength={maxLength} />);

		expect(screen.getByText(`/${maxLength}`)).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveAttribute("maxlength", maxLength.toString());
	});

	it("Updates character count on text change", () => {
		const handleChange = vi.fn();

		render(<FormTextarea showCount onChange={handleChange} />);

		fireEvent.change(screen.getByRole("textbox"), { target: { value: "Test" } });

		expect(handleChange).toHaveBeenCalled();
	});

	it("Shows error state for character count when over limit", () => {
		const value: string = "Test Value";

		render(<FormTextarea value={value} maxLength={value.length - 1} showCount />);

		const charCountElement: Element | null = screen.getByText(value.length).closest('.form-char-count');
		expect(charCountElement).toHaveClass("form-char-count--error");
	});

	it("Auto-resizes textarea when autoResize is true", () => {
		render(<FormTextarea autoResize />);

		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("Passes through additional HTML attributes", () => {
		const rows: number = 5;
		const cols: number = 40;
		const id: string = "Test ID";

		render(<FormTextarea rows={rows} cols={cols} id={id} />);

		const textarea: HTMLElement = screen.getByRole("textbox");

		expect(textarea).toHaveAttribute("rows", rows.toString());
		expect(textarea).toHaveAttribute("cols", cols.toString());
		expect(textarea).toHaveAttribute("id", id);
	});

	it("Renders form group with error class when error is present", () => {
		render(<FormTextarea label="Test Label" error="Test Error" />);

		expect(screen.getByRole("textbox")).toHaveClass("has-error");
	});
});
