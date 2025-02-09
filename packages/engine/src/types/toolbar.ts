import { NodeInterface } from './node';

export type ButtonOptions = {
	type: 'button';
	disabled?: boolean;
	link?: string;
	style?: string;
	class?: string;
	content: string;
	title?: string | (() => string);
	onClick?: () => void;
	didMount?: (node: NodeInterface) => void;
};

export type InputOptions = {
	type: 'input';
	placeholder: string;
	value: string | number;
	prefix?: string;
	suffix?: string;
	onEnter?: (value: string) => void;
	onInput?: (value: string) => void;
	onChange?: (value: string) => void;
	didMount?: (node: NodeInterface) => void;
};

export type DropdownSwitchOptions = {
	type: 'switch';
	disabled?: boolean;
	content: string;
	checked?: boolean;
	getState?: () => boolean;
	onClick?: () => void;
};

export type DropdownButtonOptions = {
	type: 'button';
	disabled?: boolean;
	content: string;
	onClick?: () => void;
};

export type DropdownOptions = {
	type: 'dropdown';
	disabled?: boolean;
	content: string;
	title?: string | (() => string);
	items: Array<DropdownSwitchOptions | DropdownButtonOptions>;
};

export type NodeOptions = {
	type: 'node';
	node: NodeInterface;
	title?: string | (() => string);
	didMount?: (node: NodeInterface) => void;
};

export type ToolbarItemOptions =
	| ButtonOptions
	| InputOptions
	| DropdownOptions
	| NodeOptions;

export type ToolbarOptions = {
	items: Array<ToolbarItemOptions>;
};

export interface ButtonInterface {
	render(container: NodeInterface): void;
}

export interface InputInterface {
	onEnter: (value: string) => void;
	onInput: (value: string) => void;
	onChange: (value: string) => void;
	find(role: string): NodeInterface;
	render(container: NodeInterface): void;
}

export interface DropdownInterface {
	documentMouseDown(e: MouseEvent): void;
	initToggleEvent(): void;
	toggleDropdown(): void;
	showDropdown(): void;
	hideDropdown(): void;
	renderTooltip(): void;
	renderDropdown(container: NodeInterface): void;
	render(container: NodeInterface): void;
	destroy(): void;
}

export interface ToolbarInterface {
	root: NodeInterface;
	addItems(node: NodeInterface): void;
	find(role: string): NodeInterface;
	destroy(): void;
	hide(): void;
	show(): void;
	render(container?: NodeInterface): NodeInterface;
}
