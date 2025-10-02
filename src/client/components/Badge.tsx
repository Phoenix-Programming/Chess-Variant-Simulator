import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
	type?: "solid" | "outline";
	variant?: "primary" | "neutral" | "success" | "warning" | "danger";
	text: string;
	className?: string;
};

export function Badge({
	type = "solid",
	variant = "primary",
	text,
	className,
	...props
}: BadgeProps): React.JSX.Element {
	return (
		<span className={classNames("badge", `badge--${type}`, `badge--${variant}`, className)} {...props}>
			{text}
		</span>
	);
}
