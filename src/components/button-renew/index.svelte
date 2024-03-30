<script lang="ts">
	import { Color } from '@src/color';
	import { tip, type TipOption } from '@src/util/actions/tip';
	import { ComponentSizeProps } from '@src/util/component';
	import { attr, css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	import _ from 'lodash';
	import { ButtonBorderProps } from './index';

	export let size: ComponentSizeProps = ComponentSizeProps.MD;
	export let color: Color.Palette.Depth = Color.Palette.Depth.NORMAL;
	export let disable: boolean = false;
	export let ghost: boolean = false;
	export let fit: boolean = false;
	export let border: ButtonBorderProps = ButtonBorderProps.NONE;
	export let width: number | string | undefined = undefined;
	export let fitItems: boolean = false;
	export let style: CSSProperties = {};
	export let styleColor: Color.Palette.Group | undefined = undefined;
	export let tipOption: TipOption = {};

	let _style: CSSProperties = _.cloneDeep(style);
	let status: Color.Palette.Action = Color.Palette.Action.BASE;

	$: {
		_style.width = getStyleStringUnit(width);
		_style = Object.assign(
			_style,
			styleColor
				? styleColor[status]
				: Color.Brush.create(Color.Palette.Harmonies.base.Lv1)
						.setProp(color)
						.setStatus(status)
						.setTransition(false)
						.build()
		);
	}
</script>

<div
	on:mouseenter={() => (status = Color.Palette.Action.HOVER)}
	on:mouseleave={() => (status = Color.Palette.Action.BASE)}
	on:mousedown={() => (status = Color.Palette.Action.ACTIVE)}
	on:mouseup={() => (status = Color.Palette.Action.HOVER)}
	on:keydown={() => {}}
	class="button-container"
	data-button
	style={css(_style)}
	data-size={attr(size)}
	data-fit={attr(fit)}
	data-disable={attr(disable)}
	data-ghost={attr(ghost)}
	data-border={attr(border)}
	use:tip={tipOption}
	on:click|preventDefault
>
	{#if $$slots['left-icon']}
		<div data-left-icon class="left-icon-container">
			<slot name="left-icon" />
		</div>
	{/if}
	<div class="container" data-text data-fit-items={attr(fitItems)}>
		<slot />
	</div>
	{#if $$slots['right-icon']}
		<div data-right-icon class="right-icon-container">
			<slot name="right-icon" />
		</div>
	{/if}
</div>

<style lang="scss">
	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0rem 1rem;
		width: fit-content;
		border-radius: 0.2rem;

		.container {
			&[data-fit-items] {
				flex: 1 0;
				text-align: center;
			}
		}
		.left-icon-container .right-icon-container {
			height: 100%;
		}

		&:hover {
			cursor: pointer;
		}

		&[data-size='xs'] {
			height: $component-height-xs;
			font-size: $component-font-size-xs;
		}
		&[data-size='sm'] {
			height: $component-height-sm;
			font-size: $component-font-size-sm;
		}
		&[data-size='md'] {
			height: $component-height-md;
			font-size: $component-font-size-md;
		}
		&[data-size='lg'] {
			height: $component-height-lg;
			font-size: $component-font-size-lg;
		}
		&[data-size='xl'] {
			height: $component-height-xl;
			font-size: $component-font-size-xl;
		}

		&[data-fit] {
			width: 100% !important;
		}
		&[data-disable] {
			opacity: 40%;
			pointer-events: none !important;
		}

		&[data-ghost] {
			background-color: transparent !important;
			opacity: 0.7;
			&:hover {
				//border있고 ghost인 경우, border 변화
				// border-color: var(--component-base05);
				opacity: 1;
			}
			// &[data-border='none'] {
			// 	&:hover {
			// 		//border없고 ghost인 경우(text만 있는 경우), text만 변화
			// 		color: var(--component-base05);
			// 	}
			// }
		}

		&[data-border='none'] {
			border: none;
		}
		&[data-border='soft'] {
			border: 1px solid var(--hq-base-0400) !important;
		}
		&[data-border='normal'] {
			border: 1px solid var(--overlay-2x);
		}
		&[data-border='hard'] {
			border: 1px solid var(--overlay-4x);
		}
	}
</style>
