import type { Palette } from '@src/color/index';

export namespace Typo {
	export type Size =
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| '1'
		| '2'
		| '3'
		| '4'
		| '5'
		| '6'
		| '7'
		| '8'
		| '9';

	export interface Number {
		h?: Typo.Size;
		bold?: boolean;
		mid?: boolean;
		light?: boolean;
		boldDecimal?: boolean;
		midDecimal?: boolean;
		midPrefix?: boolean;
		lightDecimal?: boolean;
		defaultDisplay?: string;
		smallPrefix?: boolean | 1 | 2;
		smallDecimal?: boolean | 1 | 2;
		smallSuffix?: boolean | 1 | 2;

		prefix?: string;
		prefixOpacity?: number;
		suffix?: string;
		suffixOpacity?: number;
		suffixPaint?: Palette.Paint.Prop;
		suffixColor?: string;
		decimalOpacity?: number;
		align?: 'left' | 'right' | 'center';
	}

	export interface Text {
		h?: Typo.Size;
		bold?: boolean;
		mid?: boolean;
		light?: boolean;
		align?: 'left' | 'right' | 'center';
		mono?: boolean;
		opensans?: boolean;
		ellipsis?: boolean;
		copyText?: string;
		copy?: boolean;
		pad?: boolean;
		breakAll?: boolean;
	}
}
