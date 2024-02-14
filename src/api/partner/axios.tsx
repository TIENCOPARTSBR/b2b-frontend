import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiPartner = (ctx: any) => {
    const { 'partnerAuth.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://b2b-qas.azurewebsites.net/api/v1/partner',
        //baseURL: 'http://127.0.0.1:9000/api/v1/partner',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}