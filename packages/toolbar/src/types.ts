import {
	GroupButtonProps,
	GroupDropdownProps,
	GroupColorProps,
	CollapseProps,
} from './group';

export type ButtonProps = {
	onActive?: () => boolean;
	onDisabled?: () => boolean;
} & GroupButtonProps;

export type DropdownProps = {
	onActive?: () => string | Array<string>;
	onDisabled?: () => boolean;
} & GroupDropdownProps;

export type ColorProps = {
	onActive?: () => string | Array<string>;
	onDisabled?: () => boolean;
} & GroupColorProps;

export { CollapseProps };
