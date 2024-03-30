<script lang="ts">
	import { attr, css, getStyleStringUnit, type CSSProperties } from '@src/util/style';
	import { ButtonGroupAlignProps } from './index';
	export let width: string | number | undefined = undefined;
	export let style: CSSProperties = {};
	export let align: ButtonGroupAlignProps = ButtonGroupAlignProps.HORIZONTAL;
	export let gap: string | number = '';

	$: {
		style.width = getStyleStringUnit(width);
		style.gap = getStyleStringUnit(gap);
	}
</script>

<div
	class="group-button-container"
	style={css(style)}
	data-align={attr(align)}
	data-width={attr(width)}
	data-button-group
>
	<slot />
</div>

<style lang="scss">
	.group-button-container {
		&[data-align='horizontal'] {
			display: flex;
			flex-direction: row;

			:global(div[data-button]) {
				border-radius: 0rem;
				width: 100%;

				&:first-child {
					border-top-left-radius: 0.25rem;
					border-bottom-left-radius: 0.25rem;
				}
				&:last-child {
					border-top-right-radius: 0.25rem;
					border-bottom-right-radius: 0.25rem;
				}
				//겹치는 버튼 컴포넌트 border 처리
				&:not(:first-child) {
					border-left: 0rem;
				}
			}
		}
		&[data-align='vertical'] {
			display: flex;
			flex-direction: column;

			:global(div[data-button]) {
				border-radius: 0rem;
				width: 100%;

				&:first-child {
					border-top-left-radius: 0.25rem;
					border-top-right-radius: 0.25rem;
				}
				&:last-child {
					border-bottom-left-radius: 0.25rem;
					border-bottom-right-radius: 0.25rem;
				}
				//겹치는 버튼 컴포넌트 border 처리
				&:not(:first-child) {
					border-top: 0rem;
				}
			}
		}
	}
</style>
