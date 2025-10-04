import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Fieldset } from "../../../src/client/components/Fieldset";

describe("Fieldset component", () => {
	it("Renders with default properties", () => {
		const legend: string = "Test Legend";
		const childContent: string = "Test Content";

		render(
			<Fieldset legend={legend}>
				<div>{childContent}</div>
			</Fieldset>
		);

		const group: HTMLElement = screen.getByRole("group");
		const legendElement: HTMLElement = screen.getByText(legend);

		expect(group).toBeInTheDocument();
		expect(group).toHaveClass("fieldset");
		expect(legendElement).toBeInTheDocument();
		expect(legendElement).toHaveClass("fieldset-legend");
		expect(screen.getByText(childContent)).toBeInTheDocument();
	});

	it("Applies custom className", () => {
		const className: string = "test-class";
		const legend: string = "Test Legend";

		render(
			<Fieldset legend={legend} className={className}>
				<div>Content</div>
			</Fieldset>
		);

		expect(screen.getByRole("group")).toHaveClass("fieldset", className);
	});

	it("Passes through HTML attributes", () => {
		const legend: string = "Test Legend";
		const testId: string = "test-fieldset";
		const id: string = "fieldset-id";

		render(
			<Fieldset legend={legend} data-testid={testId} id={id}>
				<div>Content</div>
			</Fieldset>
		);

		expect(screen.getByTestId(testId)).toBeInTheDocument();
		expect(screen.getByRole("group")).toHaveAttribute("id", id);
	});

	it("Renders with disabled state", () => {
		const legend: string = "Test Legend";

		render(
			<Fieldset legend={legend} disabled>
				<div>Content</div>
			</Fieldset>
		);

		expect(screen.getByRole("group")).toBeDisabled();
	});

	it("Renders multiple children correctly", () => {
		const legend: string = "Test Legend";
		const placeholder1: string = "Input 1";
		const placeholder2: string = "Input 2";

		render(
			<Fieldset legend={legend}>
				<input type="text" placeholder={placeholder1} />
				<input type="text" placeholder={placeholder2} />
				<button>Submit</button>
			</Fieldset>
		);

		expect(screen.getByPlaceholderText(placeholder1)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(placeholder2)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
	});

	it("Renders with empty legend", () => {
		render(
			<Fieldset legend={""}>
				<div>Content</div>
			</Fieldset>
		);

		expect(screen.getByRole("group")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();

		const legendElement = screen.getByRole("group").querySelector("legend");
		expect(legendElement).toBeInTheDocument();
		expect(legendElement).toHaveClass("fieldset-legend");
	});
});
