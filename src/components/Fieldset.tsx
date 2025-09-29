import React from "react";
import classNames from "classnames";
import "../assets/styles/components/_form.scss";

type FieldsetProps = React.HTMLAttributes<HTMLFieldSetElement> & {
	legend: string;
	children: React.ReactNode;
	className?: string;
};

export function Fieldset({ legend, children, className, ...props }: FieldsetProps): React.JSX.Element {
	return (
		<fieldset className={classNames("fieldset", className)} {...props}>
			<legend className="fieldset-legend">{legend}</legend>
			{children}
		</fieldset>
	);
}
