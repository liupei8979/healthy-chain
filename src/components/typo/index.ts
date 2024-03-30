export { default as TypoNumber } from './number/index.svelte';
export { default as TypoSub } from './sub/index.svelte';
export { default as TypoTextWithIcon } from './text-with-icon/index.svelte';
export { default as TypoText } from './text/index.svelte';

import { default as TypoNumber } from './number/index.svelte';

export namespace BCTypo {
	export const Number = TypoNumber;
	export const FontFaceMono = 'DM Mono, monospace';
}
