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
import { useBoardStore } from '@/stores/useBoardStore';
import { useTaskBoardStore } from '@/stores/useTaskBoardStore';
import { useAuthStore } from '@/stores/useAuthStore';

const AddBoardModal = () => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { addBoard } = useTaskBoardStore((state) => state);
	const { currentUser } = useAuthStore((state) => state);
	const [boardName, setBoardName] = useState('');

	const handleAddNewBoard = () => {
		addBoard(currentUser!.user_id, boardName);
		onClose();
	};

	return (
		<>
			<button
				type="button"
				title="addBoard"
				className="bg-white p-2 rounded-lg hover:bg-gray-100"
				onClick={onOpen}
			>
				<IoAdd />
			</button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add a New Board
							</ModalHeader>
							<ModalBody>
								<Input
									placeholder="Enter new board name"
									onChange={(e) => setBoardName(e.target.value)}
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
								<Button size="sm" color="primary" onPress={handleAddNewBoard}>
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

export default AddBoardModal;
