export { default as CardGrid } from './grid/index.svelte';

export type CardSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface CardTip {
	text: string | undefined;
	width: string | number | undefined;
	color: string | undefined;
}
