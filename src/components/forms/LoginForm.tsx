'use client';

import React, { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import AppTitle from '../shared/AppTitle';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useAuthStore((state) => state);

	const handleLogin = async () => {
		const loggedIn = await login(emailAddress, password);

		if (loggedIn) router.push('/boards');
	};

	return (
		<div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
			<AppTitle />
			<div className="flex flex-col mt-8 justify-center w-[90%] sm:w-[85%] md:w-[60%] lg:w-[40%] bg-white border border-gray-300 shadow rounded-lg p-8">
				<p className="text-center mb-8 font-semibold text-gray-800 text-2xl">
					Login to your account
				</p>
				<div className="flex flex-col gap-y-2">
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
				<Button label="Login" onPress={handleLogin} />

				<p className="text-xs text-center">
					Don't have an account?
					<span>
						<a href="/signup" className="font-semibold text-blue-500">
							{' '}
							Signup here
						</a>
					</span>
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
