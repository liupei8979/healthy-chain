<script lang="ts">
	import { Palette } from '@src/color';
	import { Button, ButtonBorderProps } from '@src/components/button-renew';
	import { FieldFlex, FieldGrid } from '@src/components/field';
	import type { IconProp } from '@src/components/icon';
	import { TypoTextWithIcon } from '@src/components/typo';
	import type { CSSProperties } from '@src/util/style';
	import type { Typo } from '@src/util/typo';

	export let onClick = () => {};
	export let iconPrefix: IconProp | undefined = undefined;
	export let icon: IconProp | undefined = undefined;
	export let iconScale: number | undefined = undefined;
	export let text: string;
	export let h: Typo.Size = 5;
	export let fit: boolean = false;
	export let style: CSSProperties = {};
	export let gap: string | number = 0.3;
	export let gapPrefix: string | number = 0.3;
	export let iconPrefixPaint: Palette.Paint.Prop = {};
	export let iconPrefixScale: number | undefined = undefined;
</script>

<Button border={ButtonBorderProps.SOFT} {fit} style={{ height: 'fit-content', ...style }} fitItems>
	<FieldGrid column="1fr auto" style={{ padding: '0.2rem 0.2rem 0.1rem' }} {gap}>
		<TypoTextWithIcon
			iconScale={iconPrefixScale}
			iconPaint={iconPrefixPaint}
			icon={iconPrefix}
			{h}
			pad
			gap={gapPrefix}>{text}</TypoTextWithIcon
		>
		{#if icon}
			<FieldFlex alignItems="center">
				<TypoTextWithIcon {h} {icon} {iconScale} gap={0} />
			</FieldFlex>
		{/if}
	</FieldGrid>
</Button>
