import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import { Button } from "../../../src/client/components/Button";

describe("Button component", () => {
	it("Renders with default properties", () => {
		render(<Button />);

		const btn: HTMLElement = screen.getByRole("button");

		expect(btn).toHaveClass("btn", "btn--solid", "btn--primary", "btn--md");
	});

	it("Applies style type, variant, and size correctly", () => {
		render(<Button styleType="outline" variant="danger" size="sm" />);

		const btn: HTMLElement = screen.getByRole("button");

		expect(btn).toHaveClass("btn", "btn--outline", "btn--danger", "btn--sm");
	});

	it("Renders children when provided", () => {
		const text: string = "Should not show";
		const child: string = "Child Content";

		render(
			<Button text={text}>
				<span>{child}</span>
			</Button>
		);

		expect(screen.getByText(child)).toBeInTheDocument();
		expect(screen.queryByText(text)).not.toBeInTheDocument();
	});

	it("Renders text when children are not provided", () => {
		const text: string = "Button Test";

		render(<Button text={text}></Button>);

		expect(screen.getByText(text)).toBeInTheDocument();
	});

	it("Renders additional className", () => {
		const className: string = "test-class";

		render(<Button className={className}/>);
		const btn: HTMLElement = screen.getByRole("button");

		expect(btn).toHaveClass(className);
	});

	it("Forwards native button properties", () => {
		render(<Button type="submit" disabled />)
		const btn: HTMLElement = screen.getByRole("button");

		expect(btn).toHaveAttribute("type", "submit");
		expect(btn).toBeDisabled();
	});

	it("Calls onClick when clicked", async () => {
		const text: string = "Button Test";
		const handleClick = vi.fn();

		render(<Button onClick={handleClick} text={text}></Button>);
		fireEvent.click(screen.getByText(text));

		expect(handleClick).toHaveBeenCalledOnce();
	});
});
