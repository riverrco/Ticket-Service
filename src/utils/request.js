import axios from 'axios';
import config from '../config'


const {AUTH_SERVICE_URL} = config;

const instance = axios.create({
  baseURL: AUTH_SERVICE_URL
})

const request = (path, body) => {
  return instance.post(path, body)
    .then(i => i.data)
    .catch(err => err);
};


export {
  request
}