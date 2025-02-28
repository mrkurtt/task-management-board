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
	RadioGroup,
	Radio,
	Textarea,
} from '@heroui/react';
import { useTaskStore } from '@/stores/useTaskStore';
import { Task } from './TaskCard';
import { CiEdit } from 'react-icons/ci';

interface EditTaskProps {
	task: Task;
}

const EditTask = ({ task }: EditTaskProps) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { updateTask } = useTaskStore((state) => state);

	// Task state
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(
		task.priority
	);
	const [dueDate, setDueDate] = useState(task.dueDate);
	const [tags, setTags] = useState(task.tags.join(','));

	const handleEditTask = () => {
		if (!title.trim()) return;
		// Reset fields and close modal
		setTitle('');
		setDescription('');
		setPriority('Medium');
		setDueDate('');
		setTags('');
		onClose();
	};

	return (
		<>
			<div
				onClick={onOpen}
				className="border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-yellow-200"
			>
				<CiEdit size={20} />
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add a New Task
							</ModalHeader>
							<ModalBody className="flex flex-col gap-3">
								<Input
									label="Title"
									placeholder="Enter task title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<Textarea
									label="Description"
									placeholder="Enter task description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<RadioGroup
									label="Priority"
									value={priority}
									onChange={(e: any) => setPriority(e.target.value)}
									orientation="horizontal"
								>
									<Radio value="Low">Low</Radio>
									<Radio value="Medium">Medium</Radio>
									<Radio value="High">High</Radio>
								</RadioGroup>

								<Input
									label="Due Date"
									type="date"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
								/>
								<Input
									label="Tags"
									placeholder="Enter comma-separated tags"
									value={tags}
									onChange={(e) => setTags(e.target.value)}
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
								<Button size="sm" color="primary" onPress={handleEditTask}>
									Save Changes
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditTask;
