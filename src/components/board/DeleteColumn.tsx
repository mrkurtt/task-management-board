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
import { useTaskBoardStore } from '@/stores/useTaskBoardStore';
import { toast } from '../toast/CustomToast';

interface DeleteColumnProps {
	id: string;
}

const DeleteColumn = ({ id }: DeleteColumnProps) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { deleteColumn, activeBoard } = useTaskBoardStore((state) => state);

	const handleDeleteColumn = () => {
		deleteColumn(activeBoard.id, id);
		onClose();
		toast.showToast({
			title: 'Success',
			description: `Column deleted successfully.`,
			color: 'success',
		});
	};

	return (
		<div>
			<button
				type="button"
				title="Delete Column"
				className="bg-white p-1 rounded-lg hover:bg-gray-100"
				onClick={() => {
					onOpen();
				}}
			>
				<MdDeleteOutline className="text-red-500" />
			</button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Delete Column
							</ModalHeader>
							<ModalBody>
								<p>Are you sure you want to delete this column?</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="danger" onPress={handleDeleteColumn}>
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

export default DeleteColumn;
