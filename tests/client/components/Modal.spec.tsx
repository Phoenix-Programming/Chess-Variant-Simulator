import React from "react";
import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "../../../src/client/components/Modal";

describe("Modal component", () => {
	const defaultProps = {
		id: "Test ID",
		title: "Test Title",
		children: "Modal Content"
	};

	it("Renders with default properties", () => {
		render(<Modal {...defaultProps} />);

		const dialog: HTMLElement = screen.getByRole("dialog");

		const title: HTMLElement = screen.getByText(defaultProps.title);

		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveClass("modal");
		expect(dialog).toHaveAttribute("id", defaultProps.id);
		expect(dialog).toHaveAttribute("aria-modal", "true");
		expect(dialog).toHaveAttribute("aria-labelledby", `${defaultProps.id}-title`);
		expect(title).toBeInTheDocument();
		expect(title).toHaveAttribute("id", `${defaultProps.id}-title`);
		expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveClass("modal-close");
		expect(screen.getByAltText("Close")).toBeInTheDocument();
	});

	it("Applies custom size classes", () => {
		const { rerender }: RenderResult = render(<Modal {...defaultProps} size="sm" />);

		expect(screen.getByRole("dialog")).toHaveClass("modal--sm");
	});

	it("Applies fullscreen class when fullscreen is true", () => {
		render(<Modal {...defaultProps} fullscreen={true} />);

		expect(screen.getByRole("dialog")).toHaveClass("modal-fullscreen");
	});

	it("Applies custom className", () => {
		const customClassName: string = "custom-modal-class";

		render(<Modal {...defaultProps} className={customClassName} />);

		expect(screen.getByRole("dialog")).toHaveClass(customClassName);
	});

	it("Renders footer when provided", () => {
		const footer: string = "Footer Content";

		render(<Modal {...defaultProps} footer={footer} />);

		expect(screen.getByText(footer)).toBeInTheDocument();
		expect(screen.getByText(footer)).toHaveClass("modal-footer");
	});

	it("Does not render footer when not provided", () => {
		render(<Modal {...defaultProps} />);

		expect(screen.queryByText(".modal-footer")).not.toBeInTheDocument();
	});

	it("Calls onClose when close button is clicked", () => {
		const handleClose = vi.fn();

		render(<Modal {...defaultProps} onClose={handleClose} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("Calls onClose when overlay is clicked", () => {
		const handleClose = vi.fn();

		render(<Modal {...defaultProps} onClose={handleClose} />);

		fireEvent.click(screen.getByRole("dialog").parentElement!);

		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("Does not call onClose when modal content is clicked", () => {
		const handleClose = vi.fn();

		render(<Modal {...defaultProps} onClose={handleClose} />);

		fireEvent.click(screen.getByRole("dialog"));

		expect(handleClose).not.toHaveBeenCalled();
	});

	it("Calls onClose when Escape key is pressed", () => {
		const handleClose = vi.fn();

		render(<Modal {...defaultProps} onClose={handleClose} />);

		fireEvent.keyDown(document, { key: "Escape" });

		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("Does not crash when onClose is not provided", () => {
		render(<Modal {...defaultProps} />);

		expect(() => {
			fireEvent.click(screen.getByRole("button"));
			fireEvent.keyDown(document, { key: "Escape" });
			fireEvent.click(screen.getByRole("dialog").parentElement!);
		}).not.toThrow();
	});

	it("Passes additional props to modal dialog", () => {
		render(<Modal {...defaultProps} data-testid="custom-modal" tabIndex={0} />);

		const modal: HTMLElement = screen.getByRole("dialog");

		expect(modal).toHaveAttribute("data-testid", "custom-modal");
		expect(modal).toHaveAttribute("tabIndex", "0");
	});
});
