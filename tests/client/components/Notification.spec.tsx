import React from "react";
import { render, screen, fireEvent, RenderResult, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Notification, NotificationManager } from "../../../src/client/components/Notification";

describe("Notification component", () => {
	beforeEach(() => {
		document.body.innerHTML = "";

		const container: HTMLDivElement = document.createElement("div");

		container.id = "notification-container";
		document.body.appendChild(container);
	});

	it("Renders with default properties", () => {
		const title: string = "Title Test";
		const msg: string = "Message Test";

		render(<Notification title={title} message={msg} />);

		const titleElement: HTMLElement = screen.getByText(title);

		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveClass("notification-title");
		expect(screen.getByText(msg)).toBeInTheDocument();
		expect(document.querySelector(".notification")).toHaveClass("notification", "notification--info");
		expect(screen.getByRole("button")).toHaveClass("notification-close");
	});

	it("Applies custom type and className", () => {
		const className: string = "test-class";

		render(<Notification title="Test Title" message="Test Message" type="success" className={className} />);

		expect(document.querySelector(".notification")).toHaveClass("notification--success", className);
	});

	it("Renders correct icon for each notification type", () => {
		const types = [
			{ type: "info" as const, alt: "Info", iconClass: "notification-icon--info" },
			{ type: "success" as const, alt: "Success", iconClass: "notification-icon--success" },
			{ type: "warning" as const, alt: "Warning", iconClass: "notification-icon--warning" },
			{ type: "danger" as const, alt: "Error", iconClass: "notification-icon--error" }
		];

		types.forEach(({ type, alt, iconClass }) => {
			const { unmount }: RenderResult = render(<Notification title="Test" message="Test" type={type} />);

			const icon: HTMLElement = screen.getByAltText(alt);
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass(iconClass);
			expect(icon).toHaveAttribute("width", "20");
			expect(icon).toHaveAttribute("height", "20");

			unmount();
		});
	});

	it("Renders close button with correct attributes", () => {
		render(<Notification title="Test" message="Test" />);

		const closeButton: HTMLElement = screen.getByRole("button");
		const closeIcon: HTMLElement = screen.getByAltText("Close");

		expect(closeButton).toHaveClass("notification-close");
		expect(closeIcon).toBeInTheDocument();
		expect(closeIcon).toHaveAttribute("width", "16");
		expect(closeIcon).toHaveAttribute("height", "16");
	});

	it("Calls onClose when close button is clicked", () => {
		const handleClose = vi.fn();

		render(<Notification title="Test" message="Test" onClose={handleClose} />);

		fireEvent.click(screen.getByRole("button"));

		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("Does not call onClose when it is not provided", () => {
		render(<Notification title="Test" message="Test" />);

		expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
	});

	it("Passes through additional HTML attributes", () => {
		const id: string = "test-notification";

		render(<Notification title="Test" message="Test" data-testid={id} />);

		const idElement: HTMLElement = screen.getByTestId(id);

		expect(idElement).toBeInTheDocument();
		expect(idElement).toHaveClass("notification");
	});

	it("Renders notification content structure correctly", () => {
		render(<Notification title="Test Title" message="Test Message" />);

		expect(document.querySelector(".notification-content")).toBeInTheDocument();
		expect(document.querySelector(".notification-icon")).toBeInTheDocument();
		expect(document.querySelector(".notification-body")).toBeInTheDocument();
		expect(document.querySelector(".notification-title")).toBeInTheDocument();
		expect(document.querySelector(".notification-message")).toBeInTheDocument();
	});

	it("Handles empty title and message", () => {
		render(<Notification title="" message="" />);

		expect(document.querySelector(".notification-title")).toBeInTheDocument();
		expect(document.querySelector(".notification-message")).toBeInTheDocument();
		expect(document.querySelector(".notification")).toHaveClass("notification--info");
	});

	it("Applies all notification types correctly", () => {
		const types = ["info", "success", "warning", "danger"] as const;

		types.forEach((type) => {
			const { unmount }: RenderResult = render(
				<Notification title={`${type} Title`} message={`${type} Message`} type={type} />
			);

			expect(document.querySelector(".notification")).toHaveClass(`notification--${type}`);

			unmount();
		});
	});
});

describe("NotificationManager", () => {
	beforeEach(() => {
		vi.useFakeTimers();

		document.body.innerHTML = "";

		const container: HTMLDivElement = document.createElement("div");

		container.id = "notification-container";
		document.body.appendChild(container);
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();

		document.body.innerHTML = "";

		const container = document.getElementById("notification-container");
		if (container) container.innerHTML = "";
	});

	it("Shows notification with correct properties", async () => {
		await act(async () => {
			NotificationManager.showInfo("Info Title", "Info Message");
		});

		const notification: HTMLElement | null = document.querySelector(".notification");

		expect(notification).toHaveClass("notification--info");
		expect(document.querySelector(".notification-title")).toHaveTextContent("Info Title");
		expect(document.querySelector(".notification-message")).toHaveTextContent("Info Message");
	});

	it("Auto-closes notification after 5 seconds", async () => {
		await act(async () => {
			NotificationManager.showInfo("Test Title", "Test Message");
		});

		expect(document.querySelector(".notification")).toBeInTheDocument();

		await act(async () => {
			vi.advanceTimersByTime(4999);
		});

		expect(document.querySelector(".notification")).toBeInTheDocument();
		expect(document.querySelector(".notification")).not.toHaveClass("notification-closing");

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(document.querySelector(".notification")).toHaveClass("notification-closing");

		await act(async () => {
			vi.advanceTimersByTime(300);
		});

		expect(document.querySelector(".notification")).not.toBeInTheDocument();
	});

	it("Closes notification immediately when close button is clicked", async () => {
		await act(async () => {
			NotificationManager.showInfo("Test Title", "Test Message");
		});

		const closeButton: HTMLButtonElement = document.querySelector(".notification-close") as HTMLButtonElement;

		expect(closeButton).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(closeButton);
		});

		expect(document.querySelector(".notification")).toHaveClass("notification-closing");

		await act(async () => {
			vi.advanceTimersByTime(300);
		});

		expect(document.querySelector(".notification")).not.toBeInTheDocument();
	});

	it("Does not show notification when container is missing", async () => {
		document.getElementById("notification-container")?.remove();

		await act(async () => {
			NotificationManager.showInfo("Test", "Test Message");
		});

		expect(document.querySelector(".notification")).not.toBeInTheDocument();
	});

	it("Properly removes notification from DOM after animation", async () => {
		await act(async () => {
			NotificationManager.showInfo("Test", "Test Message");
		});

		const notificationWrappers: Element[] = Array.from(document.querySelectorAll('[id^="notification-"]')).filter(
			(el) => el.id !== "notification-container"
		);

		expect(notificationWrappers).toHaveLength(1);

		const notificationWrapper: HTMLElement = notificationWrappers[0] as HTMLElement;

		expect(document.getElementById(notificationWrapper.id)).toBeInTheDocument();

		const closeButton: HTMLButtonElement = document.querySelector(".notification-close") as HTMLButtonElement;

		await act(async () => {
			fireEvent.click(closeButton);
		});

		await act(async () => {
			vi.advanceTimersByTime(300);
		});

		expect(document.getElementById(notificationWrapper.id)).not.toBeInTheDocument();
	});
});
