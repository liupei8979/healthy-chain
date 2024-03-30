<script lang="ts">
	import { Palette } from '@src/color';
	import { css, getStyleStringUnit, type CSSProperties } from '@src/util/style';

	export let height: string | number | undefined = undefined;
	export let wrap: boolean = false;
	export let style: CSSProperties = {};
	export let gap: string | number | undefined = undefined;
	export let center: boolean = false;
	export let reverse: boolean = false;
	export let alignItems: string | undefined = undefined;
	export let justifyContent: string | undefined = undefined;
	export let harmonyName: Palette.HarmonyNameType = 'base';
	export let harmonyShade: Palette.ShadeType | undefined = undefined;
	export let direction: 'row' | 'column' | undefined = undefined;
	export let full: boolean = false;
	$: {
		wrap && (style.flexWrap = 'wrap');
		center && (style.justifyContent = 'center');
		center && (style.alignItems = 'center');
		reverse && (style.flexDirection = 'row-reverse');
		// alignItems && (style.alignItems = alignItems);
		// justifyContent && (style.justifyContent = justifyContent);
		direction && (style.flexDirection = direction);
		style.backgroundColor =
			harmonyName && harmonyShade ? Palette.scss(harmonyName, harmonyShade) : undefined;
	}
</script>

<div
	class="root"
	style={css(
		{
			alignItems,
			justifyContent
		},
		{ height: full ? '100%' : getStyleStringUnit(height), gap: getStyleStringUnit(gap), ...style }
	)}
	data-field-flex
>
	<slot />
</div>

<style lang="scss">
	.root {
		display: flex;
		width: 100%;
	}
</style>
