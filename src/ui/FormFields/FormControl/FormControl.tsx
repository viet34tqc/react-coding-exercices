import clsx from 'clsx';
import { PropsWithChildren } from 'react';

const FormControl = ({
	children,
	className = '',
	...props
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<div className={clsx('flex gap-[10px]', className)} {...props}>
			{children}
		</div>
	);
};

export default FormControl;
