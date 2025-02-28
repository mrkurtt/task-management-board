'use client';

import React from 'react';
import {
	useDisclosure,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@heroui/react';
import { MdDeleteOutline } from 'react-icons/md';
import { Task, useTaskBoardStore } from '@/stores/useTaskBoardStore';

interface DeleteTaskProps {
	task: Task;
	column_id: string;
}
const DeleteTask = ({ task, column_id }: DeleteTaskProps) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { activeBoard, deleteTask } = useTaskBoardStore((state) => state);

	const handleDelete = () => {
		deleteTask(activeBoard.id, column_id, task.id);
		onClose();
		onClose();
	};

	return (
		<div>
			<div
				onClick={onOpen}
				className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-red-200"
			>
				<MdDeleteOutline size={20} />
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Delete Task
							</ModalHeader>
							<ModalBody>
								<p>Are you sure you want to delete this task?</p>
							</ModalBody>
							<ModalFooter>
								<Button color="default" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="danger" onPress={handleDelete}>
									Delete
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default DeleteTask;
