import React from "react";
import classNames from "classnames";
import "../assets/styles/main.scss";

type NavItem = {
	label: string;
	href: string;
	active?: boolean;
};

type NavBarProps = {
	brand: {
		text: string;
		href: string;
	};
	items: NavItem[];
	onItemClick?: (href: string) => void;
	className?: string;
};

export function NavBar({ brand, items, onItemClick, className }: NavBarProps): React.JSX.Element {
	const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (onItemClick) {
			e.preventDefault();
			onItemClick(href);
		}
	};

	return (
		<nav className={classNames("navbar", className)}>
			<div className="navbar-container">
				<a href={brand.href} className="navbar-brand">{brand.text}</a>
				<ul className="navbar-nav">
					{items.map((item, index) => (
						<li key={item.href || index} className="navbar-item">
							<a
								href={item.href}
								className={classNames(`navbar-link`, item.active ? "active" : "")}
								onClick={(e) => handleItemClick(e, item.href)}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
