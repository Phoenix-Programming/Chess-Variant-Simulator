import React, { useEffect } from "react";
import classNames from "classnames";
import "../assets/styles/main.scss";
import CloseIcon from "@icons/close.svg";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
	id: string;
	size?: "sm" | "default" | "lg" | "xl";
	fullscreen?: boolean;
	title: string;
	footer?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	onClose?: () => void;
};

export function Modal({
	id,
	size = "default",
	fullscreen = false,
	title,
	footer,
	children,
	className,
	onClose,
	...props
}: ModalProps): React.JSX.Element {
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose?.();
		};

		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [onClose]);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose?.();
	};

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div
				className={classNames(
					"modal",
					size !== "default" && `modal--${size}`,
					fullscreen && "modal-fullscreen",
					className
				)}
				id={id}
				role="dialog"
				aria-modal="true"
				aria-labelledby={`${id}-title`}
				{...props}
			>
				<div className="modal-header">
					{title && <h3 id={`${id}-title`}>{title}</h3>}
					<button className="modal-close" onClick={onClose}>
						<img src={CloseIcon} alt="Close" width="24" height="24" />
					</button>
				</div>
				<div className="modal-body">{children}</div>
				{footer && <div className="modal-footer">{footer}</div>}
			</div>
		</div>
	);
}
