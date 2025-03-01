import React from 'react';
import { addToast } from '@heroui/react';

interface CustomToastProps {
	title: string;
	description: string;
	color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const toast = {
	showToast: ({ title, description, color }: CustomToastProps) =>
		addToast({
			title,
			description,
			color,
		}),
};
// const CustomToast = ({ title, description, color }: CustomToastProps) => {
// 	return addToast({
// 		title,
// 		description,
// 		color,
// 	});
// };

// export default CustomToast;
