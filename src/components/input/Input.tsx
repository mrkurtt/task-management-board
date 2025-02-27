import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder?: string;
	value?: string;
	type?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	label,
	placeholder,
	value,
	onChange,
	type = 'text',
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className="flex flex-col mb-4 relative">
			{label && <label className="text-xs text-gray-700 mb-1">{label}</label>}
			<div className="relative">
				<input
					type={type === 'password' && !showPassword ? 'password' : 'text'}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className="w-full p-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 bg-white text-gray-800 pr-10"
					{...props}
				/>
				{type === 'password' && (
					<button
						type="button"
						className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
						onClick={togglePasswordVisibility}
					>
						{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
					</button>
				)}
			</div>
		</div>
	);
};

export default Input;
