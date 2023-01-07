// Source: https://dev.to/frehner/polymorphic-button-component-in-typescript-c28

import * as React from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

type BaseProps = {
	children: React.ReactNode;
	className?: string;
	styleType: 'primary' | 'secondary' | 'tertiary';
};

type ButtonAsButton = BaseProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
		as?: 'button';
	};

type ButtonAsUnstyled = Omit<ButtonAsButton, 'as' | 'styleType'> & {
	as: 'unstyled';
	styleType?: BaseProps['styleType'];
};

type ButtonAsLink = BaseProps &
	Omit<LinkProps, keyof BaseProps> & {
		as: 'link';
	};

type ButtonAsExternal = BaseProps &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
		as: 'externalLink';
	};

type ButtonProps =
	| ButtonAsButton
	| ButtonAsExternal
	| ButtonAsLink
	| ButtonAsUnstyled;

export function Button(props: ButtonProps): JSX.Element {
	const allClassNames = `${props.styleType ? props.styleType : ''} ${
		props.className ? props.className : ''
	}`;

	if (props.as === 'link') {
		// don't pass unnecessary props to component
		const { className, styleType, as, ...rest } = props;
		return <Link className={allClassNames} {...rest} />;
	} else if (props.as === 'externalLink') {
		const { className, styleType, as, ...rest } = props;
		return (
			<a
				className={allClassNames}
				// provide good + secure defaults while still allowing them to be overwritten
				target="_blank"
				rel="noopener noreferrer"
				{...rest}
			>
				{props.children}
			</a>
		);
	} else if (props.as === 'unstyled') {
		const { className, styleType, as, ...rest } = props;
		return <button className={className} {...rest} />;
	} else {
		const { className, styleType, as, ...rest } = props;
		return <button className={allClassNames} {...rest} />;
	}
}
