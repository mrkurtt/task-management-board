'use client';

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { GoProject } from 'react-icons/go';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { LuListMinus } from 'react-icons/lu';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import SearchBar from './input/SearchBar';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@heroui/react';
import { useBoardStore } from '@/stores/useBoardStore';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [boardOpen, setBoardOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const boards = useBoardStore((state) => state.boards);

	return (
		<div className="flex">
			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black opacity-40 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-lvh min-w-64 bg-white border-r border-gray-300 text-gray-500 shadow-lg transition-transform transform ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				} md:translate-x-0 md:static md:w-60`}
			>
				<div className="flex justify-between">
					<div className="flex flex-col py-4 pl-4">
						<h1 className="text-blue-500 font-bold text-2xl">Syntask</h1>
						<p className="text-gray-700 text-xs">A Task Management Board</p>
					</div>

					{/* Close button (Mobile only) */}
					<div className="p-4 flex justify-between items-center md:hidden">
						<button
							type="button"
							title="Close Menu"
							onClick={() => setIsOpen(false)}
						>
							<FiX size={24} />
						</button>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto">
					<ul className="flex flex-col">
						{/* Boards Dropdown */}
						<li
							className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
							onClick={() => setBoardOpen(!boardOpen)}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<GoProject size={20} />
									<span className="text-gray-900 text-sm">Boards</span>
								</div>
								{boardOpen ? <IoChevronUp /> : <IoChevronDown />}
							</div>
						</li>

						{/* Dropdown Items */}
						{boardOpen && (
							<ul className="ml-8 mt-2 space-y-2">
								{boards.map((board) => (
									<li
										key={board.id}
										onClick={() => setActive(board.board_name)}
									>
										<Link
											href={`/boards/${board.id}`}
											className={`text-sm block px-4 py-2 hover:bg-gray-100 rounded ${
												active === board.board_name
													? 'bg-gray-100 text-blue-500'
													: 'text-gray-500'
											}`}
										>
											<div className="flex items-center gap-x-1">
												<LuListMinus size={20} />
												{board.board_name}
											</div>
										</Link>
									</li>
								))}
							</ul>
						)}
					</ul>
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-grow">
				{/* Navbar */}
				<header className=" bg-white border-b border-gray-300 p-4 flex justify-between items-center">
					<button
						type="button"
						title="Open Menu"
						className="md:hidden"
						onClick={() => setIsOpen(true)}
					>
						<FiMenu size={24} />
					</button>
					<SearchBar
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<div className="ml-4">
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<button
									type="button"
									title="profile-dropdown"
									className="flex items-center border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-blue-50 gap-x-1"
									onClick={() => setDropdownOpen(!dropdownOpen)}
								>
									<IoPersonCircleOutline size={30} color="#515050" />
									<h1 className="text-gray-700 hidden sm:block text-sm">
										Kurt Timajo
									</h1>
								</button>
							</DropdownTrigger>
							<DropdownMenu aria-label="Profile Actions" variant="flat">
								<DropdownItem key="logout" color="danger">
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</header>

				{/* Page Content */}
				{/* <main className="max-w-full p-6">{children}</main> */}
			</div>
		</div>
	);
};

export default Sidebar;
