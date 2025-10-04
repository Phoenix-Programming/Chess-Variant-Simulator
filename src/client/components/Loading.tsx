import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: "sm" | "md" | "lg" | "xl";
	overlay?: "area" | "fullscreen";
};

export function Loading({ size = "sm", overlay = "area", className, ...props }: LoadingProps): React.JSX.Element {
	const hasOverlay: boolean = overlay !== "area";

	return hasOverlay ? (
		<div className={classNames("loading-overlay", `loading-${overlay}`)}>
			<div className={classNames("spinner", `spinner--${size}`, className)} {...props} />
		</div>
	) : (
		<div className={classNames("spinner", `spinner--${size}`, className)} {...props} />
	);
}
