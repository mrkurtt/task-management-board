'use client';

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { GoProject } from 'react-icons/go';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { LuListMinus } from 'react-icons/lu';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import SearchBar from './input/SearchBar';
import { MdDarkMode } from 'react-icons/md';
import Button from './button/Button';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
} from '@heroui/react';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [boardOpen, setBoardOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const projects = [
		{ id: 'mindlax', name: 'Mindlax' },
		{ id: 'sintech', name: 'SinTech' },
		{ id: 'shopicia', name: 'Shopicia' },
		{ id: 'byscape', name: 'Byscape' },
	];

	return (
		<div className="flex min-h-screen">
			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black opacity-40 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-300 text-gray-500 shadow-lg transition-transform transform ${
					isOpen ? 'translate-x-0' : '-translate-x-64'
				} md:translate-x-0 md:static md:w-60`}
			>
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

				{/* Navigation */}
				<nav className="h-screen">
					<ul>
						{/* Boards Dropdown */}
						<li
							className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
							onClick={() => setBoardOpen(!boardOpen)}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<GoProject size={20} />
									<span className="text-gray-900">Boards</span>
								</div>
								{boardOpen ? <IoChevronUp /> : <IoChevronDown />}
							</div>
						</li>

						{/* Dropdown Items */}
						{boardOpen && (
							<ul className="ml-8 mt-2 space-y-2">
								{projects.map((project) => (
									<li key={project.id} onClick={() => setActive(project.name)}>
										<Link
											href={`/boards`}
											className={`text-sm block px-4 py-2 hover:bg-gray-100 rounded ${
												active === project.name
													? 'bg-gray-100 text-blue-500'
													: 'text-gray-500'
											}`}
										>
											<div className="flex items-center gap-x-1">
												<LuListMinus size={20} />
												{project.name}
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
			<div className="flex-1">
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

					<div>
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<button
									type="button"
									title="profile-dropdown"
									className="flex items-center border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-blue-50 gap-x-1"
									onClick={() => setDropdownOpen(!dropdownOpen)}
								>
									<IoPersonCircleOutline size={30} color="#515050" />
									<h1 className="text-gray-700 hidden sm:block">Kurt Timajo</h1>
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
				<main className="p-6">{children}</main>
			</div>
		</div>
	);
};

export default Sidebar;
