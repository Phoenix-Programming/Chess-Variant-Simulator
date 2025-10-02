import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

export type DropdownOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	options: DropdownOption[];
	onChange?: (value: string) => void;
	className?: string;
};

export function Dropdown({
	options,
	value,
	disabled = false,
	className,
	onChange,
	...props
}: DropdownProps): React.JSX.Element {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		onChange?.(selectedValue);
	};

	const dropdownClasses = classNames("dropdown", { "dropdown--disabled": disabled }, className);

	return (
		<select className={dropdownClasses} value={value || ""} disabled={disabled} onChange={handleChange} {...props}>
			{options.map((option) => (
				<option key={option.value} value={option.value} disabled={option.disabled}>
					{option.label}
				</option>
			))}
		</select>
	);
}
