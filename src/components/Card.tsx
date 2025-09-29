import React from "react";
import classNames from "classnames";
import "../assets/styles/components/_cards.scss";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	compact?: boolean;
	interactive?: boolean;
	variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
	header?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode; //body
	className?: string;
};

export function Card({
	compact = false,
	interactive = false,
	variant = "default",
	header,
	footer,
	children,
	className,
	...props
}: CardProps): React.JSX.Element {
	return (
		<div
			className={classNames(
				"card",
				{
					"card--compact": compact,
					"card--interactive": interactive
				},
				variant !== "default" && `card--${variant}`,
				className
			)}
			{...props}
		>
			{header && <div
				className={classNames(
					"card__header",
					{
						"card--compact": compact,
						"card--interactive": interactive
					},
				)}
			>
				{header}
			</div>}
			<div className="card__body">{children}</div>
			{footer && <div
				className={classNames(
					"card__footer",
					{
						"card--compact": compact,
						"card--interactive": interactive
					},
				)}
			>
				{footer}
			</div>}
		</div>
	);
}
