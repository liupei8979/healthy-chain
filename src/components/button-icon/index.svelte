<script lang="ts">
	import { Color } from '@src/color';
	import {
		Icon,
		IconFlipProps,
		IconPropType,
		IconSpinProps,
		type IconProp
	} from '@src/components/icon';
	import { tip, type TipOption } from '@src/util/actions/tip';
	import { ComponentSizeProps } from '@src/util/component';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import _ from 'lodash';
	import { createEventDispatcher } from 'svelte';
	export { default as ButtonIcon } from './index.svelte';

	export enum ButtonIconBorderProps {
		NONE = 'none',
		SOFT = 'soft',
		NORMAL = 'normal',
		HARD = 'hard'
	}

	export enum ButtonIconBorderRadiusProps {
		ANGLED = 'angled',
		MEDIUM = 'medium',
		ROUND = 'round'
	}

	//button props
	export let size: ComponentSizeProps = ComponentSizeProps.MD;
	export let color: Color.Palette.Depth = Color.Palette.Depth.NORMAL;
	export let disable: boolean = false;
	export let ghost: boolean = false;
	export let border: ButtonIconBorderProps = ButtonIconBorderProps.NONE;
	export let borderRadius: ButtonIconBorderRadiusProps = ButtonIconBorderRadiusProps.ROUND;
	export let styleColor: Color.Palette.Group | undefined = undefined;
	export let iconstyle: CSSProperties = {};
	export let style: CSSProperties = {};

	let _style: CSSProperties = _.cloneDeep(style);
	let _iconstyle: CSSProperties = _.cloneDeep(iconstyle);

	//icon props
	export let icon: IconProp = { type: IconPropType.IMAGE, src: '' };
	export let flip: IconFlipProps | undefined | true = undefined;
	export let rotate: number = 0;
	export let spin: IconSpinProps | undefined = undefined;
	export let tipOption: TipOption | undefined = undefined;

	let status: Color.Palette.Action = Color.Palette.Action.BASE;

	const dispatch = createEventDispatcher<{
		click: MouseEvent;
	}>();
	$: _icon = _.cloneDeep(icon);
	$: _style = Object.assign(
		_style,
		styleColor
			? styleColor[status]
			: Color.Brush.create(Color.Palette.Harmonies.base.Lv1)
					.setProp(color)
					.setStatus(status)
					.build()
	);
</script>

<div
	on:mouseenter={() => (status = Color.Palette.Action.HOVER)}
	on:mouseleave={() => (status = Color.Palette.Action.BASE)}
	on:mousedown={() => (status = Color.Palette.Action.ACTIVE)}
	on:mouseup={() => (status = Color.Palette.Action.BASE)}
	on:keydown
	use:tip={tipOption}
	class="button-container"
	data-button
	style={css(_style)}
	data-size={attr(size)}
	data-disable={attr(disable)}
	data-ghost={attr(ghost)}
	data-border={attr(border)}
	data-borderRadius={attr(borderRadius)}
	on:click={(evt) => !disable && dispatch('click', evt)}
>
	<Icon icon={_icon} {size} {flip} {rotate} {spin} style={_iconstyle} />
</div>

<style lang="scss">
	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s color 0.2s;
		background-color: var(--hq-base-2300) !important;

		&:hover {
			cursor: pointer;
			color: var(--hq-base-2200);
		}
		&:active {
			opacity: 80%;
		}

		&[data-size='xs'] {
			height: $component-height-xs;
			width: $component-height-xs;
		}
		&[data-size='sm'] {
			height: $component-height-sm;
			width: $component-height-sm;
		}
		&[data-size='md'] {
			height: $component-height-md;
			width: $component-height-md;
		}
		&[data-size='lg'] {
			height: $component-height-lg;
			width: $component-height-lg;
		}
		&[data-size='xl'] {
			height: $component-height-xl;
			width: $component-height-xl;
		}

		&[data-disable] {
			opacity: 40%;
			pointer-events: none !important;
		}

		&[data-ghost] {
			background-color: transparent !important;
			&:hover {
				//border있고 ghost인 경우, border 변화
				border-color: var(--hq-base-2200);
			}
			&[data-border='none'] {
				&:hover {
					//border없고 ghost인 경우(text만 있는 경우), text만 변화
					color: var(--base04);
				}
			}
		}

		&[data-border='none'] {
			border: none;
		}
		&[data-border='soft'] {
			border: 1px solid var(--hq-base-2200) !important;
		}
		&[data-border='normal'] {
			border: 1px solid var(--overlay-2x);
		}
		&[data-border='hard'] {
			border: 1px solid var(--overlay-4x);
		}

		&[data-borderRadius='angled'] {
			border-radius: 0rem;
		}
		&[data-borderRadius='medium'] {
			border-radius: 15%;
		}
		&[data-borderRadius='round'] {
			border-radius: 50%;
		}
	}
</style>
