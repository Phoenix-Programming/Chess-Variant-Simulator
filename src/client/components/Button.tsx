import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	styleType?: "solid" | "outline";
	variant?: "primary" | "secondary" | "danger" | "warning" | "success";
	size?: "sm" | "md" | "lg" | "pill" | "icon-sm" | "icon-lg" | "block";
	text?: string;
	children?: React.ReactNode;
};

export function Button({
	styleType = "solid",
	variant = "primary",
	size = "md",
	text,
	children,
	className,
	...props
}: ButtonProps): React.JSX.Element {
	return (
		<button className={classNames("btn", `btn--${styleType}`, `btn--${variant}`, `btn--${size}`, className)} {...props}>
			{children || text}
		</button>
	);
}
