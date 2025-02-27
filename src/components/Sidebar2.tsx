'use client';
import React, { useState } from 'react';

const SyntaskSidebar = ({ children }: { children: React.ReactNode }) => {
	const [expanded, setExpanded] = useState(true);
	const [selectedProject, setSelectedProject] = useState('Mindlax');

	const projects = [
		{ id: 'mindlax', name: 'Mindlax' },
		{ id: 'sintech', name: 'SinTech' },
		{ id: 'shopicia', name: 'Shopicia' },
		{ id: 'byscape', name: 'Byscape' },
	];

	return <></>;
};

export default SyntaskSidebar;
