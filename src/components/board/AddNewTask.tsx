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
import { IoAdd } from 'react-icons/io5';
import { useTaskStore } from '@/stores/useTaskStore';

interface AddNewTaskProps {
	board_id: string;
	column_id: string;
}

const AddNewTask = ({ board_id, column_id }: AddNewTaskProps) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { addNewTask } = useTaskStore((state) => state);

	// Task state
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
	const [dueDate, setDueDate] = useState('');
	const [tags, setTags] = useState('');

	const handleAddTask = () => {
		if (!title.trim()) return;

		addNewTask({
			title: title,
			description: description,
			priority: priority,
			dueDate,
			tags: tags.split(','),
			board_id,
			column_id,
		});

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
			<Button
				onPress={onOpen}
				startContent={<IoAdd size={20} />}
				size="sm"
				fullWidth
				className="bg-white border border-blue-500 text-blue-500"
			>
				Add New Task
			</Button>
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
								<Button size="sm" color="primary" onPress={handleAddTask}>
									Add Task
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddNewTask;
