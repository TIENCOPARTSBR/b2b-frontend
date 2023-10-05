import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiDirectDistributor = (ctx: any) => {
  const { 'directDistributorAuth.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://newb2bencoparts-qas.azurewebsites.net/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (token) {
    api.defaults.headers['Authorizarton'] = `Bearer ${token}`;
  }

  return api;
}