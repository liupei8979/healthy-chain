<script lang="ts">
	import type { CardSize } from '../index';

	export let padding: string | undefined = undefined;
	export let size: CardSize = 'md';
	export let headerUnderBorder = true;
	export let title: string | number = '';
	export let subTitle: string | number = '';
	export let style: string | undefined = undefined;
	export let height: string | undefined = undefined;
	export let paddingContent: string | undefined = undefined;
</script>

<div
	data-card-grid
	class="root"
	data-size={size}
	style={`
  ${padding ? `padding : ${padding};` : ''}
  ${style ? `${style}` : ''}
  ${height ? `height : ${height};` : ''}

`}
>
	{#if title || subTitle}
		<div
			class="header"
			data-size={size}
			style={`
    ${!headerUnderBorder ? 'border-bottom: none;' : ''}
  `.trim()}
		>
			{#if title !== undefined || subTitle !== undefined}
				<div class="texts">
					<div class="title">{title !== undefined ? title : ''}</div>
					<div class="sub-title">{subTitle !== undefined ? subTitle : ''}</div>
				</div>
			{/if}
			<div class="command">
				<slot name="command" />
			</div>
		</div>
	{/if}
	<div
		class="contents"
		data-card-grid
		style={`${paddingContent ? `padding : ${paddingContent};` : ''}`}
	>
		<slot />
	</div>
</div>

<style lang="scss" scoped>
	.root {
		width: 100%;
		height: 100%;
		background: var(--base01);
		display: flex;
		flex-direction: column;

		&[data-size='sm'] {
			border-radius: 0.34rem;
			font-size: 0.778rem;
			.header {
				padding: 0 1rem;
				font-weight: 700;
				height: 2.7rem;
			}
			.contents {
				padding: 1rem;
				font-weight: 600;
			}
		}
		&[data-size='md'] {
			font-size: 0.887rem;
			border-radius: 0.5rem;
			.header {
				padding: 0 1rem;
				font-weight: 600;
				height: 3rem;
			}
			.contents {
				padding: 1rem;
				font-weight: 500;
			}
		}
		&[data-size='lg'] {
			font-size: 1rem;
			border-radius: 0.58rem;
			.header {
				padding: 0 1.12rem;
				font-weight: 600;
				height: 3.15rem;
			}
			.contents {
				padding: 1.12rem;
				font-weight: 500;
			}
		}
		&[data-size='xl'] {
			font-size: 1.12rem;
			border-radius: 0.64rem;
			.header {
				padding: 0 1.3rem;
				font-weight: 600;
				height: 3.3rem;
			}
			.contents {
				padding: 1.3rem;
				font-weight: 500;
			}
		}
		.header {
			border-bottom: solid 1px var(--ui-border-03);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.texts {
				font-weight: inherit;
				display: flex;
				.title {
					font-size: 22px;
					color: var(--hq-base-0300);
				}
				.sub-title {
					padding-left: 0.6rem;
					color: var(--base05);
				}
			}
		}
		.contents {
			overflow-y: scroll;
			flex: 1 0;
		}
	}
</style>
