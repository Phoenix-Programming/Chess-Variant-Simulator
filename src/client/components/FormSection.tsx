import React, { useState } from "react";
import classNames from "classnames";
import "../styles/main.scss";

type FormSectionProps = React.HTMLAttributes<HTMLDivElement> & {
	title: string;
	subtitle?: string;
	collapsible?: boolean;
	defaultExpanded?: boolean;
	children: React.ReactNode;
	className?: string;
};

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
	const [isCollapsing, setIsCollapsing] = useState(false);

	const toggleExpanded = () => {
		if (!collapsible) return;

		if (isExpanded) {
			setIsCollapsing(true);
			setTimeout(() => {
				setIsExpanded(false);
				setIsCollapsing(false);
			}, 200);
		} else setIsExpanded(true);
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
				!isExpanded && !isCollapsing && "form-section--collapsed",
				isCollapsing && "form-section--collapsing",
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
					{subtitle && <p className="form-section-subtitle">{subtitle}</p>}
				</div>
				{collapsible && <span className="form-section-toggle">{isExpanded && !isCollapsing ? "-" : "+"}</span>}
			</div>
			{(isExpanded || isCollapsing) && <div className="form-section-content">{children}</div>}
		</div>
	);
}
