import { Input } from '@heroui/react';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChange,
	placeholder = 'Search tasks',
}) => {
	return (
		<div className="relative w-full max-w-md hidden sm:block">
			<Input
				value={value}
				labelPlacement="outside"
				onChange={onChange}
				placeholder={placeholder}
				startContent={<FiSearch className="" />}
				type="email"
			/>
		</div>
	);
};

export default SearchBar;
