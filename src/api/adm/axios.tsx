import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiAdmin = (ctx: any) => {
    const { 'adminAuth.token': token } = parseCookies(ctx);

    const api = axios.create({
        //baseURL: 'http://127.0.0.1:8000/api/v1/admin',
        baseURL: 'https://b2b-qas.azurewebsites.net/api/v1/admin',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}