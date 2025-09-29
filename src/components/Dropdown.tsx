import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "../assets/styles/components/_dropdown.scss";

export type DropdownOption = {
	value: string;
	label: string;
	disabled?: boolean;
}

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
	options: DropdownOption[];
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	onChange?: (value: string) => void;
	className?: string;
}

export function Dropdown({
	options,
	value,
	placeholder = "Select an option...",
	disabled = false,
	className,
	onChange,
	...props
}: DropdownProps): React.JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const dropdownRef = React.useRef<HTMLDivElement>(null);

	const selectedOption = options.find(option => option.value === value);
	const selectedLabel = selectedOption?.label || placeholder;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				setFocusedIndex(-1);
			}
		};

		if (isOpen) document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (disabled) return;

		switch (event.key) {
			case "Enter":
			case " ":
				if (!isOpen) setIsOpen(true);
				else if (focusedIndex >= 0) {
					const focusedOption = options[focusedIndex];
					if (focusedOption && !focusedOption.disabled)
						handleSelect(focusedOption.value);
				}
				event.preventDefault();
				break;
			case "Escape":
				setIsOpen(false);
				setFocusedIndex(-1);
				break;
			case "ArrowDown":
				if (!isOpen) setIsOpen(true);
				else {
					const nextIndex = Math.min(focusedIndex + 1, options.length - 1);
					setFocusedIndex(nextIndex);
				}
				event.preventDefault();
				break;
			case "ArrowUp":
				if (isOpen) {
					const prevIndex = Math.max(focusedIndex - 1, -1);
					setFocusedIndex(prevIndex);
				}
				event.preventDefault();
				break;
		}
	};

	const handleSelect = (optionValue: string) => {
		const option = options.find(opt => opt.value === optionValue);
		if (option && !option.disabled) {
			onChange?.(optionValue);
			setIsOpen(false);
			setFocusedIndex(-1);
		}
	};

	const dropdownClasses = classNames(
		"dropdown",
		{
			"dropdown--open": isOpen,
			"dropdown--disabled": disabled
		},
		className
	);

	const triggerClasses = classNames(
		"dropdown__trigger",
		{"dropdown__trigger--placeholder": !selectedOption}
	);

	return (
		<div
			ref={dropdownRef}
			className={dropdownClasses}
			onKeyDown={handleKeyDown}
			tabIndex={disabled ? -1 : 0}
		>
			<button
				type="button"
				className={triggerClasses}
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className="dropdown__trigger-text">{selectedLabel}</span>
				<span className="dropdown__trigger-arrow" />
			</button>

			{isOpen && (
				<div className="dropdown__menu" role="listbox">
					<div className="dropdown__options">
						{options.length === 0 ? (
							<div className="dropdown__empty">No options available</div>
						) : (
							options.map((option, index) => {
								const isSelected = option.value === value;
								const isFocused = index === focusedIndex;

								return (
									<div
										key={option.value}
										className={classNames(
											"dropdown__option",
											{
												"dropdown__option--selected": isSelected,
												"dropdown__option--focused": isFocused,
												"dropdown__option--disabled": option.disabled
											}
										)}
										onClick={() => handleSelect(option.value)}
										onMouseEnter={() => setFocusedIndex(index)}
									>
										<span className="dropdown__option-label">{option.label}</span>
										{isSelected && <span className="dropdown__option-check">✓</span>}
									</div>
								);
							})
						)}
					</div>
				</div>
			)}
		</div>
	);
};
