import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "../../../src/client/components/Progress";

describe("Progress component", () => {
	it("Renders with default properties", () => {
		render(<Progress />);

		const progressContainer: HTMLElement | null = document.querySelector(".progress");
		const progressBar: HTMLElement | null | undefined = progressContainer?.querySelector(".progress-bar");

		expect(progressContainer).toHaveClass("progress", "progress--sm");
		expect(progressBar).toHaveClass("progress-bar", "progress--primary");
		expect(progressBar).toHaveStyle({ width: "0%" });
	});

	it("Applies custom variant and size", () => {
		render(<Progress variant="danger" size="lg" />);

		const progressContainer: Element | null = document.querySelector(".progress");
		const progressBar: Element | null | undefined = progressContainer?.querySelector(".progress-bar");

		expect(progressContainer).toHaveClass("progress--lg");
		expect(progressBar).toHaveClass("progress--danger");
	});

	it("Applies custom className", () => {
		const className: string = "test-class";

		render(<Progress className={className} />);

		const progressContainer = document.querySelector(".progress");

		expect(progressContainer).toHaveClass(className);
	});

	it("Applies striped type correctly", () => {
		render(<Progress type="striped" />);

		const progressBar = document.querySelector(".progress-bar");

		expect(progressBar).toHaveClass("progress--striped");
	});

	it("Calculates percentage correctly with custom value and max", () => {
		render(<Progress value={25} max={50} />);

		const progressBar = document.querySelector(".progress-bar");

		expect(progressBar).toHaveStyle({ width: "50%" });
	});

	it("Handles value of 0 correctly", () => {
		render(<Progress value={0} max={100} />);

		const progressBar = document.querySelector(".progress-bar");
		
		expect(progressBar).toHaveStyle({ width: "0%" });
	});

	it("Caps percentage at 100% when value exceeds max", () => {
		render(<Progress value={150} max={100} />);

		const progressBar = document.querySelector(".progress-bar");

		expect(progressBar).toHaveStyle({ width: "100%" });
	});

	it("Handles negative values by setting to 0%", () => {
		render(<Progress value={-10} max={100} />);

		const progressBar: Element | null = document.querySelector(".progress-bar");

		expect(progressBar).toHaveStyle({ width: "0%" });
	});

	it("Applies all variant options correctly", () => {
		const variants = ["primary", "secondary", "success", "warning", "danger"] as const;

		variants.forEach((variant) => {
			const { unmount }: RenderResult = render(<Progress variant={variant} />);

			const progressBar: Element | null = document.querySelector(".progress-bar");

			expect(progressBar).toHaveClass(`progress--${variant}`);

			unmount();
		});
	});

	it("Applies both size options correctly", () => {
		const sizes = ["sm", "lg"] as const;

		sizes.forEach((size) => {
			const { unmount }: RenderResult = render(<Progress size={size} />);

			const progressContainer: Element | null = document.querySelector(".progress");

			expect(progressContainer).toHaveClass(`progress--${size}`);

			unmount();
		});
	});

	it("Passes through additional HTML attributes", () => {
		const testId: string = "test-custom";
		const title: string = "Custom Progress Bar";

		render(<Progress data-testid={testId} title={title} />);

		const progressContainer: HTMLElement = screen.getByTestId(testId);

		expect(progressContainer).toHaveAttribute("title", title);
	});

	it("Does not apply striped class for solid type", () => {
		render(<Progress type="solid" />);

		const progressBar: Element | null = document.querySelector(".progress-bar");

		expect(progressBar).not.toHaveClass("progress--striped");
		expect(progressBar).not.toHaveClass("progress--solid");
	});
});
