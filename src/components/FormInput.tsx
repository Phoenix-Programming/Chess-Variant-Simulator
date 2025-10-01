import React from "react";
import classNames from "classnames";
import "../assets/styles/main.scss";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	icon?: React.ReactNode;
	className?: string;
};

export function FormInput({ icon, className, ...props }: FormInputProps): React.JSX.Element {
	if (!icon) return <input className={classNames("form-control", className)} {...props} />;

	return (
		<div className="form-control-icon">
			<input className={classNames("form-control", className)} {...props} />
			<span className="form-icon">{icon}</span>
		</div>
	);
}
