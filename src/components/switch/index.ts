export { default as Switch } from './index.svelte';

export interface SwitchItem<T = string> {
	id: T;
	text: string;
	tip?: string;
	iconPath?: string;
}

export enum SwitchAlignProps {
	LEFT = 'left',
	RIGHT = 'right'
}

export enum SwitchSizeProps {
	XS = 'xs',
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl',
	CT = 'ct'
}
