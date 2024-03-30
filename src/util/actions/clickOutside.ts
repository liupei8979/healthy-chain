export function clickOutside(
	node: HTMLElement,
	arg: {
		callback: () => void;
		rootNode?: Element | null;
	}
): SvelteActionReturnType {
	const { callback, rootNode } = arg;
	const _rootNode = rootNode ? rootNode : document.querySelector('.root-body');
	const handleClick = (event: any) => {
		if (!node.contains(event.target)) {
			callback();
		}
	};
	_rootNode?.addEventListener('click', handleClick, true);
	return {
		destroy() {
			_rootNode?.removeEventListener('click', handleClick, true);
		}
	};
}
