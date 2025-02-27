'use client';

import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import AppTitle from '@/components/shared/AppTitle';
import React, { useState } from 'react';

const SignUpPage: React.FC = () => {
	const [name, setName] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');

	const handleCreateAccount = async () => {};

	return (
		<div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
			<AppTitle />
			<div className="flex flex-col mt-8 justify-center w-[90%] sm:w-[85%] md:w-[60%] lg:w-[40%] bg-white border border-gray-300 shadow rounded-lg p-8">
				<p className="text-center mb-8 font-semibold text-gray-800 text-2xl">
					Create Your Account
				</p>
				<div className="flex flex-col gap-y-2">
					<Input
						label="Complete Name"
						placeholder="Enter your complete name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						label="Email Address"
						placeholder="Enter your email address"
						value={emailAddress}
						onChange={(e) => setEmailAddress(e.target.value)}
					/>
					<Input
						label="Password"
						placeholder="Enter your password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<Button label="Create Account" onClick={handleCreateAccount} />
				<p className="text-xs text-center">
					Already have an account?
					<span>
						<a href="/" className="font-semibold text-blue-500">
							{' '}
							Login
						</a>
					</span>
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;
