<script lang="ts">
	import { Palette } from '@src/color';
	import { css, getStyleStringUnit, type CSSProperties } from '@src/util/style';

	export let stretch: boolean = false;
	export let flex: string | undefined = undefined;
	export let style: CSSProperties = {};
	export let width: number | string | undefined = undefined;
	export let harmonyName: Palette.HarmonyNameType = 'base';
	export let harmonyShade: Palette.ShadeType | undefined = undefined;

	stretch && (style.flex = '1 1 auto');
	flex && (style.flex = flex);
</script>

<div
	class="root"
	style={css({
		...style,
		width: width ? getStyleStringUnit(width) : undefined,
		backgroundColor:
			harmonyName && harmonyShade ? Palette.scss(harmonyName, harmonyShade) : undefined
	})}
>
	<slot />
</div>
