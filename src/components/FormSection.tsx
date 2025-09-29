import React, { useState } from "react";
import classNames from "classnames";
import "../assets/styles/components/_form.scss"

type FormSectionProps = React.HTMLAttributes<HTMLDivElement> & {
	title: string;
	subtitle?: string;
	collapsible?: boolean;
	defaultExpanded?: boolean;
	children: React.ReactNode;
	className?: string;
}

export function FormSection({
	title,
	subtitle,
	collapsible = false,
	defaultExpanded = true,
	children,
	className,
	...props
}: FormSectionProps): React.JSX.Element {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	const toggleExpanded = () => {
		if (collapsible) setIsExpanded(!isExpanded);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (collapsible && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			toggleExpanded();
		}
	};

	return (
		<div
			className={classNames(
				"form-section",
				collapsible && "form-section--collapsible",
				!isExpanded && "form-section--collapsed",
				className
			)}
			{...props}
		>
			<div
				className="form-section-header"
				onClick={toggleExpanded}
				onKeyDown={handleKeyDown}
				role={collapsible ? "button" : undefined}
				tabIndex={collapsible ? 0 : undefined}
				aria-expanded={collapsible ? isExpanded : undefined}
			>
				<div className="form-section-header-content">
					<h3 className="form-section-title">{title}</h3>
					{subtitle && (
						<p className="form-section-subtitle">{subtitle}</p>
					)}
				</div>
				{collapsible && (
					<span className="form-section-toggle">{isExpanded ? "-" : "+"}</span>
				)}
			</div>
			{isExpanded && (
				<div className="form-section-content">{children}</div>
			)}
		</div>
	);
}
