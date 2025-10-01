import React from "react";
import classNames from "classnames";
import "../assets/styles/main.scss";

type FormGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	label?: string;
	children: React.ReactNode;
	className?: string;
};

export function FormGroup({ label, children, className, ...props }: FormGroupProps): React.JSX.Element {
	return (
		<div className={classNames("form-group", className)} {...props}>
			{label && <label className="form-label">{label}</label>}
			{children}
		</div>
	);
}
