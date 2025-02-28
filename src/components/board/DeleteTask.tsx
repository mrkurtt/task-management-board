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
import { Task } from './TaskCard';

interface DeleteTaskProps {
	task: Task;
}
const DeleteTask = ({ task }: DeleteTaskProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Action
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
