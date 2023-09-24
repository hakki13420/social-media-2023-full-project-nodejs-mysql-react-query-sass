import axios from 'axios'

export const privateRequest = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/',
  withCredentials: true
})

export const publicRequest = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/'
})
