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
