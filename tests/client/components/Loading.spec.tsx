import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loading } from "../../../src/client/components/Loading";

describe("Loading component", () => {
	it("Renders with default properties", () => {
		const id: string = "Test ID";

		render(<Loading data-testid={id} />);

		expect(screen.queryByTestId(id)).toBeInTheDocument();
		expect(screen.getByTestId(id)).toHaveClass("spinner", "spinner--sm");
		expect(screen.getByTestId(id).closest("div.loading-overlay")).toBeNull();
	});

	it("Applies custom size, overlay, and className", () => {
		const id: string = "Test ID";
		const className: string = "test-class";

		render(<Loading data-testid={id} overlay="fullscreen" size="xl" className={className} />);

		const spinner: HTMLElement = screen.getByTestId(id);
		const overlay: Element | null = spinner.closest("div.loading-overlay");

		expect(spinner).toHaveClass("spinner--xl", className);
		expect(overlay).toBeInTheDocument();
		expect(overlay).toHaveClass("loading-fullscreen");
	});
});
