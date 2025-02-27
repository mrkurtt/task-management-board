import React from 'react';
import { FaCircle } from 'react-icons/fa';

interface ColumnProps {
	name: string;
}

const Column = ({ name }: ColumnProps) => {
	return (
		<div className="w-64">
			<div className="flex  items-center bg-white border border-gray-300 p-2 rounded-lg gap-x-2 ">
				<FaCircle color="#0C7BFC" size={10} />{' '}
				<h1 className="text-sm">{name}</h1>
			</div>
		</div>
	);
};

export default Column;
