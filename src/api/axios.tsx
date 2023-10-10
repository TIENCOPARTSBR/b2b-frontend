import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiAdmin = (ctx: any) => {
  const { 'adminAuth.token': token } = parseCookies(ctx);

  const api = axios.create({
    //baseURL: 'https://newb2bencoparts-qas.azurewebsites.net/api',
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