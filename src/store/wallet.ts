import { writable } from 'svelte/store';

export const isMetaMaskConnected = writable(false); // MetaMask 연결 상태
export const userAddress = writable(''); // 사용자 주소
