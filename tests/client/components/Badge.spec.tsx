import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../../../src/client/components/Badge";

describe("Badge component", () => {
	it("Renders with default properties", () => {
		const text: string = "Test Text";

		render(<Badge text={text} />);

		expect(screen.queryByText(text)).toBeInTheDocument();
		expect(screen.getByText(text)).toHaveClass("badge", "badge--solid", "badge--primary");
	});

	it("Applies custom type, variant, and className", () => {
		const text: string = "Test Text";
		const className: string = "test-class"

		render(<Badge text={text} type="outline" variant="danger" className="test-class" />);

		expect(screen.getByText(text)).toHaveClass("badge--outline", "badge--danger", className);
	});
});
