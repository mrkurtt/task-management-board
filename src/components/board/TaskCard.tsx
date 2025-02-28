'use client';

import React, { useState } from 'react';
import moment from 'moment';
import { FaArrowRight } from 'react-icons/fa6';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	useDisclosure,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from '@heroui/react';
import { Column, Task, useTaskBoardStore } from '@/stores/useTaskBoardStore';

interface TaskProps {
	task: Task;
	column_id: string;
	column_name: string;
}

const TaskCard = ({ task, column_id, column_name }: TaskProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { activeBoard, moveTaskToColumn } = useTaskBoardStore((state) => state);
	const [toColumn, setToColumn] = useState('');

	const handleMoveTask = () => {
		moveTaskToColumn(activeBoard.id, column_id, toColumn, task.id);
	};
	return (
		<>
			<div
				onClick={onOpen}
				className="flex border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
			>
				<div className="w-full flex flex-col gap-y-2">
					<div
						className={`w-16 flex justify-center text-xs rounded-full ${
							task.priority === 'Low'
								? 'bg-green-300'
								: task.priority === 'Medium'
								? 'bg-orange-300'
								: 'bg-red-300'
						}`}
					>
						{task.priority}
					</div>
					<h1 className="font-semibold">{task.title}</h1>
					<hr />
					<p className="text-xs text-gray-500">{task.description}</p>
					<div className="flex gap-x-1">
						{task.tags.map((tag, index) => (
							<div
								key={`tag-${index}`}
								className="text-xs bg-blue-200 text-blue-600 rounded-full py-1 px-2 "
							>
								{tag}
							</div>
						))}
					</div>
				</div>
			</div>
			<Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
				<DrawerContent>
					{(onClose) => (
						<>
							<DrawerHeader className="flex flex-col gap-1">
								<h1>{task.title}</h1>
							</DrawerHeader>
							<DrawerBody>
								<div className="flex flex-col">
									<p className="font-semibold ">Description</p>
									<p className="text-gray-700 text-sm ml-4">
										{task.description}
									</p>
								</div>
								<div className=" flex flex-col">
									<p className="font-semibold">Priority</p>
									<p
										className={`ml-4 text-gray-700 text-sm rounded-full px-2 text-center w-24 ${
											task.priority == 'Low'
												? 'bg-green-300 '
												: task.priority === 'Medium'
												? 'bg-orange-300 '
												: 'bg-red-300 '
										}`}
									>
										{task.priority}
									</p>
								</div>
								<div className=" flex flex-col">
									<p className="font-semibold ">Due Date</p>
									<p className={`text-gray-700 text-sm rounded-full ml-4`}>
										{moment(task.due_date).format('LL')}
									</p>
								</div>
								<div className=" flex flex-col">
									<p className="font-semibold ">Tags</p>
									<div className="flex gap-x-1 pl-4">
										{task.tags.map((tag, index) => (
											<div
												key={`tag-${index}`}
												className="text-xs bg-blue-200 text-blue-600 rounded-full py-1 px-2 "
											>
												{tag}
											</div>
										))}
									</div>
								</div>
								<div className=" flex flex-col">
									<p className="font-semibold ">Actions</p>
									<div className="flex gap-x-1">
										<EditTask task={task} column_id={column_id} />
										<DeleteTask task={task} column_id={column_id} />
										<Dropdown>
											<DropdownTrigger>
												<div className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-green-200">
													<FaArrowRight size={20} />
												</div>
											</DropdownTrigger>
											<DropdownMenu aria-label="Static Actions">
												{activeBoard?.columns
													.filter(
														(col: Column) => col.column_name !== column_name
													)
													.map((col: Column) => (
														<DropdownItem
															key={col.id}
															onPress={() => {
																setToColumn(col.column_name);
																handleMoveTask();
																onClose();
															}}
														>
															{col.column_name}
														</DropdownItem>
													))}
											</DropdownMenu>
										</Dropdown>
									</div>
								</div>
							</DrawerBody>
							<DrawerFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
							</DrawerFooter>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default TaskCard;
