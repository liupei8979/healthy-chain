<script lang="ts">
	import { Size } from '@src/util/size/index';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import { IconFlipProps, IconSpinProps, getIconTransfromStyle } from '..';

	export let svg: string;
	export let size = Size.Number.md;
	export let color: string | undefined = undefined;
	export let flip: IconFlipProps | undefined | true = undefined;
	export let rotate: number = 0;
	export let spin: IconSpinProps | undefined = undefined;

	export let style: CSSProperties = {};
	let _style: CSSProperties = _.cloneDeep(style);
	let ele: HTMLDivElement;

	onMount(() => {
		ele.innerHTML = svg;
	});

	$: styles = getIconTransfromStyle(size, flip, rotate, color);
	$: {
		ele && (ele.innerHTML = svg);
	}
	$: _style = _.cloneDeep(style);
</script>

<div class="svg-container" style={css({ color }, styles, _style)} data-spin={attr(spin)}>
	<div class="root" data-icon-svg bind:this={ele} />
</div>

<style lang="scss">
	.root {
		display: flex;
		align-items: center;
		vertical-align: middle;
		width: 100%;
		height: 100%;
		transform-origin: 50% 50%;
	}
	:global(div[data-icon-svg] > svg) {
		width: 100%;
		height: 100%;
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
