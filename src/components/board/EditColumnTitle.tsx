'use client';

import React, { useEffect, useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
} from '@heroui/react';
import { CiEdit } from 'react-icons/ci';
import { useTaskBoardStore } from '@/stores/useTaskBoardStore';

const EditColumnTitle = ({
	initialTitle,
	id,
}: {
	columnIndex: number;
	initialTitle: string;
	id: string;
}) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { activeBoard, updateColumnName } = useTaskBoardStore((state) => state);
	const [columnTitle, setColumnTitle] = useState(initialTitle);
	const [selectedTitle, setSelectedTitle] = useState('');

	const handleEditColumn = () => {
		if (columnTitle.trim() !== '') {
			updateColumnName(activeBoard.id, id, columnTitle);
			onClose();
		}
	};

	useEffect(() => {
		setColumnTitle(selectedTitle || initialTitle);
	}, [selectedTitle, initialTitle]);

	return (
		<>
			<button
				type="button"
				title="Edit Column"
				className="bg-white p-1 rounded-lg hover:bg-gray-100"
				onClick={() => {
					setSelectedTitle(initialTitle);
					onOpen();
				}}
			>
				<CiEdit />
			</button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Edit Column Title
							</ModalHeader>
							<ModalBody>
								<Input
									placeholder="Enter new column title"
									value={columnTitle}
									onChange={(e) => setColumnTitle(e.target.value)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									size="sm"
									variant="light"
									onPress={onClose}
								>
									Cancel
								</Button>
								<Button size="sm" color="primary" onPress={handleEditColumn}>
									Save
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditColumnTitle;
