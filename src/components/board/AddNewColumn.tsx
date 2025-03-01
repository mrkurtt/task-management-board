import React, { useState } from 'react';
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
import { IoAdd } from 'react-icons/io5';
import { useTaskBoardStore } from '@/stores/useTaskBoardStore';
import { toast } from '../toast/CustomToast';

const AddNewColumnModal = () => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const { activeBoard, addColumn } = useTaskBoardStore((state) => state);
	const [columnName, setColumnName] = useState('');

	const handleAddNewColumn = () => {
		addColumn(activeBoard.id, columnName);
		onClose();
		toast.showToast({
			title: 'Success',
			description: `${columnName} column added successfully.`,
			color: 'success',
		});
	};

	return (
		<>
			<Button
				onPress={onOpen}
				startContent={<IoAdd size={20} />}
				size="sm"
				color="primary"
			>
				Add New Column
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add a New Column
							</ModalHeader>
							<ModalBody>
								<Input
									placeholder="Enter new column title"
									onChange={(e) => setColumnName(e.target.value)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									size="sm"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<Button size="sm" color="primary" onPress={handleAddNewColumn}>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddNewColumnModal;
