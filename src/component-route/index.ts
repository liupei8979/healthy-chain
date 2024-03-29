import { default as MainDashboard } from './main/index.svelte';
import { default as ProposalOverview } from './overview/index.svelte';
import { default as ProposalsFlow } from './flow/index.svelte';

export namespace RCChain {
	export const Flow = ProposalsFlow;
	export const Main = MainDashboard;
	export const Overview = ProposalOverview;
}
