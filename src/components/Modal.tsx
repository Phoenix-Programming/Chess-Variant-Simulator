import React, { HTMLAttributes } from "react";
import classNames from "classnames";
import "../assets/styles/components/_modal.scss";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
	id: string;
	size?: "sm" | "default" | "lg" | "xl";
	fullscreen?: boolean,
	title: string;
	footer?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
};

export function Modal({
	id,
	size = "default",
	fullscreen = false,
	title,
	footer,
	children,
	className,
	...props
}: ModalProps): React.JSX.Element {
	return (
		<div className="modal-overlay">
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
					<button className="modal-close" onClick={() => closeModal(id)}>
						<img src="/public/icons/close.svg" alt="Close" width="24" height="24" />
					</button>
				</div>
				<div className="modal-body">{children}</div>
				{footer && <div className="modal-footer">{footer}</div>}
			</div>
		</div>
	);
}

function closeModal(modalId: string): void {
	const modal = document.getElementById(modalId);

	if (!modal) return;

	modal.classList.remove("modal-open");
	document.body.style.overflow = ""; // restore scrolling

	// hide modal after transition
	setTimeout(() => {
		modal.style.display = "none";
	}, 300);
}
