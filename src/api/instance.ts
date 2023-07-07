import { TOKEN_KEY } from '@/constants/auth';
import { getToken } from '@/utils/token';
import axios from 'axios';

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop/';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// interceptors : then | catch로 처리되기 전에 요청과 응답을 가로챌수 있다.
instance.interceptors.request.use((config) => {
  // 요청을 보내기 전 수행할 로직 (에러 발생시 실행될 로직도 설정 가능)
  const token = getToken(TOKEN_KEY);

  config.headers['Authorization'] = token ? `Bearer ${token}` : '';

  return config;
});
