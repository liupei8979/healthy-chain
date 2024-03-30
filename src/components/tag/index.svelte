<script lang="ts">
	import { createStyles, type CSSProperties } from '@src/util/style';

	export let style: CSSProperties = {};
	export let onClick: ((evt: MouseEvent) => void) | undefined = undefined;
	export let noBorder: boolean = false;

	export let color: 'default' | 'red' | 'blue' | 'gray' = 'default';
	$: {
		noBorder && (style.border = 'none');
	}
</script>

<div
	data-tag
	data-color={color}
	data-hover={!!onClick}
	class="root"
	style={createStyles(style)}
	on:click={(evt) => onClick && onClick(evt)}
>
	<slot />
</div>

<style lang="scss">
	.root {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		border-radius: 0.25rem;
		background: var(--component-base04);

		font-size: 0.68rem;
		font-weight: 600;
		padding: 0.3rem 0.4rem;

		&[data-hover='true'] {
			cursor: pointer;
			&:hover {
				background-color: var(--component-base05);
			}
		}
		&[data-color='red'] {
			background: var(--accent-support-01);
			&[data-hover='true'] {
				cursor: pointer;
				&:hover {
					background-color: var(--accent-inverse-support-01);
				}
			}
		}
		&[data-color='blue'] {
			background: var(--accent-support-02);
			&[data-hover='true'] {
				cursor: pointer;
				&:hover {
					background-color: var(--accent-inverse-support-02);
				}
			}
		}
		&[data-color='gray'] {
			background: var(--component-base05);
			&[data-hover='true'] {
				cursor: pointer;
				&:hover {
					background-color: var(--accent-inverse-support-02);
				}
			}
		}
	}
</style>
