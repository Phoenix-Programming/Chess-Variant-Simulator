import React from "react";
import classNames from "classnames";
import "../assets/styles/components/_notification.scss";

type NotificationType = "info" | "success" | "warning" | "danger";

type NotificationProps = React.HTMLAttributes<HTMLDivElement> & {
	type?: NotificationType;
	title: string;
	message: string;
	onClose?: () => void;
	className?: string;
};

export function Notification({
	type = "info",
	title,
	message,
	onClose,
	className,
	...props
}: NotificationProps): React.JSX.Element {
	const handleClose = () => {
		if (onClose) onClose();
	};

	return (
		<div className={classNames("notification", `notification--${type}`, className)} {...props}>
			<div className="notification-content">
				<div className="notification-icon" dangerouslySetInnerHTML={{ __html: getNotificationIcon(type) }} />
				<div className="notification-body">
					<div className="notification-title">{title}</div>
					<div className="notification-message">{message}</div>
				</div>
				<button className="notification-close" onClick={handleClose}>
					<img src="/icons/close.svg" alt="Close" width="16" height="16" />
				</button>
			</div>
		</div>
	);
}

export const NotificationManager = {
	showInfo: (title: string, message: string): void => {
		showNotification("info", title, message);
	},

	showSuccess: (title: string, message: string): void => {
		showNotification("success", title, message);
	},

	showError: (title: string, message: string): void => {
		showNotification("danger", title, message);
	},

	showWarning: (title: string, message: string): void => {
		showNotification("warning", title, message);
	}
};

function showNotification(type: NotificationType, title: string, message: string): void {
	const container: HTMLElement | null = document.getElementById("notification-container");

	if (!container) return;

	const notificationId = `notification-${Date.now()}`;

	const notificationWrapper: HTMLDivElement = document.createElement("div");
	notificationWrapper.id = notificationId;

	container.appendChild(notificationWrapper);

	const root = (
		window as unknown as {
			ReactDOM: {
				createRoot: (element: HTMLElement) => { render: (element: React.ReactElement) => void; unmount: () => void };
			};
		}
	).ReactDOM.createRoot(notificationWrapper);
	(notificationWrapper as HTMLDivElement & { _reactRoot: typeof root })._reactRoot = root;

	const notificationElement = React.createElement(Notification, {
		type,
		title,
		message,
		onClose: () => closeNotification(notificationId)
	});

	root.render(notificationElement);

	setTimeout(() => {
		closeNotification(notificationId);
	}, 5000);
}

function closeNotification(notificationId: string): void {
	const notification = document.getElementById(notificationId);

	if (!notification) return;

	const notificationElement = notification.querySelector(".notification") as HTMLElement;

	notificationElement?.classList.add("notification-closing");

	setTimeout(() => {
		const reactRoot = (notification as HTMLElement & { _reactRoot?: { unmount: () => void } })._reactRoot;
		reactRoot?.unmount();

		notification.parentNode?.removeChild(notification);
	}, 300);
}

function getNotificationIcon(type: string): string {
	switch (type) {
		case "success":
			return '<img src="/public/icons/check.svg" alt="Success" width="20" height="20" style="filter: brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(91%);" />';
		case "error":
			return '<img src="/public/icons/error.svg" alt="Error" width="20" height="20" style="filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);" />';
		case "warning":
			return '<img src="/public/icons/warning.svg" alt="Warning" width="20" height="20" style="filter: brightness(0) saturate(100%) invert(84%) sepia(84%) saturate(2500%) hue-rotate(2deg) brightness(101%) contrast(107%);" />';
		// info
		default:
			return '<img src="/public/icons/info.svg" alt="Info" width="20" height="20" style="filter: brightness(0) saturate(100%) invert(45%) sepia(62%) saturate(4547%) hue-rotate(211deg) brightness(100%) contrast(91%);" />';
	}
}
