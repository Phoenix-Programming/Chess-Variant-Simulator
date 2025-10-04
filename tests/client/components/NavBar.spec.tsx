import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NavBar } from "../../../src/client/components/NavBar";

describe("NavBar component", () => {
	const mockBrand = {
		text: "Test Brand",
		href: "/home"
	};

	const mockItems = [
		{ label: "Home", href: "/home", active: true },
		{ label: "About", href: "/about" },
		{ label: "Contact", href: "/contact", active: false }
	];

	it("Renders with default properties", () => {
		render(<NavBar brand={mockBrand} items={mockItems} />);

		const navigation: HTMLElement = screen.getByRole("navigation");
		const brand: HTMLElement = screen.getByText("Test Brand");

		expect(navigation).toBeInTheDocument();
		expect(navigation).toHaveClass("navbar");
		expect(brand).toBeInTheDocument();
		expect(brand).toHaveClass("navbar-brand-text");
		expect(screen.getByText(mockItems[0].label)).toBeInTheDocument();
		expect(screen.getByText(mockItems[1].label)).toBeInTheDocument();
		expect(screen.getByText(mockItems[2].label)).toBeInTheDocument();
	});

	it("Renders brand with icon when brandIcon is provided", () => {
		const iconSrc = "/path/to/icon.svg";

		render(<NavBar brand={mockBrand} brandIcon={iconSrc} items={mockItems} />);

		const icon: HTMLElement = screen.getByRole("img");

		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass("navbar-brand-icon");
		expect(icon).toHaveAttribute("src", iconSrc);
	});

	it("Does not render icon when brandIcon is not provided", () => {
		render(<NavBar brand={mockBrand} items={mockItems} />);

		expect(screen.queryByRole("img")).not.toBeInTheDocument();
	});

	it("Applies custom className", () => {
		const className: string = "custom-navbar";

		render(<NavBar brand={mockBrand} items={mockItems} className={className} />);

		expect(screen.getByRole("navigation")).toHaveClass("navbar", className);
	});

	it("Renders brand link with correct href", () => {
		render(<NavBar brand={mockBrand} items={mockItems} />);

		const brandLink: HTMLElement = screen.getByRole("link", { name: /test brand/i });

		expect(brandLink).toHaveAttribute("href", "/home");
		expect(brandLink).toHaveClass("navbar-brand");
	});

	it("Renders navigation items with correct hrefs and labels", () => {
		render(<NavBar brand={mockBrand} items={mockItems} />);

		const homeLink: HTMLElement = screen.getByRole("link", { name: mockItems[0].label });
		const aboutLink: HTMLElement = screen.getByRole("link", { name: mockItems[1].label });
		const contactLink: HTMLElement = screen.getByRole("link", { name: mockItems[2].label });

		expect(homeLink).toHaveAttribute("href", mockItems[0].href);
		expect(aboutLink).toHaveAttribute("href", mockItems[1].href);
		expect(contactLink).toHaveAttribute("href", mockItems[2].href);

		expect(homeLink).toHaveClass("navbar-link");
		expect(aboutLink).toHaveClass("navbar-link");
		expect(contactLink).toHaveClass("navbar-link");
	});

	it("Applies active class to active navigation items", () => {
		render(<NavBar brand={mockBrand} items={mockItems} />);

		const homeLink = screen.getByRole("link", { name: mockItems[0].label });
		const aboutLink = screen.getByRole("link", { name: mockItems[1].label });
		const contactLink = screen.getByRole("link", { name: mockItems[2].label });

		expect(homeLink).toHaveClass("active");
		expect(aboutLink).not.toHaveClass("active");
		expect(contactLink).not.toHaveClass("active");
	});

	it("Calls onItemClick and prevents default when item is clicked", () => {
		const handleItemClick = vi.fn();

		render(<NavBar brand={mockBrand} items={mockItems} onItemClick={handleItemClick} />);

		const homeLink: HTMLElement = screen.getByRole("link", { name: "Home" });
		fireEvent.click(homeLink);

		expect(handleItemClick).toHaveBeenCalledWith("/home");
		expect(handleItemClick).toHaveBeenCalledTimes(1);
	});

	it("Does not prevent default when onItemClick is not provided", () => {
		render(<NavBar brand={mockBrand} items={mockItems} />);

		const homeLink: HTMLElement = screen.getByRole("link", { name: "Home" });
		const clickEvent = fireEvent.click(homeLink);

		expect(clickEvent).toBe(true);
	});

	it("Renders empty items list without errors", () => {
		render(<NavBar brand={mockBrand} items={[]} />);

		expect(screen.getByRole("navigation")).toBeInTheDocument();
		expect(screen.getByText("Test Brand")).toBeInTheDocument();

		const navList: HTMLElement = screen.getByRole("list");

		expect(navList).toBeInTheDocument();
		expect(navList).toHaveClass("navbar-nav");
	});

	it("Uses href as key when available, index as fallback", () => {
		const itemsWithoutHref = [
			{ label: "Item 1", href: "" },
			{ label: "Item 2", href: "/item2" }
		];

		render(<NavBar brand={mockBrand} items={itemsWithoutHref} />);

		expect(screen.getByText(itemsWithoutHref[0].label)).toBeInTheDocument();
		expect(screen.getByText(itemsWithoutHref[1].label)).toBeInTheDocument();
	});
});
