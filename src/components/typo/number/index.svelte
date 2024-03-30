<script lang="ts">
	import { Palette } from '@src/color';
	import type { TipOption } from '@src/util/actions/tip';
	import type { Typo } from '@src/util/typo';
	import { TypoSub, TypoText } from '..';

	export let value: number | string | undefined;

	export let prop: Typo.Number = {};
	export let paint: Palette.Paint.Prop = {};
	export let tipOption: TipOption | undefined = undefined;

	$: h = prop.h || 6;
	$: smallDecimal = prop.smallDecimal || false;
	$: defaultDisplay = prop.defaultDisplay || undefined;
	$: bold = prop.bold || false;
	$: mid = prop.mid || false;
	$: light = prop.light || false;
	$: boldDecimal = prop.boldDecimal || false;
	$: lightDecimal = prop.lightDecimal || false;
	$: midDecimal = prop.midDecimal || false;
	$: midPrefix = prop.midPrefix || false;
	$: smallSuffix = prop.smallSuffix || prop.smallDecimal || false;
	$: suffix = prop.suffix || '';
	$: prefix = prop.prefix || '';
	$: decimalOpacity = prop.decimalOpacity || 1;
	$: prefixOpacity = prop.prefixOpacity || 1;
	$: suffixOpacity = prop.suffixOpacity || 1;
	$: suffixPaint = prop.suffixPaint || undefined;
	$: suffixColor = prop.suffixColor || undefined;
	$: align = prop.align || undefined;
	$: smallPrefix = prop.smallPrefix || false;

	$: stringfiedValue = (() => {
		if (value === undefined || value === null) {
			return {
				integer: defaultDisplay || '-',
				decimal: ''
			};
		}
		// 숫자를 문자열로 변환
		const valueStr = String(value);
		// 정수 부분과 소수점 부분을 분리
		const [integer, decimal] = valueStr.includes('.') ? valueStr.split('.') : [valueStr, ''];

		return {
			integer,
			decimal: decimal ? '.' + decimal : ''
		};
	})();

	$: decimalH = <Typo.Size>(
		(smallDecimal ? Number(h) + (smallDecimal === true ? 1 : smallDecimal) : Number(h))
	);
	$: prefixH = <Typo.Size>(
		(smallPrefix ? Number(h) + (smallPrefix === true ? 1 : smallPrefix) : Number(h))
	);

	$: suffixH = <Typo.Size>(
		(smallSuffix ? Number(h) + (smallSuffix === true ? 1 : smallSuffix) : Number(h))
	);
</script>

<TypoText
	{tipOption}
	style={{ lineHeight: undefined }}
	{h}
	mono
	{bold}
	{mid}
	{light}
	{align}
	{paint}
	breakAll
>
	{#if prefix && value !== undefined}
		<TypoSub opacity={prefixOpacity}>
			<TypoText h={prefixH} mid={midPrefix}>
				{prefix}
			</TypoText>
		</TypoSub>
	{/if}
	{stringfiedValue.integer}{#if stringfiedValue.decimal}<TypoSub
			style={{ verticalAlign: 'baseline' }}
			opacity={decimalOpacity}
			><TypoText h={decimalH} bold={boldDecimal} light={lightDecimal} inline mid={midDecimal}
				>{stringfiedValue.decimal}</TypoText
			></TypoSub
		>
	{/if}
	{#if suffix && value !== undefined}
		<TypoSub
			opacity={suffixOpacity}
			style={{ color: suffixColor || Palette.Paint.from({ paint: suffixPaint }) }}
		>
			<TypoText h={suffixH} bold={boldDecimal} light={lightDecimal} mid={midDecimal}>
				{suffix}
			</TypoText>
		</TypoSub>
	{/if}
</TypoText>
