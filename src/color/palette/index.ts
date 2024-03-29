import { Palette } from '../';
import _ from 'lodash';

export namespace __Palette {
	export const HarmonyNameList: Palette.HarmonyNameType[] = [
		'sapphire-blue',
		'vermilion-orange',
		'selective-yellow',
		'powder-blue',
		'lavender-purple',
		'imperial-red',
		'celadon-blue',
		'indian-yellow',
		'peel-yellow',
		'rossa-red',
		'seinna-pink',
		'dard-red',
		'ocean-green',
		'sage-green',
		'prussian-blue',
		'sea-green',
		'light-green',
		'ruby-magenta',
		'violet-blue',
		'flower-blue',
		'swim-red'
	];
	export interface Unit {
		color: string;
		backgroundColor: string;
		borderColor?: string;
	}

	export enum Action {
		BASE = 'base',
		HOVER = 'hover',
		ACTIVE = 'active'
	}
	export enum Depth {
		NORMAL = 'normal',
		DARD = 'dard',
		DEEP = 'deep'
	}

	export type HarmonyLevelType =
		| 'Lv1'
		| 'Lv2'
		| 'Lv3'
		| 'Lv4'
		| 'Lv5'
		| 'Lm1'
		| 'Lm2'
		| 'Lm3'
		| 'Lm4'
		| 'Lm5';
	export type HarmonyNameType =
		| 'transparent-inverse'
		| 'transparent'
		| 'imperial-red'
		| 'powder-blue'
		| 'celadon-blue'
		| 'prussian-blue'
		| 'selective-yellow'
		| 'indian-yellow'
		| 'peel-yellow'
		| 'vermilion-orange'
		| 'rossa-red'
		| 'dard-red'
		| 'seinna-pink'
		| 'sapphire-blue'
		| 'ocean-green'
		| 'light-green'
		| 'ruby-magenta'
		| 'lavender-purple'
		| 'violet-blue'
		| 'flower-blue'
		| 'sage-green'
		| 'sea-green'
		| 'swim-red'
		| 'base';

	export type ShadeType =
		| 100
		| 200
		| 300
		| 400
		| 500
		| 600
		| 700
		| 800
		| 900
		| 1000
		| 1100
		| 1200
		| 1300
		| 1400
		| 1500
		| 1600
		| 1700
		| 1800
		| 1900
		| 2000
		| 2100
		| 2200
		| 2300
		| 2400
		| 2500;

	export function getHarmonyName(type: HarmonyNameType) {
		return type;
	}

	export function scss(color: HarmonyNameType, shade: ShadeType | number) {
		return `var(--hq-${color}-${shade < 1000 ? '0' + shade : shade})`;
	}

	export type Group<T = Unit> = {
		[key in Action]: T;
	};

	export type Harmony<T = Unit> = {
		[key in Depth]: Group<T>;
	};
	type PartialHarmony = {
		[key in Depth]?: Partial<Partial<Group<Partial<Unit>>>>;
	};

	type HamonyWithLevel = {
		[key in HarmonyLevelType]: Harmony;
	};

	export function assignHarmony(origin: Harmony, target: PartialHarmony) {
		return _.merge(origin, target) as Harmony;
	}
	// export function customBaseHarmony(origin: Harmony, )

	class _Harmonies {
		public static readonly _names: HarmonyNameType[] = [
			'transparent-inverse',
			'transparent',
			'imperial-red',
			'powder-blue',
			'celadon-blue',
			'prussian-blue',
			'selective-yellow',
			'indian-yellow',
			'peel-yellow',
			'vermilion-orange',
			'rossa-red',
			'dard-red',
			'seinna-pink',
			'sapphire-blue',
			'ocean-green',
			'sage-green',
			'sea-green',
			'light-green',
			'ruby-magenta',
			'lavender-purple',
			'violet-blue',
			'flower-blue',
			'swim-red',
			'base'
		];
		public static readonly _shades: ShadeType[] = [
			100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,
			1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500
		];
		private static _transparent_inverse = build('transparent-inverse');
		private static _transparent = build('transparent');
		private static _base = build('base');
		private static _celadonBlue = build('celadon-blue');
		private static _dardRed = build('dard-red');
		private static _flowerBlue = build('flower-blue');
		private static _imperialRed = build('imperial-red');
		private static _indianYellow = build('indian-yellow');
		private static _lavenderPurple = build('lavender-purple');
		private static _lightGreen = build('light-green');
		private static _sageGreen = build('sage-green');
		private static _seaGreen = build('sea-green');
		private static _oceanGreen = build('ocean-green');
		private static _peelYellow = build('peel-yellow');
		private static _powderBlue = build('powder-blue');
		private static _prussianBlue = build('prussian-blue');
		private static _rossaRed = build('rossa-red');
		private static _rubyMagenta = build('ruby-magenta');
		private static _sapphireBlue = build('sapphire-blue');
		private static _seinnaPink = build('seinna-pink');
		private static _selectiveYellow = build('selective-yellow');
		private static _vermilionOrange = build('vermilion-orange');
		private static _violetBlue = build('violet-blue');
		private static _swimRed = build('swim-red');

		public static getHarmonyWithLevel(base: HarmonyNameType) {
			return _.cloneDeep(
				_Harmonies[`_${_.camelCase(base)}` as keyof typeof _Harmonies]
			) as HamonyWithLevel;
		}

		public static get(base: HarmonyNameType, level: HarmonyLevelType) {
			const name = `_${_.camelCase(base)}`;
			const harmonyWithLevel = _.cloneDeep(
				_Harmonies[`_${_.camelCase(base)}` as keyof typeof _Harmonies]
			) as HamonyWithLevel;

			return harmonyWithLevel[level];
		}

		public static get transparentInverse() {
			return _.cloneDeep(_Harmonies._transparent_inverse);
		}

		public static get transparent() {
			return _.cloneDeep(_Harmonies._transparent);
		}
		public static get base() {
			return _.cloneDeep(_Harmonies._base);
		}
		public static get swimRed() {
			return _.cloneDeep(_Harmonies._swimRed);
		}
		public static get celadonBlue() {
			return _.cloneDeep(_Harmonies._celadonBlue);
		}
		public static get dardRed() {
			return _.cloneDeep(_Harmonies._dardRed);
		}
		public static get flowerBlue() {
			return _.cloneDeep(_Harmonies._flowerBlue);
		}
		public static get imperialRed() {
			return _.cloneDeep(_Harmonies._imperialRed);
		}
		public static get indianYellow() {
			return _.cloneDeep(_Harmonies._indianYellow);
		}
		public static get lavenderPurple() {
			return _.cloneDeep(_Harmonies._lavenderPurple);
		}
		public static get lightGreen() {
			return _.cloneDeep(_Harmonies._lightGreen);
		}
		public static get oceanGreen() {
			return _.cloneDeep(_Harmonies._oceanGreen);
		}
		public static get peelYellow() {
			return _.cloneDeep(_Harmonies._peelYellow);
		}
		public static get powderBlue() {
			return _.cloneDeep(_Harmonies._powderBlue);
		}
		public static get prussianBlue() {
			return _.cloneDeep(_Harmonies._prussianBlue);
		}
		public static get rossaRed() {
			return _.cloneDeep(_Harmonies._rossaRed);
		}
		public static get rubyMagenta() {
			return _.cloneDeep(_Harmonies._rubyMagenta);
		}
		public static get sapphireBlue() {
			return _.cloneDeep(_Harmonies._sapphireBlue);
		}
		public static get seinnaPink() {
			return _.cloneDeep(_Harmonies._seinnaPink);
		}
		public static get selectiveYellow() {
			return _.cloneDeep(_Harmonies._selectiveYellow);
		}
		public static get vermilionOrange() {
			return _.cloneDeep(_Harmonies._vermilionOrange);
		}
		public static get violetBlue() {
			return _.cloneDeep(_Harmonies._violetBlue);
		}
		public static get sageGreen() {
			return _.cloneDeep(_Harmonies._sageGreen);
		}
		public static get seaGreen() {
			return _.cloneDeep(_Harmonies._seaGreen);
		}
	}

	function build(harmonyName: HarmonyNameType) {
		const Lv1 = gen(harmonyName, 300, 1800);
		const Lv2 = gen(harmonyName, 700, 2000);
		const Lv3 = gen(harmonyName, 1100, 2100, 200);
		const Lv4 = gen(harmonyName, 1500, 2300, 200);
		const Lv5 = gen(harmonyName, 1900, 2500, 200);

		const Lm1 = genMid(harmonyName, 600, 100);
		const Lm2 = genMid(harmonyName, 900, 200);
		const Lm3 = genMid(harmonyName, 1200, 300, 100);
		const Lm4 = genMid(harmonyName, 1500, 400, 200);
		const Lm5 = genMid(harmonyName, 1800, 500, 200);

		return {
			Lv1,
			Lv2,
			Lv3,
			Lv4,
			Lv5,
			Lm1,
			Lm2,
			Lm3,
			Lm4,
			Lm5
		};
	}
	function gen(
		harmonyName: HarmonyNameType,
		bgShade: ShadeType,
		colorShade: ShadeType,
		bgAdditional: 0 | 100 | 200 = 0
	): Harmony {
		return {
			normal: {
				base: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, bgShade),
					borderColor: scss(harmonyName, (bgShade + 300) as ShadeType)
				},
				hover: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 100 + bgAdditional) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 400 + bgAdditional) as ShadeType)
				},
				active: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 200 + bgAdditional) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 500 + bgAdditional) as ShadeType)
				}
			},

			dard: {
				base: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 100) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 400) as ShadeType)
				},
				hover: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 200 + bgAdditional) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 500 + bgAdditional) as ShadeType)
				},
				active: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 300 + bgAdditional) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 600 + bgAdditional) as ShadeType)
				}
			},

			deep: {
				base: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 200) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 500) as ShadeType)
				},
				hover: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 300 + bgAdditional) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 600 + bgAdditional) as ShadeType)
				},
				active: {
					color: scss(harmonyName, colorShade),
					backgroundColor: scss(harmonyName, (bgShade + 400 + bgAdditional) as ShadeType),
					borderColor: scss(harmonyName, (bgShade + 700 + bgAdditional) as ShadeType)
				}
			}
		};
	}

	function genMid(
		hormonyName: HarmonyNameType,
		bgShade: ShadeType,
		colorShade: ShadeType,
		bgAdditinal: 0 | 100 | 200 = 0
	): Harmony {
		return {
			normal: {
				base: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, bgShade),
					borderColor: scss(hormonyName, (bgShade + 300) as ShadeType)
				},
				hover: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 100 + bgAdditinal) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 400 + bgAdditinal) as ShadeType)
				},
				active: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 200 + bgAdditinal) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 500 + bgAdditinal) as ShadeType)
				}
			},

			dard: {
				base: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 100) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 400) as ShadeType)
				},
				hover: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 200 + bgAdditinal) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 500 + bgAdditinal) as ShadeType)
				},
				active: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 300 + bgAdditinal) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 600 + bgAdditinal) as ShadeType)
				}
			},

			deep: {
				base: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 200) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 500) as ShadeType)
				},
				hover: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 300 + bgAdditinal) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 600 + bgAdditinal) as ShadeType)
				},
				active: {
					color: scss(hormonyName, colorShade),
					backgroundColor: scss(hormonyName, (bgShade + 400 + bgAdditinal) as ShadeType),
					borderColor: scss(hormonyName, (bgShade + 700 + bgAdditinal) as ShadeType)
				}
			}
		};
	}

	export const Harmonies = _Harmonies;

	export namespace Delta {
		export function getHarmonyName(delta?: number) {
			return (!delta ? 'base' : delta > 0 ? 'ocean-green' : 'imperial-red') as HarmonyNameType;
		}
	}

	export namespace Paint {
		export interface Prop {
			color?: string;
			harmonyName?: HarmonyNameType;
			harmonyShade?: ShadeType;
		}

		export function get(name: HarmonyNameType, shade: ShadeType) {
			return {
				harmonyName: name,
				harmonyShade: shade
			} as Prop;
		}
		export function from(arg: {
			paint: Prop | undefined;
			defaultHarmonyName?: HarmonyNameType;
			defaultHarmonyShade?: ShadeType;
		}) {
			const { paint: paint, defaultHarmonyName, defaultHarmonyShade } = arg;

			const harmonyName = paint?.harmonyName || defaultHarmonyName;
			const harmonyShade = paint?.harmonyShade || defaultHarmonyShade;
			return paint?.color || (harmonyName && harmonyShade && scss(harmonyName, harmonyShade));
		}

		export const SetTable: {
			[key in 'positive' | 'negative' | 'neutral' | 'warn' | 'tonedown']: Prop;
		} = {
			positive: {
				harmonyName: 'light-green',
				harmonyShade: 1700
			},
			negative: {
				harmonyName: 'dard-red',
				harmonyShade: 1700
			},
			neutral: {
				harmonyName: 'base',
				harmonyShade: 2300
			},
			warn: {
				harmonyName: 'vermilion-orange',
				harmonyShade: 1700
			},
			tonedown: {
				harmonyName: 'base',
				harmonyShade: 1700
			}
		};
	}

	export namespace Preset {
		export const tableLinkColor = Palette.scss('sapphire-blue', 1500);
		export const positiveColor = Palette.scss('light-green', 1100);
		export const negativeColor = Palette.scss('dard-red', 1500);
		export const linkPaint: Palette.Paint.Prop = {
			harmonyName: 'sapphire-blue',
			harmonyShade: 1500
		};
		export const positionColorPaint: Palette.Paint.Prop = {
			harmonyName: 'light-green',
			harmonyShade: 1700
		};
		export const negativeColorPaint: Palette.Paint.Prop = {
			harmonyName: 'dard-red',
			harmonyShade: 1700
		};
		export function getCommissionPaint(comm: string | number) {
			const commission = Number(comm);
			if (commission == 0) {
				return Palette.Paint.get('light-green', 1600);
			} else if (commission > 0.25) {
				return Palette.Paint.get('dard-red', 1600);
			} else {
				return Palette.Paint.get('base', 1800);
			}
		}
	}

	export namespace Vote {
		export const harmonyName: { [key in string]: HarmonyNameType } = {
			notVoted: 'base',
			voted: 'flower-blue',
			yes: 'light-green',
			no: 'dard-red',
			veto: 'seinna-pink',
			abstain: 'base',
			rejected: 'dard-red',
			failed: 'imperial-red',
			votingPeriod: 'vermilion-orange',
			depositPeriod: 'base',
			weightedVote: 'powder-blue'
		};

		export const notVoted = Harmonies.get(harmonyName.notVoted, 'Lv1');
		export const voted = Harmonies.get(harmonyName.voted, 'Lv3');
		export const yes = Harmonies.get(harmonyName.yes, 'Lv3');
		export const yesWithWideRange = Harmonies.get('sea-green', 'Lv3');
		export const no = Harmonies.get(harmonyName.no, 'Lv3');
		export const noWithWideRange = Harmonies.get('imperial-red', 'Lv3');
		export const veto = Harmonies.get(harmonyName.veto, 'Lv3');
		export const abstain = Harmonies.get(harmonyName.abstain, 'Lv3');
		export const rejected = Harmonies.get(harmonyName.rejected, 'Lv3');
		export const failed = Harmonies.get(harmonyName.failed, 'Lv3');
		export const votingPeriod = Harmonies.get(harmonyName.votingPeriod, 'Lv3');
		export const depositPeriod = Harmonies.get(harmonyName.depositPeriod, 'Lv3');
		export const weightedVote = Harmonies.get(harmonyName.weightedVote, 'Lv3');
	}

	export const Link = {
		color: Palette.scss('sapphire-blue', 1700)
	};
}
