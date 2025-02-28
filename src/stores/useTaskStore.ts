import { create } from 'zustand';

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: 'Low' | 'Medium' | 'High';
	dueDate: string;
	tags: string[];
	board_id: string;
	column_id: string;
}

type TaskState = {
	tasks: Task[];
	addNewTask: (taskData: Omit<Task, 'id'>) => void;
	updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
	deleteTask: (taskId: string) => void;
	getAllTasks: () => void;
	getTaskByBoardIdAndColumn: (boardId: string, columnId: string) => Task[];
};

const getStoredTasks = (): Task[] => {
	if (typeof window !== 'undefined') {
		const storedTasks = localStorage.getItem('tasks');
		return storedTasks ? JSON.parse(storedTasks) : [];
	}
	return [];
};

const saveTasksToStorage = (tasks: Task[]) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const useTaskStore = create<TaskState>((set, get) => ({
	tasks: getStoredTasks(),

	addNewTask: (taskData) =>
		set((state) => {
			const newTask: Task = {
				id: `task_${Date.now()}`,
				...taskData,
			};
			const updatedTasks = [...state.tasks, newTask];
			saveTasksToStorage(updatedTasks);
			return { tasks: updatedTasks };
		}),

	updateTask: (taskId, updatedTask) =>
		set((state) => {
			const updatedTasks = state.tasks.map((task) =>
				task.id === taskId ? { ...task, ...updatedTask } : task
			);
			saveTasksToStorage(updatedTasks);
			return { tasks: updatedTasks };
		}),

	deleteTask: (taskId) =>
		set((state) => {
			const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
			saveTasksToStorage(updatedTasks);
			return { tasks: updatedTasks };
		}),

	getAllTasks: () =>
		set(() => ({
			tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
		})),

	getTaskByBoardIdAndColumn: (boardId, columnId) => {
		return get().tasks.filter(
			(task) => task.board_id === boardId && task.column_id === columnId
		);
	},
}));
