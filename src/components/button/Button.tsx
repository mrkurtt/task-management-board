import React from 'react';

interface ButtonProps {
	label: string;
	color?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
	label,
	onClick,
	color = 'bg-blue-500 hover:bg-blue-600',
}: ButtonProps) => {
	return (
		<button
			className={`w-full ${color} text-white text-sm py-2 my-2 rounded-lg hover:cursor-pointer`}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
