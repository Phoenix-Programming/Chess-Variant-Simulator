import React from "react";
import classNames from "classnames";
import "../assets/styles/main.scss";

type FormGridProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	className?: string;
};

export function FormGrid({ children, className, ...props }: FormGridProps): React.JSX.Element {
	return (
		<div className={classNames("form-grid", className)} {...props}>
			{children}
		</div>
	);
}

export function FormCol({ children, className, ...props }: FormGridProps): React.JSX.Element {
	return (
		<div className={classNames("form-col", className)} {...props}>
			{children}
		</div>
	);
}

export function FormColAuto({ children, className, ...props }: FormGridProps): React.JSX.Element {
	return (
		<div className={classNames("form-col-auto", className)} {...props}>
			{children}
		</div>
	);
}
