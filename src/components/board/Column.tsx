'use client';

import React, { useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import EditColumnTitle from './EditColumnTitle';
import TaskCard, { Task } from './TaskCard';
import DeleteColumn from './DeleteColumn';
import { useTaskBoardStore } from '@/stores/useTaskBoardStore';
import AddNewTask from './AddNewTask';

interface ColumnProps {
	id: string;
	index: number;
	name: string;
}

const Column = ({ name, index, id }: ColumnProps) => {
	const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
	const { activeBoard } = useTaskBoardStore((state) => state);

	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between bg-white border border-gray-300 p-2 rounded-lg ">
				<div className="flex items-center gap-x-2 ">
					<FaCircle color="#0C7BFC" size={10} />{' '}
					<h1 className="text-sm">{name}</h1>
				</div>
				<div className="flex items-center">
					<EditColumnTitle columnIndex={index} initialTitle={name} id={id} />
					<DeleteColumn id={id} />
				</div>
			</div>
			<AddNewTask board_id={activeBoard!.id} column_id={name} />
			{fetchedTasks.map((task, index) => (
				<div key={`task-${index}`}>
					<TaskCard task={task} />
				</div>
			))}
		</div>
	);
};

export default Column;
