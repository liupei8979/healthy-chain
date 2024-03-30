<script>
	import { onMount } from 'svelte';
	import { isMetaMaskConnected, userAddress } from '@src/store/wallet';

	onMount(async () => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				const accounts = await window.ethereum.request({ method: 'eth_accounts' });
				if (accounts.length > 0) {
					isMetaMaskConnected.set(true);
					userAddress.set(accounts[0]);
				}
			} catch (error) {
				console.error('Error checking MetaMask accounts:', error);
			}
		}
	});

	async function connectMetaMask() {
		if (typeof window.ethereum !== 'undefined') {
			try {
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				isMetaMaskConnected.set(true);
				userAddress.set(accounts[0]);
			} catch (error) {
				console.error('Error connecting to MetaMask:', error);
			}
		} else {
			console.log('MetaMask is not installed.');
		}
	}
</script>

{#if $isMetaMaskConnected}
	<p>Connected: {$userAddress}</p>
{:else}
	<button on:click={connectMetaMask}>Connect MetaMask</button>
{/if}
