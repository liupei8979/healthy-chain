export function formatDomain(domain: string): string {
	const replacements = {
		'account-with-tx': 'Account With Tx',
		account: 'Account',
		asset: 'Asset',
		chain: 'Chain',
		cosmostation: 'Cosmostation',
		'demon-parser': 'Demon Parser',
		'dev-activity': 'Dev Activity',
		dydx: 'Dydx',
		heartbeat: 'Heartbeat',
		'ibc-v2': 'Ibc V2',
		journey: 'Journey',
		medium: 'Medium',
		proposal: 'Proposal',
		transaction: 'Transaction',
		validator: 'Validator'
	};

	// 특정 도메인 규칙이 정의된 경우, 해당 규칙을 사용
	for (const [key, value] of Object.entries(replacements)) {
		if (domain.startsWith(key)) {
			return domain
				.replace(key, value)
				.split('.')
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(' ');
		}
	}

	// 일반적인 변환 규칙을 적용
	return domain
		.split(/[-.]/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}
