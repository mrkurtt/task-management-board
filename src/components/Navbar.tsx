import { ChevronDown, Search, Mail, Bell } from 'lucide-react';

export function Navbar() {
	return (
		<header className="h-16 border-b border-gray-200 bg-white flex items-center px-4">
			<div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between">
				{/* Search bar */}
				<div className="relative w-80">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<Search size={18} className="text-gray-400" />
					</div>
					<input
						type="search"
						className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Search by name, label, task or team member..."
					/>
				</div>

				{/* Right side actions */}
				<div className="flex items-center space-x-4">
					<button
						type="button"
						title="mail"
						className="text-gray-500 hover:text-gray-700"
					>
						<Mail size={20} />
					</button>
					<button className="text-gray-500 hover:text-gray-700 relative">
						<Bell size={20} />
						<span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
							2
						</span>
					</button>
					<div className="flex items-center ml-2">
						<div className="relative">
							<img
								src="https://i.pravatar.cc/40?img=8"
								alt="User Avatar"
								className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
							/>
							<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
						</div>
						<div className="ml-2 mr-1">
							<span className="text-sm font-medium">Brandon Workman</span>
						</div>
						<ChevronDown size={16} className="text-gray-400" />
					</div>
				</div>
			</div>
		</header>
	);
}
