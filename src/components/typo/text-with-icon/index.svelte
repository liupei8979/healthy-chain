<script lang="ts">
	import { Palette } from '@src/color';
	import { Icon, IconSpinProps } from '@src/components/icon';

	import { ContainerGrid } from '@src/components/container';
	import { FieldFlex, FieldGrid } from '@src/components/field';
	import { tip, type TipOption } from '@src/util/actions/tip';
	import { IconPropType, type IconProp } from '@src/util/icon/index';
	import { css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	import type { Typo } from '@src/util/typo';
	import { TypoText } from '..';

	export let onIconClick: (() => void) | undefined = undefined;
	export let icon: (Partial<IconProp> & { src: string }) | undefined = undefined;
	export let light: boolean = false;
	export let bold: boolean = false;
	export let mid: boolean = false;
	export let pad: boolean = false;
	export let h: Typo.Size = 4;
	export let harmonyName: Palette.HarmonyNameType | undefined = undefined;
	export let harmonyShade: Palette.ShadeType | undefined = undefined;
	export let iconScale: undefined | number = undefined;
	export let reverse: boolean = false;
	export let width: string | number = 'fit-content';
	export let iconCircle: boolean = false;
	export let iconRadius: string | undefined = undefined;
	export let iconColor: string | undefined = undefined;
	export let iconHarmonyName: Palette.HarmonyNameType | undefined = undefined;
	export let iconHarmonyShade: Palette.ShadeType | undefined = 1200;
	export let iconBackgroundHarmonyName: Palette.HarmonyNameType | undefined = undefined;
	export let iconBackgroundHarmonyShade: Palette.ShadeType | undefined = undefined;
	export let iconBorderHarmonyName: Palette.HarmonyNameType | undefined = undefined;
	export let iconBorderHarmonyShade: Palette.ShadeType | undefined = undefined;
	export let iconPaint: Palette.Paint.Prop | undefined = undefined;
	export let gap: string | number | undefined = undefined;
	export let tipOption: TipOption | undefined = undefined;
	export let userSelect: 'none' | 'text' | 'all' = 'text';
	export let textAlign: 'left' | 'center' | 'right' = 'left';
	export let overflow: 'visible' | 'hidden' | 'scroll' | 'auto' = 'hidden';
	export let ellipsis: boolean = false;
	export let link: string | undefined = undefined;
	export let outbound: boolean = false;
	export let mono: boolean = false;
	export let opensans: boolean = false;
	export let paint: Palette.Paint.Prop = {};
	export let textStyle: CSSProperties = {};
	export let innerHtml: string | undefined = undefined;
	export let style: CSSProperties = {};
	export let breakWord: boolean = false;
	export let iconSpin: boolean = false;

	export let numberProp: Typo.Number | undefined = undefined;
	$: _icon = icon
		? icon.type
			? (icon as IconProp)
			: ({ ...icon, type: IconPropType.PATH } as IconProp)
		: undefined;
	$: _gap = gap !== undefined ? getStyleStringUnit(gap) : 0.6 - Number(h) * 0.05;
	$: iconSize = 2 - Number(h) * 0.1 + 'rem';
	$: _iconScale = iconScale || 1 - Number(h) * 0.06;

	$: color =
		Palette.Paint.from({ paint }) ||
		((harmonyName || harmonyShade) && Palette.scss(harmonyName || 'base', harmonyShade || 2300));
	$: backgroundColor =
		iconBackgroundHarmonyName && iconBackgroundHarmonyShade
			? Palette.scss(iconBackgroundHarmonyName, iconBackgroundHarmonyShade)
			: undefined;
	$: _iconColor = iconColor
		? iconColor
		: iconPaint
			? Palette.Paint.from({ paint: iconPaint })
			: iconHarmonyName && iconHarmonyShade
				? Palette.scss(iconHarmonyName, iconHarmonyShade)
				: color;
</script>

<div class="root" data-text-with-icon use:tip={tipOption} style={css(style)}>
	<FieldGrid
		column="auto 1fr"
		style={{
			overflow,
			color,
			width: getStyleStringUnit(width)
		}}
		gap={_gap}
	>
		{#if _icon}
			<ContainerGrid
				full
				startRow={reverse ? '1' : undefined}
				startColumn={reverse ? '2' : undefined}
			>
				<FieldFlex alignItems="center" full>
					<Icon
						spin={iconSpin ? IconSpinProps.CLOCKWISE : undefined}
						onClick={() => onIconClick && onIconClick()}
						borderRadius={iconCircle ? '50%' : iconRadius ? iconRadius : undefined}
						{backgroundColor}
						color={_iconColor || color || undefined}
						paint={iconPaint}
						icon={{ ..._icon, scale: _iconScale }}
						style={{ width: iconSize, height: iconSize }}
						borderHarmonyName={iconBorderHarmonyName}
						borderHarmonyShade={iconBorderHarmonyShade}
					/>
				</FieldFlex>
			</ContainerGrid>
		{/if}
		{#if innerHtml}
			<ContainerGrid full {overflow}>
				<FieldFlex full alignItems="center">
					<TypoText
						{innerHtml}
						{mono}
						{opensans}
						{userSelect}
						{mid}
						{light}
						{bold}
						{h}
						{pad}
						{paint}
						{harmonyName}
						{harmonyShade}
						{ellipsis}
						align={textAlign}
						style={textStyle}
					/>
				</FieldFlex>
			</ContainerGrid>
		{:else if $$slots.default}
			<ContainerGrid full {overflow}>
				<FieldFlex full alignItems="center">
					<TypoText
						{opensans}
						{innerHtml}
						{mono}
						{userSelect}
						{mid}
						{light}
						{bold}
						{h}
						{pad}
						{paint}
						{harmonyName}
						{harmonyShade}
						{ellipsis}
						{breakWord}
						align={textAlign}
						style={textStyle}
					>
						<slot />
					</TypoText>
				</FieldFlex>
			</ContainerGrid>
		{/if}
	</FieldGrid>
</div>
