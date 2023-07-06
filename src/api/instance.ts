import { TOKEN_KEY } from '@/constants/auth';
import { getToken } from '@/utils/token';
import axios from 'axios';

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
  const token = getToken(TOKEN_KEY);

  config.headers['Authorization'] = token ? `Bearer ${token}` : '';

  return config;
});
