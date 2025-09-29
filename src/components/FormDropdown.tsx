import React from "react";
import { FormGroup } from "./FormGroup.js";
import { Dropdown } from "./Dropdown.js";

type FormDropdownProps = React.ComponentProps<typeof Dropdown> & {
	label?: string;
	required?: boolean;
};

export function FormDropdown({ label, required, ...dropdownProps }: FormDropdownProps): React.JSX.Element {
	const dropdownElement = <Dropdown {...dropdownProps} />;

	if (!label) return dropdownElement;

	return <FormGroup label={label}>{dropdownElement}</FormGroup>;
}
