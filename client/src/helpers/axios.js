import axios from 'axios';

const baseURL = '/api';
const getAxios = (timeout = 100000) => axios.create({ baseURL, timeout });

export default getAxios;
