// 먼저, 필요한 모듈을 임포트합니다.
import { API } from '@src/lib/api';
import type { __Model } from '@src/lib/api/control/model';

export namespace __Manager {
	// Task 시작 함수
	export async function startTask(taskData: __Model.TaskStart): Promise<void> {
		try {
			// API.Control 네임스페이스의 startTask 함수를 호출합니다.
			await API.Control.startTask(taskData);
			console.log('Task started successfully');
		} catch (error) {
			console.error('Error starting task:', error);
			throw error; // 오류를 다시 throw하여 호출하는 측에서 처리할 수 있도록 합니다.
		}
	}

	// Task 활성화/비활성화 함수
	export async function activateTask(taskData: __Model.TaskActivate): Promise<void> {
		try {
			// API.Control 네임스페이스의 endTask 함수를 호출합니다.
			await API.Control.endTask(taskData);
			console.log(`Task ${taskData.active ? 'activation' : 'deactivation'} successfully`);
		} catch (error) {
			console.error(`Error ${taskData.active ? 'activation' : 'deactivation'} task: `, error);
			throw error; // 오류를 다시 throw하여 호출하는 측에서 처리할 수 있도록 합니다.
		}
	}
}
