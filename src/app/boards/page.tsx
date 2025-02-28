'use client';

import React, { useEffect } from 'react';
import { Board, useTaskBoardStore } from '@/stores/useTaskBoardStore';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';

const HomePage = () => {
	const { getBoardsByUserId, boards } = useTaskBoardStore((state) => state);
	const { currentUser } = useAuthStore((state) => state);

	useEffect(() => {
		getBoardsByUserId(currentUser!.user_id);
	}, []);

	return (
		<div className="flex gap-x-2">
			{boards.map((board: Board, index: number) => (
				<Link key={`board-${index}`} href={`/boards/${board.id}`}>
					<div className="border border-gray-300 p-8 rounded-lg cursor-pointer hover:bg-gray-100">
						<h1 className="font-bold text-blue-500">{board.name}</h1>
					</div>
				</Link>
			))}
		</div>
	);
};

export default HomePage;
