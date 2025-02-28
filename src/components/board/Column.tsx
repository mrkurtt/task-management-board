'use client';

import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import EditColumnTitle from './EditColumnTitle';
import TaskCard from './TaskCard';
import DeleteColumn from './DeleteColumn';
import { Task, useTaskBoardStore } from '@/stores/useTaskBoardStore';
import AddNewTask from './AddNewTask';

interface ColumnProps {
	id: string;
	index: number;
	name: string;
	tasks: Task[];
}

const Column = ({ name, index, id, tasks }: ColumnProps) => {
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
			<AddNewTask board_id={activeBoard!.id} column_id={id} />
			{tasks.map((task, index) => (
				<div key={`task-${index}`}>
					<TaskCard task={task} column_id={id} column_name={name} />
				</div>
			))}
		</div>
	);
};

export default Column;
