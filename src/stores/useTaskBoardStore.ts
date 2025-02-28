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
									const taskIndex = column.tasks?.findIndex(
										(task) => task.id === taskId
									);
									if (taskIndex !== undefined && taskIndex !== -1) {
										movedTask = column.tasks?.[taskIndex] || null;
										const updatedTasks = column.tasks ? [...column.tasks] : [];
										updatedTasks.splice(taskIndex, 1);
										return { ...column, tasks: updatedTasks };
									}
								}
								return column;
							}),
					  }
					: board
			);

			if (movedTask) {
				const updatedBoardsWithMovedTask = updatedBoards.map((board) =>
					board.id === boardId
						? {
								...board,
								columns: board.columns.map((column) =>
									column.id === toColumnId
										? {
												...column,
												tasks: [...(column.tasks || []), movedTask!],
										  }
										: column
								),
						  }
						: board
				);

				return {
					boards: updatedBoardsWithMovedTask,
					activeBoard:
						updatedBoardsWithMovedTask.find((b) => b.id === boardId) ||
						state.activeBoard,
				};
			}

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
			return { boards: updatedBoards };
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
