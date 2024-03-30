<script lang="ts">
	import { Palette } from '@src/color';
	import { ContainerFlex } from '@src/components/container';
	import { CardContentAccentArea } from '@src/components/content/index';
	import { TypoTextWithIcon } from '@src/components/typo';
	import { DefIcons } from '@src/icons/defines';
	import type { CSSProperties } from '@src/util/style';
	import type { Typo } from '@src/util/typo';

	export let style: CSSProperties = {};
	export let checked: boolean = false;
	export let indeterminate: boolean = false;
	export let fill: boolean = false;
	export let text: string = '';
	export let iconScale = 0.8;
	export let h: Typo.Size = 3;
	export let transparent: boolean = false;
	export let disableArea: boolean = false;
	export let onChange: ((checked: boolean) => void) | undefined = undefined;
	export let selectedPaint: Palette.Paint.Prop = {
		harmonyName: 'base',
		harmonyShade: 500
	};
	export let unselectedPaint: Palette.Paint.Prop = {
		harmonyName: 'base',
		harmonyShade: 2200
	};
	export let center: boolean = false;

	let iconStyle: CSSProperties = center
		? {
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}
		: {};
</script>

<CardContentAccentArea
	{transparent}
	{disableArea}
	onClick={() => {
		if (indeterminate) onChange ? onChange(true) : (checked = true);
		else onChange ? onChange(!checked) : (checked = !checked);
	}}
	style={{
		padding: `0.2rem ${text === '' ? '0rem' : '0.5rem'} 0.2rem 0.2rem`,
		...style
	}}
>
	{#if indeterminate}
		<TypoTextWithIcon
			style={iconStyle}
			{iconScale}
			{h}
			iconPaint={unselectedPaint}
			icon={DefIcons.Common.CheckBoxMinus}
			>{text}
		</TypoTextWithIcon>
	{:else}
		<ContainerFlex
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
		>
			<TypoTextWithIcon
				style={iconStyle}
				{iconScale}
				{h}
				iconPaint={checked ? selectedPaint : unselectedPaint}
				icon={!checked
					? DefIcons.Common.CheckBoxEmpty
					: fill
						? DefIcons.Common.CheckBoxCheckedFill
						: DefIcons.Common.CheckBoxChecked}
				>{text}
			</TypoTextWithIcon>
			{#if text === 'Info'}
				<img
					class="info-image"
					style="padding:0.5rem 0rem 1rem 0rem"
					src="src/lib/info-button.png"
					alt="Info Icon"
				/>
			{:else if text === 'Warn'}
				<img
					class="warn-image"
					style="padding:0.5rem 0rem 1rem 0rem"
					src="src/lib/warn-button.png"
					alt="Warn Icon"
				/>
			{:else if text === 'Error'}
				<img
					class="error-image"
					style="padding:0.5rem 0rem 1rem 0rem"
					src="src/lib/error-button.png"
					alt="Error Icon"
				/>
			{/if}
		</ContainerFlex>
	{/if}
</CardContentAccentArea>
