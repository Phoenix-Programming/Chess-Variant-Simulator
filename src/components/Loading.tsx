import React from "react";
import classNames from "classnames";
import "../assets/styles/components/_loading.scss";

type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: "sm" | "lg";
	overlay?: "area" | "fullscreen";
	className?: string;
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
