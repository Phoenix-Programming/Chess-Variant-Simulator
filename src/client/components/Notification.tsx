import React from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";
import "../styles/main.scss";
import CloseIcon from "@icons/close.svg";
import CheckIcon from "@icons/check.svg";
import ErrorIcon from "@icons/error.svg";
import WarningIcon from "@icons/warning.svg";
import InfoIcon from "@icons/info.svg";

type NotificationType = "info" | "success" | "warning" | "danger";

type NotificationProps = React.HTMLAttributes<HTMLDivElement> & {
	type?: NotificationType;
	title: string;
	message: string;
	onClose?: () => void;
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
				<div className="notification-icon">{getNotificationIcon(type)}</div>
				<div className="notification-body">
					<div className="notification-title">{title}</div>
					<div className="notification-message">{message}</div>
				</div>
				<button className="notification-close" onClick={handleClose}>
					<img src={CloseIcon} alt="Close" width="16" height="16" />
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

const notificationRoots = new WeakMap<HTMLElement, ReturnType<typeof ReactDOM.createRoot>>();

function showNotification(type: NotificationType, title: string, message: string): void {
	const container: HTMLElement | null = document.getElementById("notification-container");

	if (!container) return;

	const notificationId = `notification-${Date.now()}`;

	const notificationWrapper: HTMLDivElement = document.createElement("div");
	notificationWrapper.id = notificationId;

	const root: ReactDOM.Root = ReactDOM.createRoot(notificationWrapper);
	notificationRoots.set(notificationWrapper, root);

	const notificationElement = React.createElement(Notification, {
		type,
		title,
		message,
		onClose: () => closeNotification(notificationId)
	});

	root.render(notificationElement);
	container.appendChild(notificationWrapper);

	setTimeout(() => {
		closeNotification(notificationId);
	}, 5000);
}

function closeNotification(notificationId: string): void {
	const notification: HTMLElement | null = document.getElementById(notificationId);

	if (!notification) return;

	const notificationElement: HTMLElement | null = notification.querySelector(".notification");

	if (notificationElement) {
		notificationElement.classList.add("notification-closing");

		// Wait for animation to complete before removing from DOM
		setTimeout(() => {
			const reactRoot: ReactDOM.Root | undefined = notificationRoots.get(notification);
			reactRoot?.unmount();
			notificationRoots.delete(notification);
			notification.remove();
		}, 300);
	} else {
		// If no notification element found, clean up immediately
		const reactRoot: ReactDOM.Root | undefined = notificationRoots.get(notification);
		reactRoot?.unmount();
		notificationRoots.delete(notification);
		notification.remove();
	}
}

function getNotificationIcon(type: NotificationType): React.JSX.Element {
	switch (type) {
		case "success":
			return <img src={CheckIcon} alt="Success" width="20" height="20" className="notification-icon--success" />;
		case "danger":
			return <img src={ErrorIcon} alt="Error" width="20" height="20" className="notification-icon--error" />;
		case "warning":
			return <img src={WarningIcon} alt="Warning" width="20" height="20" className="notification-icon--warning" />;
		case "info":
		default:
			return <img src={InfoIcon} alt="Info" width="20" height="20" className="notification-icon--info" />;
	}
}
