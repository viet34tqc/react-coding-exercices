import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

const Label = ({
	children,
	htmlFor,
	...props
}: PropsWithChildren<ComponentPropsWithoutRef<'label'>>) => {
	return (
		<label htmlFor={htmlFor} {...props}>
			{children}
		</label>
	);
};

export default Label;
