import React from "react";
import classNames from "classnames";
import "../assets/styles/components/_checkbox_&_radio.scss";

type CheckboxOption = {
	id: string;
	label: string;
	description?: string;
	disabled?: boolean;
}

type CheckboxProps = {
	name: string;
	legend: string;
	options: CheckboxOption[];
	values: string[];
	onChange: (values: string[]) => void;
	layout?: "vertical" | "horizontal" | "grid";
	disabled?: boolean;
	className?: string;
}

export function CheckboxList({
	name,
	legend,
	options,
	values,
	onChange,
	layout = 'vertical',
	disabled = false,
	className
}: CheckboxProps): React.JSX.Element {
	const handleChange = (optionId: string, checked: boolean) => {
		if (checked) onChange([...values, optionId]);
		else onChange(values.filter(v => v !== optionId));
	};

	return (
		<fieldset
			className={classNames(
				"checkbox-list",
				`checkbox-list--${layout}`,
				className
			)}
			disabled={disabled}
		>
			<legend className="checkbox-list-legend">{legend}</legend>
			<div className="checkbox-list-items">
				{options.map((option) => (
					<div key={option.id} className="form-check">
						<input
							type="checkbox"
							id={`${name}-${option.id}`}
							checked={values.includes(option.id)}
							onChange={(e) => handleChange(option.id, e.target.checked)}
							disabled={option.disabled}
							className="form-check-input"
						/>
						<label className="form-check-label" htmlFor={`${name}-${option.id}`}>
							{option.label}
						</label>
						{option.description && (
							<div className="form-check-description">{option.description}</div>
						)}
					</div>
				))}
			</div>
		</fieldset>
	);
}
