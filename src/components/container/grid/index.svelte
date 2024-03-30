<script lang="ts">
	import { Palette } from '@src/color';
	import { css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	export let startColumn: string | undefined = undefined;
	export let endColumn: string | undefined = undefined;
	export let startRow: string | undefined = undefined;
	export let endRow: string | undefined = undefined;
	export let style: CSSProperties = {};
	export let full: boolean = false;
	export let flexCenter: boolean = false;
	export let flexAlignCenter: boolean = false;
	export let flexJustifyCenter: boolean = false;
	export let flexJustifyBetween: boolean = false;
	export let flexJustifyEnd: boolean = false;
	export let flexJustifyStart: boolean = false;
	export let height: number | string | undefined = undefined;
	export let minHeight: number | string | undefined = undefined;
	export let scrollShadow: boolean = false;
	export let harmonyName: Palette.HarmonyNameType = 'base';
	export let harmonyShade: Palette.ShadeType | undefined = undefined;
	export let overflow:
		| 'hidden'
		| 'visible'
		| 'scroll'
		| 'auto'
		| 'initial'
		| 'inherit'
		| undefined = undefined;

	$: {
		startColumn && (style.gridColumnStart = startColumn);
		endColumn && (style.gridColumnEnd = endColumn);
		startRow && (style.gridRowStart = startRow);
		endRow && (style.gridRowEnd = endRow);
		full && ((style.width = '100%'), (style.height = '100%'));
		flexCenter &&
			((style.display = 'flex'), (style.justifyContent = 'center'), (style.alignItems = 'center'));
		flexAlignCenter && ((style.display = 'flex'), (style.alignItems = 'center'));
		flexJustifyCenter && ((style.display = 'flex'), (style.justifyContent = 'center'));
		flexJustifyEnd &&
			((style.display = 'flex'),
			(style.justifyContent = 'flex-end'),
			(style.alignItems = 'center'));
		flexJustifyStart && ((style.display = 'flex'), (style.justifyContent = 'flex-start'));
		flexJustifyStart &&
			((style.display = 'flex'),
			(style.justifyContent = 'space-between'),
			(style.alignItems = 'center'));
		height && (style.height = getStyleStringUnit(height));
		minHeight && (style.minHeight = getStyleStringUnit(minHeight));
		overflow && (style.overflow = overflow);
		harmonyName &&
			harmonyShade &&
			(style.backgroundColor = Palette.scss(harmonyName, harmonyShade));
	}
	export let eleRoot: HTMLDivElement | undefined = undefined;
	export let onClick: () => void = () => {};
</script>

<div class="root" data-container-grid style={css(style)} bind:this={eleRoot} on:click={onClick}>
	<slot {eleRoot} />
</div>

<style lang="scss">
	.root {
		overflow: hidden;
		position: relative;
	}
</style>
