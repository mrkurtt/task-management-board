import { create } from 'zustand';

export interface Board {
	id: string;
	board_name: string;
	columns: string[];
	user: string;
}

type BoardState = {
	boards: Board[];
};

export const useBoardStore = create<BoardState>((set, get) => ({
	boards: [
		{
			id: 'board_001',
			board_name: 'Project Alpha',
			columns: ['To Do', 'In Progress', 'Done'],
			user: '/users/4DWh8LT6lHnX9sFgy4F',
		},
		{
			id: 'board_002',
			board_name: 'Website Redesign',
			columns: ['Backlog', 'Design', 'Development', 'Testing', 'Completed'],
			user: '/users/AkLd92DfLnX9tR3GhF5',
		},
		{
			id: 'board_003',
			board_name: 'Marketing Campaign',
			columns: ['Ideas', 'Planned', 'Executing', 'Review', 'Finished'],
			user: '/users/LmD82HsTgHnX9qW1Fx2',
		},
	],
}));
