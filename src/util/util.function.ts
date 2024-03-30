export function exec<T>(arg: () => T) {
	return arg();
}
