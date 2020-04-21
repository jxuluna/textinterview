import axios from 'axios'

const baseUrl = 'http://47.98.159.163:9991/webctl/'

export const deployEleboxList = param => { return axios.post(`${baseUrl}/deployElebox/deployEleboxList`,param)}