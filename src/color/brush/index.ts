import { css, type CSSProperties } from '@src/util/style';

import _ from 'lodash';
import { Palette } from '../';

export namespace __Brush {
	export function create(set: Palette.Harmony) {
		return new BrushInstance(set);
	}
	export class BrushInstance {
		private _colorSet: Palette.Harmony;
		private _status = Palette.Action.BASE;
		private _prop = Palette.Depth.NORMAL;
		private _reverse = false;
		private _transition = true;
		private _usage: { color: boolean; backgroundColor: boolean; borderColor: boolean } = {
			color: true,
			backgroundColor: true,
			borderColor: true
		};
		public constructor(set: Palette.Harmony) {
			this._colorSet = _.cloneDeep(set);
		}
		public setStatus(status: Palette.Action) {
			this._status = status;
			return this;
		}

		public setProp(prop: Palette.Depth) {
			this._prop = prop;
			return this;
		}
		public setColor(color: Palette.HarmonyNameType, level: Palette.HarmonyLevelType) {
			this._colorSet = Palette.Harmonies.get(color, level);
			return this;
		}
		public setColorSet(set: Palette.Harmony) {
			this._colorSet = set;
			return this;
		}
		public setReverse(reverse: boolean) {
			this._reverse = reverse;
			return this;
		}
		public setTransition(transition: boolean) {
			this._transition = transition;
			return this;
		}

		public setUsage(
			arg: { color?: boolean; backgroundColor?: boolean; borderColor?: boolean } | true
		) {
			const {
				color = true,
				backgroundColor = true,
				borderColor = true
			} = arg === true
				? {
						color: true,
						backgroundColor: true,
						borderColor: true
					}
				: arg;

			this._usage = {
				color,
				backgroundColor,
				borderColor
			};

			return this;
		}
		/**
		 * @description return string styles
		 */
		public compile(origin?: CSSProperties) {
			return css(this.build(origin));
		}

		/**
		 * @description return object styles
		 */

		public build(origin?: CSSProperties) {
			const colorSet = this._colorSet[this._prop][this._status];

			return Object.assign(
				origin || ({} as CSSProperties),
				this._reverse
					? {
							backgroundColor: this._usage.backgroundColor ? colorSet.color : undefined,
							color: this._usage.color ? colorSet.backgroundColor : undefined,
							borderColor: this._usage.borderColor ? colorSet.borderColor : undefined
						}
					: {
							backgroundColor: this._usage.backgroundColor ? colorSet.backgroundColor : undefined,
							color: this._usage.color ? colorSet.color : undefined,
							borderColor: this._usage.borderColor ? colorSet.borderColor : undefined
						},
				this._transition ? { transition: 'color .15s, background-color .15s' } : {}
			);
		}
	}
}
