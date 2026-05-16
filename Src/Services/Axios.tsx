import axios from 'axios';
import { BASEURL } from './ServiceConstants';

const instance = axios.create({
  baseURL: BASEURL,
  headers: { 'Content-Type': 'multipart/form-data' },
});

const jsonInstance = axios.create({
  baseURL: BASEURL,
  headers: { 'Content-Type': 'application/json' },
});

export { instance, jsonInstance };
