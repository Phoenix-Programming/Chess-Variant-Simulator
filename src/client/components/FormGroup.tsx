import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

type FormGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	label?: string;
	htmlFor?: string;
	children: React.ReactNode;
};

export function FormGroup({ label, htmlFor, children, className, ...props }: FormGroupProps): React.JSX.Element {
	return (
		<div className={classNames("form-group", className)} {...props}>
			{label && (
				<label className="form-label" htmlFor={htmlFor}>{label}</label>
			)}
			{children}
		</div>
	);
}
