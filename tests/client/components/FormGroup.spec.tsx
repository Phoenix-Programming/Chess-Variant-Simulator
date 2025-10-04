import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormGroup } from "../../../src/client/components/FormGroup";

describe("FromGroup component", () => {
	it("Renders with default properties", () => {
		const text: string = "Test text";

		render(<FormGroup>{text}</FormGroup>);

		expect(screen.queryByText(text)).toBeInTheDocument();
		expect(screen.getByText(text)).toHaveClass("form-group");
		expect(screen.getByText(text).closest("label.form-label")).not.toBeInTheDocument();
	});

	it("Applies label and className", () => {
		const label: string = "Test label";
		const text: string = "Test text";
		const className: string = "test-class";

		render(<FormGroup label={label} className={className}>{text}</FormGroup>);

		expect(screen.getByText(text)).toHaveClass(className);
		expect(screen.queryByText(label)).toBeInTheDocument();
		expect(screen.getByText(label)).toHaveClass("form-label");
	});
});
