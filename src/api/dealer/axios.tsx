import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiDealer = (ctx: any) => {
    const { 'dealerAuth.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://b2b-qas.azurewebsites.net/api/v1/dealer/',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}