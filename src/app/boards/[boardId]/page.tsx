'use client';

import Column from '@/components/board/Column';
import { Board, useBoardStore } from '@/stores/useBoardStore';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: { boardId: string } }) => {
	const boards = useBoardStore((state) => state.boards);
	const [boardName, setBoardName] = useState('');
	const [activeBoard, setActiveBoard] = useState<Board | null>(null);

	useEffect(() => {
		var activeBoard = boards.filter((board) => board.id === params.boardId);
		setBoardName(activeBoard[0].board_name);
		setActiveBoard(activeBoard[0]);
	}, []);

	return (
		<div className="w-full">
			<div className="text-gray-600 gap-x-2">
				<p className="text-sm text-gray-400">Board</p>
				<p className="font-semibold text-2xl"> {boardName}</p>
			</div>
			<hr className="my-2" />
			<div className="h-full w-full flex gap-x-4">
				{activeBoard?.columns.map((col) => (
					<Column name={col} />
				))}
			</div>
		</div>
	);
};

export default Page;
