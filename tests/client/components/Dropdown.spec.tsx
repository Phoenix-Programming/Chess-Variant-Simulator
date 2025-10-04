import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Dropdown } from "../../../src/client/components/Dropdown";

describe("Dropdown component", () => {
	const options = [
		{ label: "opt1", value: "Option 1" },
		{ label: "opt2", value: "Option 2", disabled: true }
	];

	it("Renders with default properties", () => {
		render(<Dropdown options={[]} />);

		expect(screen.queryByRole("combobox")).toBeInTheDocument();
		expect(screen.getByRole("combobox")).toHaveClass("dropdown");
		expect(screen.getByRole("combobox")).not.toHaveClass("dropdown--disabled");
		expect(screen.queryByRole("option")).not.toBeInTheDocument();
	});

	it("Applies custom options, value, disabled, and className", () => {
		const value: string = options[1].value;
		const className: string = "class-test";

		render(<Dropdown options={options} value={value} className={className} disabled={true} />);

		const select: HTMLElement = screen.getByRole("combobox");

		expect(select).toHaveClass("dropdown--disabled", className);
		expect(select).toHaveValue(value);
		expect(select).toBeDisabled();

		for (const opt of options) {
			const option: HTMLElement = screen.getByRole("option", { name: opt.label });

			expect(option).toHaveValue(opt.value);
			expect(option).toBeDisabled();
			expect(option).toHaveTextContent(opt.label);
		}
	});

	it("Calls onChange when a new option is selected", async () => {
		const handleChange = vi.fn();

		render(<Dropdown options={options} value={options[1].value} onChange={handleChange} />);

		const select = screen.getByRole("combobox");

		await act(async () => {
			fireEvent.change(select, { target: { value: options[0].value } });
		});

		expect(handleChange).toHaveBeenCalledOnce();
		expect(handleChange).toHaveBeenCalledWith(options[0].value);
	});
});
