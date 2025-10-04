import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Alert } from "../../../src/client/components/Alert";

describe("Alert component", () => {
	it("Renders with default properties", () => {
		const title: string = "Title Test";
		const msg: string = "Message Test";

		render(<Alert title={title} message={msg} />);

		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(msg)).toBeInTheDocument();
		expect(screen.queryByRole("alert")).toHaveClass("alert", "alert--info");
		expect(screen.queryByRole("button")).toHaveClass("alert-close");
		expect(screen.getByText(title)).toHaveClass("alert-title");
	});

	it("Applies custom variant and className", () => {
		const className: string = "test-class";

		render(<Alert title="" message="" variant="danger" className={className} />);

		expect(screen.getByRole("alert")).toHaveClass("alert--danger", className);
	});

	it("Does not render when show is false", () => {
		render(<Alert title="" message="" show={false} />);

		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});

	it("Renders without close button when show is dismissible is false", () => {
		render(<Alert title="" message="" dismissible={false} />);

		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("calls onClose and hides after clicking close", async () => {
		vi.useFakeTimers();
		const handleClose = vi.fn();

		render(<Alert title="" message="" onClose={handleClose} />);

		await act(async () => {
			fireEvent.click(screen.getByRole("button"));
		});

		expect(handleClose).toHaveBeenCalled();
		expect(screen.getByRole("alert")).toHaveClass("alert-closing");

		await act(async () => {
			vi.advanceTimersByTime(300);
		});

		expect(screen.queryByRole("alert")).not.toBeInTheDocument();

		vi.useRealTimers();
	});
});
