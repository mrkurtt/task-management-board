import { Button, PressEvent } from '@heroui/react';
import React from 'react';

interface ButtonProps {
	label: string;
	color?: string;
	onPress?: ((e: PressEvent) => void) | undefined;
}

const CustomButton = ({
	label,
	onPress,
	color = 'bg-blue-500 hover:bg-blue-600',
}: ButtonProps) => {
	return (
		<Button
			onPress={onPress}
			className={`w-full ${color} text-white text-sm py-2 my-2 rounded-lg hover:cursor-pointer`}
		>
			{label}
		</Button>
	);
};

export default CustomButton;
