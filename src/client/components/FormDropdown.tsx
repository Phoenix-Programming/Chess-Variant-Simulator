import React from "react";
import { FormGroup } from "./FormGroup";
import { Dropdown } from "./Dropdown";
import classNames from "classnames";

type FormDropdownProps = React.ComponentProps<typeof Dropdown> & {
	label?: string;
	required?: boolean;
};

export function FormDropdown({ label, required, ...dropdownProps }: FormDropdownProps): React.JSX.Element {
	const dropdownElement = <Dropdown {...dropdownProps} data-required={required} />;

	if (!label) return dropdownElement;

	return (
		<FormGroup className="form-group">
			<label className={classNames("form-label", { required })}>{label}</label>
			{dropdownElement}
		</FormGroup>
	);
}
