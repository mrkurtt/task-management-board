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
import { useRouter } from 'next/navigation';
import { toast } from '../toast/CustomToast';

const DeleteBoard = () => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { activeBoard, deleteBoard } = useTaskBoardStore((state) => state);
	const router = useRouter();

	const handleDeleteBoard = () => {
		deleteBoard(activeBoard.id);
		onClose();
		router.push('/boards');
		toast.showToast({
			title: 'Success',
			description: `Board deleted successfully.`,
			color: 'success',
		});
	};

	return (
		<div>
			<Button
				onPress={onOpen}
				startContent={<MdDeleteOutline size={20} />}
				size="sm"
				color="danger"
			>
				Delete Board
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Delete Board
							</ModalHeader>
							<ModalBody>
								<p>Are you sure you want to delete this board?</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="danger" onPress={handleDeleteBoard}>
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

export default DeleteBoard;
