import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://rocketnotes-dnp1.onrender.com'
})