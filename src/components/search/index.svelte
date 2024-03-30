<script lang="ts">
	import { mdiMagnify } from '@mdi/js';
	import { PathIcon } from '@src/components/icon/path';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import _ from 'lodash';
	import { createEventDispatcher } from 'svelte';

	export let debounceTime: number = 200;
	export let placeholder: string = 'Search';
	export let style: CSSProperties = {};
	export let styleInput: CSSProperties = {};

	let focus: boolean = false;

	const dispatch = createEventDispatcher<{
		onSubmit: string;
		onChange: string;
		onDebounceChange: string;
	}>();

	let debounce = _.debounce(() => dispatch('onDebounceChange', value), debounceTime);
	export let value: string = '';
</script>

<div class="root" data-search data-focus={attr(focus)} style={css(style)}>
	<div class="icon">
		<PathIcon path={mdiMagnify} />
	</div>
	<input
		data-opensans
		style={css(styleInput)}
		type="search"
		{placeholder}
		bind:value
		on:focus={() => (focus = true)}
		on:blur={() => (dispatch('onSubmit', value), (focus = false))}
		on:keydown|stopPropagation
		on:keyup={(key) => {
			debounce();
			dispatch('onChange', value);
			key.code === 'Enter' && dispatch('onSubmit', value);
		}}
	/>
</div>

<style lang="scss">
	.root {
		height: 2rem;
		width: 100%;
		border-radius: 0.25rem;
		line-height: 2;
		background-color: var(--hq-base-2300);
		position: relative;
		transition: opacity 0.2s;
		border: solid 1px var(--hq-base-2200);
		cursor: pointer;
		&:hover {
			background-color: var(--hq-base-2400);
		}
		&[data-focus] {
			background-color: var(--hq-base-2400);
			border: solid 2px var(--hq-base-2200);
			.icon {
				color: var(--hq-base-1800);
			}
		}
		.icon {
			color: var(--hq-base-1200);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1rem;
			pointer-events: none;
			position: absolute;
			padding-left: 0.5rem;
		}
		input {
			cursor: pointer;
			padding-top: 0.28rem;
			padding-left: 1.9rem;
			margin-top: -2px;
			width: 100%;
			height: 100%;
			border: none;
			background: transparent;
			outline: none;

			&:hover,
			&:focus,
			&:active {
				border: none;
				outline: none;
			}
			color: var(--hq-base-1600);
			font-weight: 500;
			font-size: 0.625rem;
			&::placeholder {
				font-weight: 500;
				color: var(--hq-base-1600);
			}
		}
	}
</style>
