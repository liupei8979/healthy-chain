<script lang="ts">
	import { Palette } from '@src/color';
	import { Button } from '@src/components/button';
	import { ContainerFlex } from '@src/components/container';
	import { FieldFlex } from '@src/components/field';
	import { Icon } from '@src/components/icon';
	import { TypoTextWithIcon } from '@src/components/typo';
	import { DefIcons } from '@src/icons/defines';
	import { tip, type TipOption } from '@src/util/actions/tip';
	import { ComponentSizeProps } from '@src/util/component';
	import type { IconProp } from '@src/util/icon';
	import { attr, css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	import type { Typo } from '@src/util/typo';

	export let titleIcon: IconProp | undefined = undefined;
	export let title: string | undefined = undefined;
	export let titleIconPaint: Palette.Paint.Prop | undefined = undefined;
	export let dense: boolean = false;
	export let disableArea: boolean = false;
	export let style: CSSProperties = {};
	export let titleStyle: CSSProperties = {};
	export let contentStyle: CSSProperties = {};
	export let backgroundColor: string | undefined = undefined;
	export let transparent: boolean = false;
	export let height: string | number = '100%';
	export let titleH: Typo.Size = 7;
	export let titleHeight: string | number = 'fit-content';
	export let link: string | undefined = undefined;
	export let outbound: boolean = false;
	export let overflow: 'hidden' | 'visible' | 'auto' | 'scroll' = 'hidden';
	export let onClick: (() => void) | undefined = undefined;
	export let tipOption: TipOption | undefined = undefined;
	export let border: boolean = false;
	export let gap: string | number | undefined = undefined;
	export let foldable: boolean = false;
	export let folded: boolean = false;
	export let eleContent: HTMLDivElement | undefined = undefined;
	export let backgroundPaint: Palette.Paint.Prop | undefined = undefined;
	export let focus: boolean = false;
	export let strechCommand: boolean = false;
	export let titleOpensans: boolean = false;
	export let focusBackgroundPaint: Palette.Paint.Prop = {
		harmonyName: 'sapphire-blue',
		harmonyShade: 300
	};
	export let focusBorderPaint: Palette.Paint.Prop = {
		harmonyName: 'sapphire-blue',
		harmonyShade: 1000
	};

	$: _backgroundColor = focus
		? `${Palette.Paint.from({ paint: focusBackgroundPaint })} !important`
		: backgroundColor
			? backgroundColor
			: backgroundPaint
				? Palette.Paint.from({ paint: backgroundPaint })
				: transparent
					? 'transparent !important'
					: undefined;

	$: _borderColor = focus
		? `1px solid ${Palette.Paint.from({ paint: focusBorderPaint })} !important`
		: transparent
			? 'solid 1px transparent'
			: undefined;
</script>

<slot name="root" />

<div
	use:tip={tipOption}
	on:click={() => onClick && onClick()}
	on:keydown={() => {}}
	class="root"
	data-link-with-focus={attr(!!link && focus)}
	data-border={attr(border)}
	data-link={attr(link || !!onClick)}
	data-dense={attr(dense)}
	data-t="{_backgroundColor} {_borderColor}"
	data-disable-area={attr(disableArea)}
	style={css(style, {
		height: getStyleStringUnit(height),
		overflow,
		backgroundColor: _backgroundColor,
		border: _borderColor
	})}
	bind:this={eleContent}
>
	{#if focus && link}
		<div class="focus-hover-area" />
	{/if}
	{#if title}
		<FieldFlex
			height={titleHeight}
			style={{
				...(dense
					? {
							color: 'var(--hq-base-2000)',
							fontSize: '0.78rem',
							fontWeight: '600',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between'
						}
					: {
							color: 'var(--hq-base-2000)',
							fontSize: '0.72rem',
							fontWeight: '600',
							lineHeight: '1.1',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between'
						}),
				...titleStyle
			}}
		>
			<ContainerFlex>
				<TypoTextWithIcon
					opensans={titleOpensans}
					gap={0.1}
					icon={titleIcon}
					h={titleH}
					iconPaint={titleIconPaint}
					textStyle={{ paddingTop: '0.05rem' }}
				>
					{title}
				</TypoTextWithIcon>
			</ContainerFlex>
			<ContainerFlex stretch={strechCommand}>
				{#if foldable}
					<FieldFlex center>
						<slot name="command" />
						<Button ghost on:click={() => (folded = !folded)}>
							<Icon
								size={ComponentSizeProps.SM}
								icon={DefIcons.Common.DownCheveron}
								style={{
									transform: folded ? 'rotate(180deg)' : 'rotate(0deg)',
									transition: 'transform .2s'
								}}
							/>
						</Button>
					</FieldFlex>
				{:else}
					<slot name="command" />
				{/if}
			</ContainerFlex>
		</FieldFlex>
	{/if}

	<div class="content" data-no-title={attr(!title)} style={css(contentStyle)}>
		{#if !folded}
			<slot {eleContent} />
		{/if}
	</div>
</div>

<style lang="scss">
	.root {
		padding: 0.6rem;

		border: solid 1px transparent;
		position: relative;
		color: var(--hq-base-0300);
		height: 100%;
		border-radius: 0.3rem;
		@include scrollbar-with-bg(var(--hq-base-300));

		&[data-border] {
			border-color: var(--hq-transparent-inverse-0300);
		}

		&[data-link]:hover,
		&[data-link-with-focus]:hover {
			&::after {
				content: '';
				position: absolute;
				left: 0px;
				top: 0;
				z-index: 2;
				background: var(--hq-transparent-inverse-0200);
				width: 100%;
				height: 100%;
			}
		}

		&[data-link] {
			border-color: var(--hq-transparent-inverse-0200);
			cursor: pointer;
			&:hover {
				// background-color: var(--hq-base-0400);
			}
			&:hover {
				// background: var(--hq-transparent-inverse-0300) !important;
				// border-color: var(--hq-transparent-inverse-0400) !important;
			}
		}

		.content {
			height: calc(100% - 1rem);
			padding-top: 0.4rem;
			&[data-no-title] {
				padding-top: 0;
				height: calc(100%);
			}
		}
		&[data-dense] {
			padding: 0.3rem 0.6rem;

			.content {
				padding-top: 0.2rem;
				font-size: 0.98rem;
			}
		}
		&[data-disable-area] {
			background: transparent;
			padding: 0;

			&:hover {
				&::after {
					background: transparent !important;
				}
			}
		}
	}
</style>
