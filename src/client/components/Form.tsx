import React from "react";
import { Card } from "./Card";


type FormProps = React.HTMLAttributes<HTMLDivElement> & {
	title?: string;
	children: React.ReactNode;  //form groups
};

export function Form({ title, children, className, ...props }: FormProps): React.JSX.Element {
	return (
		<Card
			className={className}
			header={title ? <h3>{title}</h3> : undefined}
			{...props}
		>
			<form>{children}</form>
		</Card>
	);
}
