'use client';

import React from 'react';
import moment from 'moment';
import { FaArrowRight } from 'react-icons/fa6';
import { useBoardStore } from '@/stores/useBoardStore';
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

interface TaskProps {
	task: Task;
}
const TaskCard = ({ task }: TaskProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { activeBoard } = useBoardStore((state) => state);

	return (
		<>
			<div
				onClick={onOpen}
				className="flex border border-gray-200 rounded-lg p-2 cursor-pointer"
			>
				<div className="w-full flex flex-col gap-y-2">
					<h1 className="font-semibold">{task.title}</h1>
					<hr />
					<p className="text-sm text-gray-500">{task.description}</p>
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
												? 'bg-green-200 text-green-700'
												: task.priority === 'Medium'
												? 'bg-orange-200 text-orange-700'
												: 'bg-red-200 text-red-700'
										}`}
									>
										{task.priority}
									</p>
								</div>
								<div className=" flex flex-col">
									<p className="font-semibold ">Due Date</p>
									<p className={`text-gray-700 text-sm rounded-full ml-4`}>
										{moment(task.dueDate).format('LL')}
									</p>
								</div>
								<div className=" flex flex-col">
									<p className="font-semibold ">Tags</p>
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
								<div className=" flex flex-col">
									<p className="font-semibold ">Actions</p>
									<div className="flex gap-x-1">
										<EditTask task={task} />
										<DeleteTask task={task} />
										<Dropdown>
											<DropdownTrigger>
												<div className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-green-200">
													<FaArrowRight size={20} />
												</div>
											</DropdownTrigger>
											<DropdownMenu aria-label="Static Actions">
												{activeBoard!.columns
													.filter((col) => col !== task.column_id)
													.map((col: any) => (
														<DropdownItem key={col}>{col}</DropdownItem>
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
