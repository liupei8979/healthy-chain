<script lang="ts">
	import { Palette } from '@src/color';
	import { attr, css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	export let line: boolean = false;
	export let height: string | number = 2;
	export let style: CSSProperties = {};
	export let lineColor: string = Palette.scss('transparent-inverse', 300);
	export let paddingHorizontal: string | number = 0;
	export let horizontal: boolean = false;
	export let harmonyName: Palette.HarmonyNameType = 'base';
	export let harmonyShade: Palette.ShadeType | undefined = undefined;
	export let opacity: number = 1;
	$: {
		horizontal
			? (style.width = getStyleStringUnit(height))
			: (style.height = getStyleStringUnit(height));
		style.padding = `0 ${getStyleStringUnit(paddingHorizontal)}`;
	}
</script>

<div class="root" style={css(style)} data-horizontal={attr(horizontal)}>
	{#if line}
		<div
			class="line"
			style={css({
				opacity,
				backgroundColor: harmonyShade
					? Palette.scss(harmonyName, harmonyShade)
					: lineColor
						? lineColor
						: undefined
			})}
		/>
	{/if}
</div>

<style lang="scss">
	.root {
		display: flex;
		align-items: center;
		justify-content: center;

		.line {
			width: 100%;
			height: 1px;
		}
		&[data-horizontal] {
			height: 100%;
			.line {
				width: 1px;
				height: 100%;
			}
		}
	}
</style>
