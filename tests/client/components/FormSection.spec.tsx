import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormSection } from "../../../src/client/components/FormSection";

describe("FormSection component", () => {
	it("Renders with default properties", () => {
		const title: string = "Test Title";
		const testContent: string = "Test Content";

		render(
			<FormSection title={title}>
				<div>{testContent}</div>
			</FormSection>
		);

		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(testContent)).toBeInTheDocument();
		expect(screen.getByText(title)).toHaveClass("form-section-title");
		expect(document.querySelector(".form-section")).toBeInTheDocument();
		expect(screen.queryByAltText("Collapse")).not.toBeInTheDocument();
		expect(screen.queryByAltText("Expand")).not.toBeInTheDocument();
	});

	it("Renders with subtitle when provided", () => {
		const title: string = "Test Title";
		const subtitle: string = "Test Subtitle";

		render(
			<FormSection title="Test Title" subtitle={subtitle}>
				<div>Test Content</div>
			</FormSection>
		);

		const subtitleElement: HTMLElement = screen.getByText(subtitle);

		expect(subtitleElement).toBeInTheDocument();
		expect(subtitleElement).toHaveClass("form-section-subtitle");
	});

	it("Applies custom className", () => {
		const className: string = "custom-class";

		render(
			<FormSection title="Test Title" className={className}>
				<div>Test Content</div>
			</FormSection>
		);

		expect(document.querySelector(".form-section")).toHaveClass(className);
	});

	it("Renders as collapsible when collapsible prop is true", () => {
		render(
			<FormSection title="Test Title" collapsible>
				<div>Test Content</div>
			</FormSection>
		);

		const button: HTMLElement = screen.getByRole("button");

		expect(document.querySelector(".form-section")).toHaveClass("form-section--collapsible");
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByAltText("Collapse")).toBeInTheDocument();
	});

	it("Starts collapsed when defaultExpanded is false", () => {
		const content: string = "Test Content";

		render(
			<FormSection title="Title" collapsible defaultExpanded={false}>
				<div>{content}</div>
			</FormSection>
		);

		expect(document.querySelector(".form-section")).toHaveClass("form-section--collapsed");
		expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByAltText("Expand")).toBeInTheDocument();
		expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
	});

	it("Toggles expansion when clicking header on collapsible section", async () => {
		const content: string = "Test Content";

		vi.useFakeTimers();

		render(
			<FormSection title="Title" collapsible>
				<div>{content}</div>
			</FormSection>
		);

		const button = screen.getByRole("button");

		expect(screen.getByText("Test Content")).toBeInTheDocument();
		expect(screen.getByAltText("Collapse")).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(button);
		});

		expect(document.querySelector(".form-section")).toHaveClass("form-section--collapsing");

		await act(async () => {
			vi.advanceTimersByTime(200);
		});

		expect(document.querySelector(".form-section")).toHaveClass("form-section--collapsed");
		expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByAltText("Expand")).toBeInTheDocument();
		expect(screen.queryByText("Test Content")).not.toBeInTheDocument();

		await act(async () => {
			fireEvent.click(button);
		});

		expect(screen.getByText(content)).toBeInTheDocument();
		expect(screen.getByAltText("Collapse")).toBeInTheDocument();

		vi.useRealTimers();
	});

	it("Toggles expansion when pressing Enter on collapsible section", async () => {
		const content: string = "Test Content";

		render(
			<FormSection title="Title" collapsible>
				<div>{content}</div>
			</FormSection>
		);

		const button: HTMLElement = screen.getByRole("button");
		expect(screen.getByText(content)).toBeInTheDocument();

		await act(async () => {
			fireEvent.keyDown(button, { key: "Enter" });
		});

		expect(document.querySelector(".form-section")).toHaveClass("form-section--collapsing");
	});

	it("Toggles expansion when pressing Space on collapsible section", async () => {
		render(
			<FormSection title="Title" collapsible>
				<div>Test Content</div>
			</FormSection>
		);

		const button: HTMLElement = screen.getByRole("button");
		expect(screen.getByText("Test Content")).toBeInTheDocument();

		await act(async () => {
			fireEvent.keyDown(button, { key: " " });
		});

		expect(document.querySelector(".form-section")).toHaveClass("form-section--collapsing");
	});

	it("Does not toggle when clicking header on non-collapsible section", async () => {
		const title: string = "Test Title";
		const content: string = "Test Content";

		render(
			<FormSection title={title}>
				<div>{content}</div>
			</FormSection>
		);

		const header: Element | null = screen.getByText(title).closest(".form-section-header");
		expect(screen.getByText(content)).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(header!);
		});

		expect(screen.getByText(content)).toBeInTheDocument();
		expect(document.querySelector(".form-section")).not.toHaveClass("form-section--collapsing");
	});

	it("Sets correct accessibility attributes for non-collapsible section", () => {
		const title: string = "Test Title";

		render(
			<FormSection title={title}>
				<div>Test Content</div>
			</FormSection>
		);

		const header = screen.getByText(title).closest(".form-section-header");

		expect(header).not.toHaveAttribute("role");
		expect(header).not.toHaveAttribute("tabIndex");
		expect(header).not.toHaveAttribute("aria-expanded");
	});

	it("Passes through additional HTML attributes", () => {
		const id: string = "Test ID";

		render(
			<FormSection title="Title" data-testid="custom-section" id={id}>
				<div>Test Content</div>
			</FormSection>
		);

		expect(screen.getByTestId("custom-section")).toHaveAttribute("id", id);
	});
});
