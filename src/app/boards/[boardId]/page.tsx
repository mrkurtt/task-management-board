'use client';

import Column from '@/components/board/Column';
import { useTaskBoardStore } from '@/stores/useTaskBoardStore';
import React, { useEffect } from 'react';

const Page = ({ params }: { params: { boardId: string } }) => {
	const { boards, activeBoard, setActiveBoard } = useTaskBoardStore(
		(state) => state
	);

	useEffect(() => {
		var _activeBoard = boards.filter((board) => board.id === params.boardId)[0];
		setActiveBoard(_activeBoard);
	}, [activeBoard]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{activeBoard?.columns.map((col, index) => (
				<div key={`col-${index}`}>
					<Column name={col.column_name} index={index} id={col.id} />
				</div>
			))}
		</div>
	);
};

export default Page;
