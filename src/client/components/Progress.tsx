import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
	type?: "solid" | "striped";
	variant?: "primary" | "secondary" | "success" | "warning" | "danger";
	size?: "sm" | "lg";
	value?: number;
	max?: number;
	className?: string;
};

export function Progress({
	type = "solid",
	variant = "primary",
	size = "sm",
	value = 0,
	max = 100,
	className,
	...props
}: ProgressProps): React.JSX.Element {
	const percentage: number = Math.min(Math.max((value / max) * 100, 0), 100);

	return (
		<div className={classNames("progress", `progress--${size}`, className)} {...props}>
			<div
				className={classNames("progress-bar", type !== "solid" && `progress--${type}`, `progress--${variant}`)}
				style={{ width: `${percentage}%` }}
			/>
		</div>
	);
}
