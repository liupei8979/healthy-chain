import type { Properties } from 'csstype';
import _ from 'lodash';

export type CSSProperties = Properties;

export function createStyle(key: string, value: string | undefined) {
	if (value === undefined) {
		return '';
	}
	return `${key.startsWith('Webkit') ? `-${_.kebabCase(key)}` : _.kebabCase(key)}:${value};`;
}

export function createStyles(...styles: CSSProperties[]) {
	const style = Object.assign({}, ...styles);

	return Object.keys(style)
		.map((key) => {
			//@ts-ignore
			return createStyle(key, style[key as any]);
		})
		.join('');
}

export function attr<T>(v: T) {
	return !_.isEmpty(v) || v ? v : undefined;
}
export const css = createStyles;
export function cssAssign(origin: CSSProperties, key: keyof CSSProperties, value: string) {
	//@ts-ignore
	origin[key] = value;
	return origin;
}

export function getStyleStringUnit(
	width: number | string | undefined,
	defaults: string | undefined = 'auto'
) {
	return width !== undefined ? (isNaN(Number(width)) ? String(width) : `${width}rem`) : 'auto';
}

export function getStyleStringUnitUndefined(width: number | string | undefined) {
	return width !== undefined ? (isNaN(Number(width)) ? String(width) : `${width}rem`) : undefined;
}
