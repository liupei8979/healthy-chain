export { default as Icon } from './index.svelte';

export enum IconPropType {
	IMAGE = 'image',
	SVG = 'svg',
	PATH = 'path'
}
export interface IconProp {
	type: IconPropType;
	src: string;
	scale?: number;
	defaultSrc?: string;
}

export enum IconFlipProps {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

export enum IconSpinProps {
	CLOCKWISE = 'clockwise',
	COUNTERCLOCKWISE = 'counterclockwise'
}

import type { CSSProperties } from '@src/util/style';

export function getIconTransfromStyle(
	size: number,
	flip: IconFlipProps | undefined | true,
	rotate: number,
	color?: string | undefined
) {
	const transform = [];
	const styles = [];
	if (size !== undefined) {
		const width = `${size * 1}rem`;
		styles.push(['width', width]);
		styles.push(['height', width]);
	}
	styles.push(['fill', color !== undefined ? color : 'currentColor']);

	flip && flip === 'horizontal' && transform.push('scaleX(-1)');
	flip && flip === 'vertical' && transform.push('scaleY(-1)');
	rotate != 0 && transform.push(`rotate(${rotate}deg)`);
	transform.length > 0 &&
		(styles.push(['transform', transform.join(' ')]), styles.push(['transform-origin', 'center']));

	const result: CSSProperties = {};
	for (const style of styles) {
		//@ts-ignore
		result[style[0]] = style[1];
	}

	return result;
}
