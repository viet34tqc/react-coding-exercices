import clsx from 'clsx';
import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Here is tailwind class for variants
const variants = {
	primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600',
	secondary: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
};

type BaseProps = {
	variant?: keyof typeof variants;
};

type ButtonOrAnchorProps =
	BaseProps & ButtonHTMLAttributes<HTMLButtonElement> &
			LinkHTMLAttributes<HTMLLinkElement>

type ButtonAsRouterLink = BaseProps & LinkProps

type ButtonProps = ButtonAsRouterLink | ButtonOrAnchorProps ;

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
	// Here you can add style from tailwind, below is the demo
	const className = clsx(
		'flex items-center justify-center px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
		variants[variant],
		props.className
	);
	if ('to' in props) {
		return <Link className={className} {...props} />;
	}
	let As: string = 'button';
	
	// If you are using NextJs
	/* if (props.href) {
		return (
			<Link href={props.href}>
				<As className={className} {...newProps} />
			</Link>
		);
	} */
	if (props.href) {
		As = 'a';
	}
	const newProps = { ...props };
	if (As === 'button') {
		newProps['type'] = props.type ? props.type : 'button';
	}

	const content = <As className={className} {...newProps} />;
	return content;
};

export default Button;
