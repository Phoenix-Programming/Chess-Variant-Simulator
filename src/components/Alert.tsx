import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "../assets/styles/components/_alert.scss";

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: "info" | "success" | "warning" | "danger";
	title: string;
	message: string;
	dismissible?: boolean;
	show?: boolean;
	onClose?: () => void;
	className?: string;
};

export function Alert({
	variant = "info",
	title,
	message,
	dismissible = true,
	show = true,
	onClose,
	className,
	...props
}: AlertProps): React.JSX.Element | null {
	const [isVisible, setIsVisible] = useState(show);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		setIsVisible(show);
	}, [show]);

	const handleClose = () => {
		setIsClosing(true);

		if (onClose) onClose();

		setTimeout(() => {
			setIsVisible(false);
		}, 300);
	}

	if (!isVisible) return null;

	return (
		<div
			className={classNames(
				"alert",
				`alert--${variant}`,
				isClosing && "alert-closing",
				className
			)}
			{...props}
		>
			{dismissible && (
				<button
					className="alert-close"
					onClick={handleClose}
					aria-label="Close alert"
					type="button"
				>
					<img src="/public/icons/close.svg" alt="Close" width="20" height="20" />
				</button>
			)}
			<div className="alert-title">{title}</div>
			{message}
		</div>
	);
}
