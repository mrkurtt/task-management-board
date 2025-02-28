import { create } from 'zustand';

interface User {
	user_id: string;
	name: string;
	email: string;
	password: string;
}

type AuthState = {
	currentUser: User | null;
	signUp: (name: string, email: string, password: string) => boolean;
	login: (email: string, password: string) => boolean;
	logout: () => void;
	// getUser: () => User
};

const generateUserId = () => `user_${Math.random().toString(36).substr(2, 9)}`;

const saveUsersToStorage = (users: User[]) => {
	localStorage.setItem('users', JSON.stringify(users));
};

const saveSession = (user: User | null) => {
	localStorage.setItem('currentUser', JSON.stringify(user));
};

export const useAuthStore = create<AuthState>((set) => ({
	currentUser: JSON.parse(localStorage.getItem('currentUser') || '{}'),

	signUp: (name, email, password) => {
		const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

		// Check if email is already registered
		if (users.some((user) => user.email === email)) {
			return false;
		}

		// Create new user
		const newUser: User = {
			user_id: generateUserId(),
			name,
			email,
			password,
		};

		const updatedUsers = [...users, newUser];
		saveUsersToStorage(updatedUsers);
		saveSession(newUser);

		set({ currentUser: newUser });

		return true;
	},

	login: (email, password) => {
		const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

		const foundUser = users.find(
			(user) => user.email === email && user.password === password
		);

		if (!foundUser) {
			return false;
		}

		saveSession(foundUser);
		set({ currentUser: foundUser });

		return true;
	},

	logout: () => {
		localStorage.removeItem('currentUser');
		set({ currentUser: null });
	},
}));
