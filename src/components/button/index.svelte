<script lang="ts">
	import { attr, css, type CSSProperties } from '@src/util/style';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();

	export let size: 'xs' | 'md' | 'sm' | 'lg' | 'xl' | 'cs' | 'ct' = 'md';
	export let disable: boolean = false;
	export let style: CSSProperties = {};
	export let ghost: boolean = false;
	export let selected: boolean = false;
	export let selectedd: boolean = false;
</script>

<div
	class="root"
	data-button
	data-size={attr(size)}
	data-disable={attr(disable)}
	data-ghost={attr(ghost)}
	data-selected={attr(selected)}
	data-selectedd={attr(selectedd)}
	style={css(style)}
	on:click={(evt) => !disable && dispatch('click', evt)}
	on:keydown
>
	<slot />
</div>

<style lang="scss">
	.root {
		min-width: 2.3rem;
		height: 1.75rem;
		color: #98a2ae;
		cursor: pointer;

		@include hover {
			background-color: var(--base03);
		}

		border: solid 1px var(--border-color);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.78rem;
		padding: 0 0.65rem;

		&[data-disable] {
			cursor: not-allowed !important;
			opacity: 0.5;
			@include hover {
				background-color: var(--base02);
			}
		}
		&[data-ghost] {
			background-color: transparent;
			border: none;
			@include hover {
				border-radius: 0.25rem;
				background-color: var(--overlay);
			}
		}
		&[data-selected] {
			color: var(--hq-base-0300) !important;
			font-weight: bold;
			// background: var(--hq-prussian-blue-0300);
			// border-bottom: solid 1px var(--hq-sapphire-blue-1600);
			box-shadow: 0 1px 0 0 var(--hq-sapphire-blue-1600);
		}

		&[data-selectedd] {
			color: var(--hq-base-0300) !important;
			// background: var(--hq-prussian-blue-0300);
			// border-bottom: solid 3px var(--hq-sapphire-blue-1600);
			box-shadow: 0 0.13rem 0 0 var(--hq-sapphire-blue-1600);
		}

		&[data-ghost][data-selected][data-selectedd] {
			border-radius: 0.25rem;
			@include hover {
				background-color: var(--base04);
			}
		}

		&[data-size='xs'] {
			min-width: 1.5rem;
			height: 1.2rem;
			font-size: 0.68rem;
			padding: 0 0.45rem;
		}

		&[data-size='sm'] {
			min-width: 1.5rem;
			height: 1.5rem;
			font-size: 0.72rem;
			padding: 0 0.55rem;
		}
		&[data-size='lg'] {
			min-width: 2.5rem;
			height: 3.5rem;
			font-size: 1rem;
			padding: 0 1.5rem;
		}

		&[data-size='ct'] {
			min-width: 2.5rem;
			height: 3.5rem;
			font-size: 1rem;
			font-weight: bold;
			padding: 0 1.5rem;
		}

		&[data-size='cs'] {
			min-width: 2.5rem;
			height: 3rem;
			font-size: 1.5rem;
			color: var(--hq-base-1000);
		}

		&[data-size='xl'] {
			min-width: 2.5rem;
			font-size: 1.5rem;
			font-weight: 700;
			padding: 0;
			color: var(--hq-base-0300);
		}
	}
</style>
