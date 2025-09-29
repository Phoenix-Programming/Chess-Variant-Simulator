import React from "react";
import classNames from "classnames";
import "../assets/styles/components/_checkbox_&_radio.scss";

type RadioOption = {
	value: string;
	label: string;
	disabled?: boolean;
	description?: string;
};

type RadioProps = React.HTMLAttributes<HTMLFieldSetElement> & {
	name: string;
	label: string;
	options: RadioOption[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	layout?: "vertical" | "horizontal";
	className?: string;
};

export function Radio({
	name,
	label,
	options,
	value,
	onChange,
	disabled = false,
	layout = "vertical",
	className,
	...props
}: RadioProps): React.JSX.Element {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<fieldset className={classNames("form-group", className)} disabled={disabled} {...props}>
			<legend className="form-label">{label}</legend>
			<div className={classNames("form-radio-group", `form-radio-group--${layout}`)}>
				{options.map((option, index) => (
					<div key={option.value} className="form-check">
						<input
							type="radio"
							id={`${name}-${option.value}`}
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={handleChange}
							disabled={option.disabled}
							className="form-check-input"
						/>
						<label className="form-check-label" htmlFor={`${name}-${option.value}`}>
							{option.label}
						</label>
						{option.description && (
							<div id={`${name}-${option.value}-description`} className="form-check-description">
								{option.description}
							</div>
						)}
					</div>
				))}
			</div>
		</fieldset>
	);
}
