import { create } from 'zustand';

export interface Board {
	id: string;
	board_name: string;
	columns: string[];
	user: string;
}

type BoardState = {
	boards: Board[];
	activeBoard: Board | null;

	setActiveBoard: (board: Board) => void;
	addNewBoard: (board: Board) => void;

	newBoardname: string;
	setNewBoardName: (boardName: string) => void;

	newColumnTitle: string;
	setNewColumnTitle: (columnTitle: string) => void;
	addNewColumn: () => void;

	selectedTitle: string;
	setSelectedTitle: (title: string) => void;
	editColumnTitle: (columnIndex: number, newTitle: string) => void;
};

export const useBoardStore = create<BoardState>((set) => ({
	// boards: [
	// 	{
	// 		id: 'board_001',
	// 		board_name: 'Project Alpha',
	// 		columns: ['To Do', 'In Progress', 'Done'],
	// 		user: '/users/4DWh8LT6lHnX9sFgy4F',
	// 	},
	// 	{
	// 		id: 'board_002',
	// 		board_name: 'Website Redesign',
	// 		columns: ['Backlog', 'Design', 'Development', 'Testing', 'Completed'],
	// 		user: '/users/AkLd92DfLnX9tR3GhF5',
	// 	},
	// 	{
	// 		id: 'board_003',
	// 		board_name: 'Marketing Campaign',
	// 		columns: ['Ideas', 'Planned', 'Executing', 'Review', 'Finished'],
	// 		user: '/users/LmD82HsTgHnX9qW1Fx2',
	// 	},
	// ],
	boards: [],
	// Board
	activeBoard: null,
	setActiveBoard: (board: Board) => set({ activeBoard: board }),

	newBoardname: '',
	setNewBoardName: (name) =>
		set({
			newBoardname: name,
		}),
	addNewBoard: (board: Board) =>
		set((state) => ({
			boards: [...state.boards, board],
			newBoardname: '',
		})),

	// Column
	newColumnTitle: '',
	setNewColumnTitle: (title: string) =>
		set({
			newColumnTitle: title,
		}),
	addNewColumn: () =>
		set((state) => {
			if (!state.activeBoard || !state.newColumnTitle) return state;

			const updatedBoards = state.boards.map((board) =>
				board.id === state.activeBoard!.id
					? { ...board, columns: [...board.columns, state.newColumnTitle] }
					: board
			);

			return {
				boards: updatedBoards,
				activeBoard: {
					...state.activeBoard,
					columns: [...state.activeBoard.columns, state.newColumnTitle],
				},
				newColumnTitle: '',
			};
		}),

	// Edit Column Title
	selectedTitle: '',
	setSelectedTitle: (title: string) =>
		set({
			selectedTitle: title,
		}),
	editColumnTitle: (columnIndex: number, newTitle: string) =>
		set((state) => {
			if (!state.activeBoard) return state;

			const updatedColumns = [...state.activeBoard.columns];
			if (columnIndex >= 0 && columnIndex < updatedColumns.length) {
				updatedColumns[columnIndex] = newTitle;
			}

			const updatedBoards = state.boards.map((board) =>
				board.id === state.activeBoard!.id
					? { ...board, columns: updatedColumns }
					: board
			);

			return {
				boards: updatedBoards,
				activeBoard: {
					...state.activeBoard,
					columns: updatedColumns,
				},
			};
		}),
}));
