<script lang="ts">
	import { Size } from '@src/util/size/index';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import _ from 'lodash';
	import { getIconTransfromStyle, IconFlipProps, IconSpinProps } from '../index';

	export let path: string | undefined;
	export let size = Size.Number.md;
	export let color: string | undefined = undefined;
	export let flip: IconFlipProps | undefined | true = undefined;
	export let rotate: number = 0;
	export let spin: IconSpinProps | undefined = undefined;
	export let style: CSSProperties = {};
	let _style: CSSProperties = _.cloneDeep(style);
	let viewBoxSize: number = 24;

	if (Number(size)) {
		size = Number(size);
	}
	$: _style = _.cloneDeep(style);
	$: styles = getIconTransfromStyle(size, flip, rotate, color);
</script>

<svg
	viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
	style={css(styles, _style)}
	data-spin={attr(spin)}
>
	<path d={path} />
</svg>

<style lang="scss">
	svg {
		vertical-align: middle;
	}

	[data-spin='clockwise'] {
		animation: spin-inverse linear 2s infinite;
		transform-origin: center;

		@keyframes spin-inverse {
			to {
				transform: rotate(360deg);
			}
		}
	}

	[data-spin='counterclockwise'] {
		animation: spin linear 2s infinite;
		transform-origin: center;

		@keyframes spin {
			to {
				transform: rotate(-360deg);
			}
		}
	}
</style>
