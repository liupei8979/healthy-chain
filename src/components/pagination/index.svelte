<script lang="ts" context="module">
	export interface PaginationOptionProps {
		totalCount?: number;
		itemCountPerPage: number;
		buttonCount: number;
		disablePageEnd: boolean;
		disablePageNext: boolean;
		onPageChange?: (page: number, max: number) => void;
	}
</script>

<script lang="ts">
	import _ from 'lodash';

	import { mdiChevronLeft, mdiChevronRight, mdiPageFirst, mdiPageLast } from '@mdi/js';
	import { ButtonGroup } from '@src/components/button-group';
	import { Icon, IconPropType } from '@src/components/icon';
	import { ComponentSizeProps } from '@src/util/component';
	import { attr, css, type CSSProperties } from '@src/util/style';
	import { BCTypo } from '../typo';

	type T = $$Generic;
	export let style: CSSProperties = {};
	export let page: number = 1;
	export let items: any[] = [];
	export let selectedItems: T[] = [];
	export let options: PaginationOptionProps = {
		itemCountPerPage: 10,
		buttonCount: 10,
		disablePageEnd: false,
		disablePageNext: false
	};
	export let hiddenPagination = false;

	let pagnationDisplayIndices: number[] = [1, 2, 3, 4, 5];
	let pageLength: number = 0;
	let maxPage = Math.ceil((options.totalCount || items.length) / options.itemCountPerPage);
	let disable = false;
	$: {
		options.itemCountPerPage = options.itemCountPerPage || 10;
		options.buttonCount = options.buttonCount || 5;
		options.disablePageEnd = options.disablePageEnd || false;
		options.disablePageNext = options.disablePageNext || false;
	}
	$: {
		if (items.length > 0) {
			pageLength = maxPage = Math.ceil(
				(options.totalCount || items.length) / options.itemCountPerPage
			);
			page > maxPage && (page = maxPage);
			page < 1 && (page = 1);

			pagnationDisplayIndices = [page];

			for (let i = 1; i <= Math.floor(options.buttonCount / 2); i++) {
				pagnationDisplayIndices.push(page + i);
				pagnationDisplayIndices.unshift(page - i);
			}

			pagnationDisplayIndices[0] < 1 &&
				(pagnationDisplayIndices = pagnationDisplayIndices.map(
					(f) => f - pagnationDisplayIndices[0] + 1
				));

			_.takeRight(pagnationDisplayIndices)[0] > maxPage &&
				(pagnationDisplayIndices = pagnationDisplayIndices.map(
					(f) => f - (pagnationDisplayIndices[pagnationDisplayIndices.length - 1] - maxPage)
				));

			selectedItems = items.slice(
				(page - 1) * options.itemCountPerPage,
				page * options.itemCountPerPage
			);
			disable = false;
		} else {
			pagnationDisplayIndices = [1];
			disable = true;
			selectedItems = [];
		}
	}
</script>

{#if !hiddenPagination}
	<div style={css(style)} class="root">
		<ButtonGroup>
			{#if !options.disablePageEnd}
				<div
					class="pagination-button"
					data-command
					on:keydown
					on:click={() =>
						!disable &&
						page !== 1 &&
						((page = 1), options.onPageChange && options.onPageChange(page, maxPage))}
					data-disable={attr(disable || page === 1)}
				>
					<Icon
						size={ComponentSizeProps.XXS}
						icon={{ type: IconPropType.PATH, src: mdiPageFirst }}
					/>
				</div>
			{/if}
			{#if !options.disablePageNext}
				<div
					class="pagination-button"
					data-command
					on:keydown
					on:click={() =>
						!disable &&
						page !== 1 &&
						(page--, options.onPageChange && options.onPageChange(page, maxPage))}
					data-disable={attr(disable || page === 1)}
				>
					<Icon
						size={ComponentSizeProps.XXS}
						icon={{ type: IconPropType.PATH, src: mdiChevronLeft }}
					/>
				</div>
			{/if}
			{#each pagnationDisplayIndices as index}
				{#if index > 0}
					<div
						class="pagination-button"
						data-selected={attr(index === page ? true : undefined)}
						on:click={() => (
							(page = index), options.onPageChange && options.onPageChange(page, maxPage)
						)}
						on:keydown
					>
						<div class="content">
							<BCTypo.Number value={index} prop={{ h: 7 }} />
						</div>
					</div>
				{/if}
			{/each}
			{#if !options.disablePageNext}
				<div
					class="pagination-button"
					data-command
					on:click={() =>
						!disable &&
						page !== maxPage &&
						(page++, options.onPageChange && options.onPageChange(page, maxPage))}
					on:keydown
					data-disable={attr(disable || page === maxPage)}
				>
					<Icon
						size={ComponentSizeProps.XXS}
						icon={{ type: IconPropType.PATH, src: mdiChevronRight }}
					/>
				</div>
			{/if}
			{#if !options.disablePageEnd}
				<div
					class="pagination-button"
					data-command
					on:keydown
					on:click={() => (
						!disable && page !== maxPage && (page = maxPage),
						options.onPageChange && options.onPageChange(page, maxPage)
					)}
					data-disable={attr(disable || page === maxPage)}
				>
					<Icon
						size={ComponentSizeProps.XXS}
						icon={{ type: IconPropType.PATH, src: mdiPageLast }}
					/>
				</div>
			{/if}
		</ButtonGroup>
	</div>
{/if}

<style lang="scss">
	.pagination-button {
		min-width: 1.2rem;
		padding: 0 0.5rem;
		height: 1.4rem;
		margin: 0 0.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--hq-base-0700);

		cursor: pointer;
		.content {
			transform: translate(0, 0px) scale(0.9);
		}
		&[data-command] {
			padding: 0 0rem;
		}
		&[data-disable] {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&[data-selected] {
			border-radius: 0.2rem;
			background: var(--hq-base-1800);
			color: var(--hq-base-0300);
		}
	}
	.root {
		font-weight: 600;
	}
</style>
