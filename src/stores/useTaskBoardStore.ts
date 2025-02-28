import { create } from 'zustand';

// Data Structure
export interface Task {
	id: string;
	title: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High';
	due_date: string;
	tags: string[];
}

export interface Column {
	id: string;
	column_name: string;
	tasks?: Task[];
}

export interface Board {
	id: string;
	user_id: string;
	name: string;
	columns: Column[];
}

type BoardState = {
	boards: Board[];
	activeBoard: Board;
	setActiveBoard: (board: Board) => void;
	getBoardsByUserId: (userId: string) => void;
	getTasksByColumnId: (columnId: string) => Task[];
	addBoard: (userId: string, boardName: string) => void;
	addColumn: (boardId: string, columnName: string) => void;
	addTask: (boardId: string, columnId: string, task: Omit<Task, 'id'>) => void;
	updateColumnName: (
		boardId: string,
		columnId: string,
		newName: string
	) => void;
	updateTask: (
		boardId: string,
		columnId: string,
		taskId: string,
		updatedTask: Partial<Task>
	) => void;
	moveTaskToColumn: (
		boardId: string,
		fromColumnId: string,
		toColumnId: string,
		taskId: string
	) => void;
	deleteColumn: (boardId: string, columnId: string) => void;
	deleteTask: (boardId: string, columnId: string, taskId: string) => void;
	deleteBoard: (boardId: string) => void;
};

// LocalStorage Utility Functions
const getStoredBoards = (): Board[] => {
	if (typeof window !== 'undefined') {
		const storedBoards = localStorage.getItem('boards');
		return storedBoards ? JSON.parse(storedBoards) : [];
	}
	return [];
};

const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const saveBoardsToStorage = (boards: Board[]) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('boards', JSON.stringify(boards));
	}
};

export const useTaskBoardStore = create<BoardState>((set, get) => ({
	boards: getStoredBoards(),
	activeBoard: {
		id: '',
		user_id: '',
		name: '',
		columns: [],
	},

	setActiveBoard: (board) =>
		set({
			activeBoard: board,
		}),

	// Get all boards belonging to a user
	getBoardsByUserId: (userId) => {
		set({
			boards: getStoredBoards().filter((board) => board.user_id === userId),
		});
	},

	// Get all tasks inside a column
	getTasksByColumnId: (columnId) => {
		for (const board of get().boards) {
			for (const column of board.columns) {
				if (column.id === columnId) return column.tasks || [];
			}
		}
		return [];
	},

	// Add a new board
	addBoard: (userId, boardName) =>
		set((state) => {
			const newBoard: Board = {
				id: `board_${Date.now()}`,
				user_id: userId,
				name: boardName,
				columns: [
					{
						id: generateId(),
						column_name: 'To Do',
						tasks: [],
					},
					{
						id: generateId(),
						column_name: 'In Progress',
						tasks: [],
					},
					{
						id: generateId(),
						column_name: 'Done',
						tasks: [],
					},
				],
			};
			const updatedBoards = [...state.boards, newBoard];
			saveBoardsToStorage(updatedBoards);
			return { boards: updatedBoards };
		}),

	// Add a new column to a board
	addColumn: (boardId, columnName) =>
		set((state) => {
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: [
								...board.columns,
								{ id: `_${Date.now()}`, column_name: columnName, tasks: [] },
							],
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return {
				boards: updatedBoards,
				activeBoard: {
					...state.activeBoard,
					columns:
						updatedBoards.find((board) => board.id === boardId)?.columns || [],
				},
			};
		}),

	// Add a new task to a column
	addTask: (boardId, columnId, taskData) =>
		set((state) => {
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId
									? {
											...column,
											tasks: [
												...(column.tasks || []),
												{ id: `task_${Date.now()}`, ...taskData },
											],
									  }
									: column
							),
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return { boards: updatedBoards };
		}),

	// Update column name
	updateColumnName: (boardId, columnId, newName) =>
		set((state) => {
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId
									? { ...column, column_name: newName }
									: column
							),
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return {
				boards: updatedBoards,
				activeBoard: {
					...state.activeBoard,
					columns:
						updatedBoards.find((board) => board.id === boardId)?.columns || [],
				},
			};
		}),

	// Update task details
	updateTask: (boardId, columnId, taskId, updatedTask) =>
		set((state) => {
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId
									? {
											...column,
											tasks: (column.tasks ?? []).map((task) =>
												task.id === taskId ? { ...task, ...updatedTask } : task
											),
									  }
									: column
							),
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return { boards: updatedBoards };
		}),

	// Move task to another column
	moveTaskToColumn: (boardId, fromColumnId, toColumnId, taskId) =>
		set((state) => {
			let movedTask: Task | null = null;
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) => {
								if (column.id === fromColumnId) {
									// Remove the task from the original column
									movedTask =
										(column.tasks ?? []).find((task) => task.id === taskId) ||
										null;
									return {
										...column,
										tasks: (column.tasks ?? []).filter(
											(task) => task.id !== taskId
										),
									};
								}
								if (column.id === toColumnId && movedTask) {
									// Add the task to the new column
									return {
										...column,
										tasks: [...(column.tasks || []), movedTask],
									};
								}
								return column;
							}),
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return { boards: updatedBoards };
		}),

	// Delete a column and its tasks
	deleteColumn: (boardId, columnId) =>
		set((state) => {
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.filter((col) => col.id !== columnId),
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return {
				boards: updatedBoards,
				activeBoard: {
					...state.activeBoard,
					columns:
						updatedBoards.find((board) => board.id === boardId)?.columns || [],
				},
			};
		}),

	// Delete a task from a column
	deleteTask: (boardId, columnId, taskId) =>
		set((state) => {
			const updatedBoards = state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId
									? {
											...column,
											tasks: (column.tasks ?? []).filter(
												(task) => task.id !== taskId
											),
									  }
									: column
							),
					  }
					: board
			);
			saveBoardsToStorage(updatedBoards);
			return { boards: updatedBoards };
		}),

	// Delete an entire board
	deleteBoard: (boardId) =>
		set((state) => {
			const updatedBoards = state.boards.filter(
				(board) => board.id !== boardId
			);
			saveBoardsToStorage(updatedBoards);
			return { boards: updatedBoards };
		}),
}));
