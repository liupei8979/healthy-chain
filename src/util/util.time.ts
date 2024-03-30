import _mtz from 'moment-timezone';

_mtz.tz.setDefault();
export async function wait(ms: number = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function tick() {
	await wait(0);
}

export function mtz(date: string | Date | number) {
	return _mtz.tz(date, 'UTC');
}
