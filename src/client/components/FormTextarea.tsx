import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FormGroup } from "./FormGroup";
import "../styles/main.scss";

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
	error?: string;
	required?: boolean;
	helpText?: string;
	autoResize?: boolean;
	maxLength?: number;
	showCount?: boolean;
};

export function FormTextarea({
	label,
	error,
	required,
	helpText,
	autoResize = false,
	maxLength,
	showCount = false,
	className,
	onChange,
	value,
	...props
}: FormTextareaProps): React.JSX.Element {
	const [charCount, setCharCount] = useState(0);
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (autoResize && textareaRef.current) {
			const textarea = textareaRef.current;
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [value, autoResize]);

	useEffect(() => {
		if (showCount && typeof value === "string") setCharCount(value.length);
	}, [value, showCount]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (showCount) setCharCount(e.target.value.length);
		onChange?.(e);
	};

	const textareaClasses = classNames("form-control", error && "has-error", className);

	const isOverLimit = maxLength && charCount > maxLength;

	const textareaElement = (
		<div className="form-textarea-wrapper">
			<textarea
				ref={textareaRef}
				className={textareaClasses}
				maxLength={maxLength}
				value={value}
				required={required}
				onChange={handleChange}
				{...props}
			/>
			{(showCount || maxLength) && (
				<div className={classNames("form-char-count", isOverLimit && "form-char-count--error")}>
					{showCount && <span>{charCount}</span>}
					{maxLength && <span>/{maxLength}</span>}
				</div>
			)}
		</div>
	);

	if (!label) {
		return (
			<>
				{textareaElement}
				{error && <div className="form-feedback danger">{error}</div>}
				{helpText && <div className="form-help">{helpText}</div>}
			</>
		);
	}

	return (
		<FormGroup label={label} className={error ? "has-error" : undefined}>
			{textareaElement}
			{error && <div className="form-feedback danger">{error}</div>}
			{helpText && <div className="form-help">{helpText}</div>}
		</FormGroup>
	);
}
