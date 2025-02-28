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
	tasks: Task[];
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
	user_id: string;
	setUser: (user: string) => void;
};

const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

export const useTaskBoardStore = create<BoardState>((set, get) => ({
	user_id: '',
	setUser: (user: string) =>
		set({
			user_id: user,
		}),
	boards: [],
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
			boards: get().boards.filter((board) => board.user_id === userId),
		});
	},

	// Get all tasks inside a column
	getTasksByColumnId: (columnId) => {
		for (const board of get().boards) {
			for (const column of board.columns) {
				if (column.id === columnId) return column.tasks;
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

			const updatedBoard = updatedBoards.find((board) => board.id === boardId);

			return {
				boards: updatedBoards,
				activeBoard: updatedBoard,
			};
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
			const updatedBoard = updatedBoards.find((board) => board.id === boardId);

			return {
				boards: updatedBoards,
				activeBoard: updatedBoard,
			};
		}),

	// Move task to another column
	moveTaskToColumn: (boardId, fromColumnId, toColumnId, taskId) =>
		set((state) => {
			const boardIndex = state.boards.findIndex(
				(board) => board.id === boardId
			);
			if (boardIndex === -1) return state;

			const board = state.boards[boardIndex];

			const fromColumnIndex = board.columns.findIndex(
				(col) => col.id === fromColumnId
			);
			if (fromColumnIndex === -1) return state;

			const toColumnIndex = board.columns.findIndex(
				(col) => col.id === toColumnId
			);
			if (toColumnIndex === -1) return state;

			// Find and remove the task from the source column
			const taskIndex =
				board.columns[fromColumnIndex].tasks?.findIndex(
					(task) => task.id === taskId
				) ?? -1;
			if (taskIndex === -1) return state;

			const movedTask = board.columns[fromColumnIndex].tasks?.[taskIndex];

			const updatedColumns = board.columns.map((col, index) => {
				if (index === fromColumnIndex) {
					return {
						...col,
						tasks: (col.tasks ?? []).filter((task) => task.id !== taskId),
					};
				}
				if (index === toColumnIndex) {
					return {
						...col,
						tasks: [...(col.tasks || []), movedTask],
					};
				}
				return col;
			});

			const updatedBoard = {
				...board,
				columns: updatedColumns,
			};

			const updatedBoards: any = state.boards.map((b, i) =>
				i === boardIndex ? updatedBoard : b
			);

			return {
				boards: updatedBoards,
				activeBoard: updatedBoard,
			};
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
			const updatedBoard = updatedBoards.find((board) => board.id === boardId);

			return {
				boards: updatedBoards,
				activeBoard: updatedBoard,
			};
		}),

	// Delete an entire board
	deleteBoard: (boardId) =>
		set((state) => {
			const updatedBoards = state.boards.filter(
				(board) => board.id !== boardId
			);
			return { boards: updatedBoards };
		}),
}));
