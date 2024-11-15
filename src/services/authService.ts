import { LoginRequest } from '../interfaces/auth/LoginRequest';
import { LoginResponse } from '../interfaces/auth/LoginResponse';
import api from './api';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/login', payload);
  console.log('login', response.data)
  return response.data;
};
