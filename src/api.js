import axios from 'axios'
axios.defaults.withCredentials = true;
const baseUrl = 'http://47.98.159.163:9991/webctl/'

export const deployEleboxList = param => { return axios.post(`${baseUrl}/deployElebox/deployEleboxList`,param)}
export const getProject = () => { return axios.post(`${baseUrl}/api/project/listproject`,{})}
export const listroading = param => { return axios.post(`${baseUrl}api/deploy/listroading`,param)}
export const deleteRoad = param => {return axios.post(`${baseUrl}api/deploy/deletedeployroading`,param,{
    headers:{
       "Content-Type": "multipart/form-data" 
    }
})}
export const showLighting = param => {return axios.post(`${baseUrl}api/deploy/showdeploylighting`,param)}
export const addRoading = param => {return axios.post(`${baseUrl}api/deploy/addorupdateroading`,param)}
export const selectElebox = param => {return axios.post(`${baseUrl}api/deploy/selectdeployelebox`,param)}

