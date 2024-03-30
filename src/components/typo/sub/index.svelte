<script lang="ts">
	import { attr, css, type CSSProperties } from '@src/util/style';

	export let style: CSSProperties = {};
	export let light: boolean = false;
	export let bold: boolean = false;
	export let normal: boolean = false;
	export let color: string = 'inherit';
	export let opacity: number = 0.7;
	export let mono: boolean = false;
</script>

<span
	data-mono={attr(mono)}
	class="typo-sub"
	style={css(
		{
			fontWeight: bold ? 800 : light ? 400 : normal ? 600 : 'inherit',
			color,
			opacity
		},
		style
	)}
	><slot />
</span>

<style lang="scss">
	.typo-sub {
		display: inline-block;
		font-weight: inherit;
	}
</style>
