import { __Brush } from './brush';
import { __Palette } from './palette';

export { __Palette as Palette };

export namespace Color {
	export import Palette = __Palette;
	export import Brush = __Brush;
}
