import React from "react";
import classNames from "classnames";
import "../styles/main.scss";

type ToggleProps = React.HTMLAttributes<HTMLDivElement> & {
	id: string;
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
	labelPosition?: "before" | "after";
	className?: string;
};

export function Toggle({
	id,
	label,
	checked,
	onChange,
	disabled = false,
	labelPosition = "before",
	className,
	...props
}: ToggleProps): React.JSX.Element {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	const toggleElement: React.JSX.Element = (
		<div className={classNames("toggle", className)} {...props}>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={handleChange}
				disabled={disabled}
				aria-labelledby={label ? `${id}-label` : undefined}
			/>
			<span
				className="toggle-slider"
				onClick={disabled ? undefined : () => onChange(!checked)}
				role="button"
				tabIndex={disabled ? -1 : 0}
				onKeyDown={(e) => {
					if (!disabled && (e.key === "Enter" || e.key === " ")) {
						e.preventDefault();
						onChange(!checked);
					}
				}}
			/>
		</div>
	);

	if (!label) return toggleElement;

	return (
		<>
			{labelPosition === "before" && <label className="form-label" htmlFor={id}>{label}</label>}
			{toggleElement}
			{labelPosition === "after" && <label className="form-label" htmlFor={id}>{label}</label>}
		</>
	);
}
