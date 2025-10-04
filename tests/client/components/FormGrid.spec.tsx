import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormGrid, FormCol, FormColAuto } from "../../../src/client/components/FormGrid";

describe("FormGrid components", () => {
	describe("FormGrid component", () => {
		it("Renders with default properties", () => {
			const text: string = "Test text";

			render(<FormGrid>{text}</FormGrid>);

			expect(screen.queryByText(text)).toBeInTheDocument();
			expect(screen.getByText(text)).toHaveClass("form-grid");
		});

		it("Applies className", () => {
			const text: string = "Test text";
			const className: string = "class-test";

			render(<FormGrid className={className}>{text}</FormGrid>);

			expect(screen.getByText(text)).toHaveClass(className);
		});
	});

	describe("FormCol component", () => {
		it("Renders with default properties", () => {
			const text: string = "Test text";

			render(<FormCol>{text}</FormCol>);

			expect(screen.queryByText(text)).toBeInTheDocument();
			expect(screen.getByText(text)).toHaveClass("form-col");
		});

		it("Applies className", () => {
			const text: string = "Test text";
			const className: string = "class-test";

			render(<FormCol className={className}>{text}</FormCol>);

			expect(screen.getByText(text)).toHaveClass(className);
		});
	});

	describe("FormColAuto component", () => {
		it("Renders with default properties", () => {
			const text: string = "Test text";

			render(<FormColAuto>{text}</FormColAuto>);

			expect(screen.queryByText(text)).toBeInTheDocument();
			expect(screen.getByText(text)).toHaveClass("form-col-auto");
		});

		it("Applies className", () => {
			const text: string = "Test text";
			const className: string = "class-test";

			render(<FormColAuto className={className}>{text}</FormColAuto>);

			expect(screen.getByText(text)).toHaveClass(className);
		});
	});
});
