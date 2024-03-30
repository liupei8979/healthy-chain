<script lang="ts">
	type T = $$Generic;

	import { ButtonGroup, ButtonGroupAlignProps } from '@src/components/button-group';
	import { Button } from '@src/components/button-renew';
	import { PathIcon } from '@src/components/icon/path';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import type { SwitchItem } from './index';

	import { Color, Palette } from '@src/color';
	import { SwitchAlignProps, SwitchSizeProps } from '.';

	export let header: string | undefined = undefined;
	export let align: SwitchAlignProps = SwitchAlignProps.LEFT;
	export let items: SwitchItem<T>[];
	export let size: SwitchSizeProps = SwitchSizeProps.SM;
	export let onChange: (item: SwitchItem<T>) => void = () => {};
	export let selectedId: T | undefined = undefined;
	export let gap: string | number = '';
	export let useBorder: boolean = false;
	export let fit: boolean = false;
	export let vertical: boolean = false;

	export let style: CSSProperties = {};
	export let styleItem: CSSProperties = {};
	export let styleSelectedItemColor: Color.Palette.Action | undefined = undefined;
	export let backgroundColor: string | undefined = undefined;
	export let harmonyName: Palette.HarmonyNameType = 'base';
	export let disable: boolean = false;
	export let opensans: boolean = false;

	let _selectedId: T = selectedId || items[0].id;

	//default switch styling(선택된거)
	let selectedItemColor = {
		base: {
			backgroundColor: Palette.scss(harmonyName, 2200),
			color: Palette.scss(harmonyName, 300)
		},
		hover: {
			backgroundColor: Palette.scss(harmonyName, 2100),
			color: Palette.scss(harmonyName, 300)
		},
		active: {
			backgroundColor: Palette.scss(harmonyName, 2000),
			color: Palette.scss(harmonyName, 300)
		}
	};

	//default switch styling(선택 안 된거)
	let defaultItemColor = {
		base: {
			backgroundColor: backgroundColor ? backgroundColor : Palette.scss(harmonyName, 2400),
			color: Palette.scss(harmonyName, 1200)
		},
		hover: {
			backgroundColor: backgroundColor ? backgroundColor : Palette.scss(harmonyName, 2300),
			color: Palette.scss(harmonyName, 1400)
		},
		active: {
			backgroundColor: backgroundColor ? backgroundColor : Palette.scss(harmonyName, 2200),
			color: Palette.scss(harmonyName, 1400)
		}
	};
	$: {
		selectedId = _selectedId;
		Object.assign(selectedItemColor, styleSelectedItemColor);
	}
	$: fit && (style = Object.assign(style, { width: fit ? '100%' : 'fit-content' }));
</script>

<div
	class="root"
	data-opensans={attr(opensans)}
	data-disable={attr(disable)}
	style={css({
		width: fit ? '100%' : 'fit-content'
	})}
>
	{#if header}
		<div class="header" data-align={align}>{header}</div>
	{/if}
	<div
		class="container"
		data-size={size}
		data-align={align}
		data-vertical={vertical}
		style={css({
			...(useBorder
				? {
						border: 'solid 1px var(--hq-base-0600)',
						height: '1.4rem',
						padding: 0,
						margin: '0.1rem 0.3rem'
					}
				: {}),
			...style,
			backgroundColor
		})}
		{...$$restProps}
	>
		{#if $$slots['switch-left-icon']}
			<ButtonGroup
				width={fit ? '100%' : 'fit-content'}
				{gap}
				align={vertical ? ButtonGroupAlignProps.VERTICAL : ButtonGroupAlignProps.HORIZONTAL}
			>
				{#each items as item}
					<Button
						{fit}
						style={styleItem}
						styleColor={item.id === selectedId ? selectedItemColor : defaultItemColor}
						on:click={() => ((_selectedId = item.id), onChange(item))}
					>
						<slot {item}>{item.text}</slot>
						<slot {item} name="switch-left-icon" slot="left-icon" />
					</Button>
				{/each}
			</ButtonGroup>
		{:else if $$slots['switch-right-icon']}
			<ButtonGroup
				width={fit ? '100%' : 'fit-content'}
				{gap}
				align={vertical ? ButtonGroupAlignProps.VERTICAL : ButtonGroupAlignProps.HORIZONTAL}
			>
				{#each items as item}
					<Button
						{fit}
						style={styleItem}
						styleColor={item.id === selectedId ? selectedItemColor : defaultItemColor}
						on:click={() => ((_selectedId = item.id), onChange(item))}
					>
						<slot {item}>{item.text}</slot>
						<slot {item} name="switch-right-icon" slot="right-icon" />
					</Button>
				{/each}
			</ButtonGroup>
		{:else}
			<ButtonGroup
				width={fit ? '100%' : 'fit-content'}
				{gap}
				align={vertical ? ButtonGroupAlignProps.VERTICAL : ButtonGroupAlignProps.HORIZONTAL}
			>
				{#each items as item}
					<Button
						{fit}
						style={styleItem}
						styleColor={item.id === selectedId ? selectedItemColor : defaultItemColor}
						on:click={() => ((_selectedId = item.id), onChange(item))}
					>
						{item.text}
						{#if item.iconPath}
							<PathIcon path={item.iconPath} size={1.5} />
						{/if}
					</Button>
				{/each}
			</ButtonGroup>
		{/if}
	</div>
</div>

<style lang="scss">
	.root {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		&[data-disable] {
			opacity: 0.4;
			pointer-events: none !important;
		}
		.header {
			padding: 0.4rem 0;
			width: 100%;
			text-align: left;
			font-size: 0.723rem;
			font-weight: 600;
			color: var(--component-base07);

			&[data-align='right'] {
				text-align: right;
			}
		}
		.container {
			display: flex;
			font-family: Lato;
			background: var(--hq-base-2400);
			border-radius: 0.2rem;

			&[data-align='right'] {
				justify-content: flex-end;
			}

			:global(div[data-button]) {
				padding: 0 0.5rem;
				height: 100%;
				font-size: 0.742rem;
				border-radius: 0.2rem;
				font-weight: 600;
				color: var(--component-base06);
			}
			&[data-size='xs'] {
				height: $component-height-xs;
				padding: 0.08rem 0.4rem;

				:global(div[data-button]) {
					font-size: 0.63rem;
					padding: 0 0.5rem;
				}
			}
			&[data-size='sm'] {
				height: $component-height-sm;
				padding: 0.15rem 0.3rem;
				border-radius: 0.2rem;

				:global(div[data-button]) {
					font-size: 0.7rem;
					padding: 0 0.6rem;
					border-radius: 0.2rem;
				}
			}
			&[data-size='md'] {
				height: $component-height-md;
				padding: 0.3rem 0.4rem;
				:global(div[data-button]) {
					font-size: 0.742rem;
					padding: 0 0.5rem;
				}
			}
			&[data-size='lg'] {
				height: 1.3rem;
				:global(div[data-button]) {
					font-size: 0.8rem;
					padding: 0.19 0.5rem;
				}
			}
			&[data-size='xl'] {
				height: 3.4rem;
				padding: 0.4rem 0.5rem;
				:global(div[data-button]) {
					font-size: 1.1rem;
					padding: 0 0.8rem;
				}
			}

			&[data-size='ct'] {
				height: 1.3rem;
				:global(div[data-button]) {
					font-size: 0.8rem;
					padding: 0.19 0.5rem;
				}
			}

			&[data-vertical='true'] {
				height: fit-content;
			}
		}
	}
</style>
