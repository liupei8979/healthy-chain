export namespace DateUtil {
	export function formatLocalTime(isoString) {
		const date = new Date(isoString);

		if (isNaN(date.getTime())) {
			// console.error('Invalid date:', datePast);
			return '-';
		}

		// 연도, 월, 일, 시, 분, 초 추출
		const year = date.getFullYear().toString().substr(-2); // 뒤의 2자리만 추출
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
		const day = date.getDate().toString().padStart(2, '0'); // 일
		const hours = date.getHours().toString().padStart(2, '0'); // 시
		const minutes = date.getMinutes().toString().padStart(2, '0'); // 분
		const seconds = date.getSeconds().toString().padStart(2, '0'); // 초

		// 형식에 맞게 조합
		return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
	}

	export function displayTime(timeValue) {
		return timeValue ? DateUtil.formatLocalTime(timeValue) : 'No data';
	}

	export function formatTimeAgo(datePast: Date | string): string {
		let date = new Date(datePast);
		// 유효한 날짜인지 확인w
		if (isNaN(date.getTime())) {
			// console.error('Invalid date:', datePast);
			return '-';
		}

		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

		//시간 계산
		let interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + ' years ago';
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + ' months ago';
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + ' days ago';
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + ' hours ago';
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + ' minutes ago';
		}
		return Math.floor(seconds) + ' seconds ago';
	}
}
