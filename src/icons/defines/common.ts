import {
	mdiCheckboxBlankOutline,
	mdiCheckboxMarked,
	mdiCheckboxOutline,
	mdiChevronDown,
	mdiFilterVariant,
	mdiLoading,
	mdiMinusBoxOutline
} from '@mdi/js';

import { IconPropType } from '@src/components/icon';
import { SVGGlobalIcons } from '..';

export namespace __Common {
	export const FilterVariant = {
		type: IconPropType.PATH,
		src: mdiFilterVariant
	};
	export const DownCheveron = {
		type: IconPropType.PATH,
		src: mdiChevronDown
	};
	export const CheckBoxMinus = {
		type: IconPropType.PATH,
		src: mdiMinusBoxOutline
	};
	export const CheckBoxEmpty = {
		type: IconPropType.PATH,
		src: mdiCheckboxBlankOutline
	};
	export const CheckBoxCheckedFill = {
		type: IconPropType.PATH,
		src: mdiCheckboxMarked
	};
	export const CheckBoxChecked = {
		type: IconPropType.PATH,
		src: mdiCheckboxOutline
	};
	export const startButton = {
		type: IconPropType.SVG,
		src: SVGGlobalIcons.startButton
	};
	export const startButtonFocus = {
		type: IconPropType.SVG,
		src: SVGGlobalIcons.startButtonFocus
	};
	export const errorButton = {
		type: IconPropType.SVG,
		src: SVGGlobalIcons.errorButton
	};
	export const infoButton = {
		type: IconPropType.SVG,
		src: SVGGlobalIcons.infoButton
	};
	export const warnButton = {
		type: IconPropType.SVG,
		src: SVGGlobalIcons.warnButton
	};
	export const Loading = {
		type: IconPropType.PATH,
		src: mdiLoading
	};
}
