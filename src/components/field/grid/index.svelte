<script lang="ts">
	import { css, getStyleStringUnit, type CSSProperties } from '@src/util/style';

	export let row: string = '';
	export let column: string = '';
	export let gap: string | number = '0rem';
	export let style: CSSProperties = {};
	export let height: string | number | undefined = undefined;
	export let minHeight: string | number | undefined = undefined;
	export let relative = false;
	export let full: boolean = false;

	let assignStyle: CSSProperties = {};
	$: {
		row && (assignStyle.gridTemplateRows = row);
		column && (assignStyle.gridTemplateColumns = column);
		gap && (assignStyle.gap = getStyleStringUnit(gap));
		height && (assignStyle.height = getStyleStringUnit(height));
		minHeight && (assignStyle.minHeight = getStyleStringUnit(minHeight));
		relative && (assignStyle.position = 'relative');
		full && ((assignStyle.width = '100%'), (assignStyle.height = '100%'));
	}
</script>

<div class="root" data-field-grid style={css(style, assignStyle)}>
	<slot />
</div>

<style lang="scss">
	.root {
		width: 100%;
		display: grid;
	}
</style>
