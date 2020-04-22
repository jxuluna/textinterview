import axios from 'axios'
axios.defaults.withCredentials = true;
const baseUrl = 'http://47.98.159.163:9991/webctl/'

export const deployEleboxList = param => { return axios.post(`${baseUrl}/deployElebox/deployEleboxList`,param)}
export const getProject = () => { return axios.post(`${baseUrl}/api/project/listproject`,{})}
