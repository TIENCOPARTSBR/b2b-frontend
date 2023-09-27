import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiClient = (ctx: any) => {
  const { 'adminAuth.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (token) {
    api.defaults.headers['Authorizarton'] = `Bearer ${token}`;
  }

  return api;
}