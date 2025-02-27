'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	const validateForm = () => {
		let valid = true;
		const newErrors = { ...errors };

		// Name validation
		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
			valid = false;
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
			valid = false;
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = 'Password is required';
			valid = false;
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters long';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			// Simulate API call with timeout
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Success handling
			console.log('Form submitted successfully', formData);
			setSubmitSuccess(true);

			// Reset form after success
			setFormData({
				name: '',
				email: '',
				password: '',
			});
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">
				Create your account
			</h2>

			{submitSuccess && (
				<div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
					Account created successfully! Please check your email for
					verification.
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Full Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							errors.name ? 'border-red-500' : 'border-gray-300'
						}`}
						placeholder="Enter your name"
					/>
					{errors.name && (
						<p className="mt-1 text-sm text-red-600">{errors.name}</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							errors.email ? 'border-red-500' : 'border-gray-300'
						}`}
						placeholder="Enter your email"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-600">{errors.email}</p>
					)}
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
								errors.password ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder="Create a password"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					{errors.password && (
						<p className="mt-1 text-sm text-red-600">{errors.password}</p>
					)}
					<p className="mt-1 text-xs text-gray-500">
						Password must be at least 8 characters long
					</p>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
				>
					{isSubmitting ? 'Creating Account...' : 'Sign Up'}
				</button>
			</form>

			<div className="mt-4 text-center text-sm text-gray-600">
				Already have an account?{' '}
				<a
					href="/login"
					className="font-medium text-blue-600 hover:text-blue-500"
				>
					Log in
				</a>
			</div>
		</div>
	);
}
