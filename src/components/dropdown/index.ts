export { default as Dropdown } from './index.svelte';

export interface DropdownItem<T = string> {
	id: T;
	text: string;
}
