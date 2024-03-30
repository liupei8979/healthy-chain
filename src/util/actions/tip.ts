import { getStyleStringUnit } from '../style';
import { wait } from '../util.time';

export enum TipPosition {
	Top = 'top',
	Bottom = 'bottom',
	Left = 'left',
	Right = 'right'
}
export interface TipOption {
	enable?: boolean;
	html?: string;
	width?: number | string;
	click?: boolean;
	diff?: string | number;
	textCenter?: boolean;
	x?: string;
	y?: string;
	position?: TipPosition;
}
export function tip(
	node: HTMLElement | SVGElement,
	options: TipOption | undefined
): SvelteActionReturnType {
	if (!options?.enable) {
		return { destroy() {} };
	}
	const {
		enable = true,
		click = false,
		html,
		width,
		textCenter = false,
		position = TipPosition.Bottom as TipPosition,
		diff = position === TipPosition.Left || position === TipPosition.Right ? 0.5 : 0.5,
		x = '0px',
		y = '0px'
	} = options;
	let status: boolean = false;
	const content = document.createElement('div');
	content.className = '__tip-content';
	content.innerHTML = html || '';
	content.style.width = getStyleStringUnit(width);
	content.style.textAlign = textCenter ? 'center' : 'left';
	content.setAttribute('data-position', position);

	const tip = document.createElement('div');
	tip.className = '__tip';
	tip.appendChild(content);
	let timeout: NodeJS.Timer;
	if (enable) {
		function onMouseOver() {
			const rect = node.getBoundingClientRect();

			const diffRem = getStyleStringUnit(diff);
			const contentRoot = document.querySelector('#content-root') as HTMLElement;
			const root = contentRoot?.contains(node) ? contentRoot : document.body;
			const rootRect = root.getBoundingClientRect();
			tip.style.top = `calc(${(rect.bottom + rect.top) / 2 - rootRect.y}px`;
			tip.style.left = `${(rect.left + rect.right) / 2 - rootRect.left}px`;
			tip.style.zIndex = '100000';

			switch (position) {
				case TipPosition.Top:
					tip.style.top = `calc(${rect.top - rootRect.y}px)`;
					tip.style.transform = `translate(calc(-50% + ${x}), calc(-100% - ${diffRem} + ${y}))`;
					break;
				case TipPosition.Bottom:
					tip.style.top = `calc(${rect.bottom - rootRect.y}px)`;
					tip.style.transform = `translate(calc(-50% + ${x}), calc(0% + ${diffRem} + ${y}))`;
					break;
				case TipPosition.Left:
					tip.style.left = 'auto';
					tip.style.right = `${rootRect.right - rect.left}px`;
					tip.style.transform = `translate(calc(-0% - ${diffRem} + ${x}), calc(-50% + ${y}))`;
					break;
				case TipPosition.Right:
					tip.style.left = `${rect.right - rootRect.left}px`;
					tip.style.right = 'auto';
					tip.style.transform = `translate(calc(0% + ${diffRem} + ${x}), calc(-50% + ${y}))`;
					break;
			}
			tip.setAttribute('data-show', 'appear');
			root.appendChild(tip);
			timeout && clearTimeout(timeout);
			status = true;
		}

		async function onMouseOut() {
			tip.setAttribute('data-show', 'hidden');
			timeout = setTimeout(() => tip.remove(), 300);
			status = false;
		}
		function onClick(event: MouseEvent) {
			if (status) {
				onMouseOut();
				window.removeEventListener('click', clickOutside, true);
			} else {
				onMouseOver();
				wait().then(() => {
					window.addEventListener('click', clickOutside, true);
				});
			}
		}

		function clickOutside(event: any) {
			onClick(event);
		}
		click
			? (node as HTMLElement).addEventListener('click', onClick)
			: (node.addEventListener('mouseenter', onMouseOver),
				node.addEventListener('mouseleave', onMouseOut));

		return {
			destroy() {
				click
					? (node as HTMLElement).removeEventListener('click', onClick)
					: (node.removeEventListener('mouseenter', onMouseOver),
						node.removeEventListener('mouseleave', onMouseOut));
				click && status && window.removeEventListener('click', clickOutside);

				tip && tip.remove();
			}
		};
	} else {
		return {
			destroy() {}
		};
	}
}
