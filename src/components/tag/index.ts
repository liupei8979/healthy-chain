export { default as Tag } from './index.svelte';

import { default as TagCommand } from './command/index.svelte';

export namespace BCTag {
	export const Command = TagCommand;
}
