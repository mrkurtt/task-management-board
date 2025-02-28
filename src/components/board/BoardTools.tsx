import React from 'react';
import AddNewColumnModal from './AddNewColumn';
import DeleteBoard from './DeleteBoard';

const BoardTools = () => {
	return (
		<div className="flex gap-x-2 items-center">
			<AddNewColumnModal />
			<DeleteBoard />
		</div>
	);
};

export default BoardTools;
