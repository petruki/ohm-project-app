import handleResponse from "./handler";

const API_URL = 'https://ohm-project-api.herokuapp.com/api';
const requestOptions = (method) => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' }
  }
};

export function checkAPI() {
  return fetch(`${API_URL}/check`, requestOptions('GET'))
    .then(handleResponse);
}

export function findAll({ perPage, page }) {
  return fetch(`${API_URL}/project?perpage=${perPage}&page=${page}`, requestOptions('GET'))
    .then(handleResponse);
}

export function find(query, pagination) {
  const { perPage, page } = pagination;
  return fetch(`${API_URL}/project/find?q=${query}&perpage=${perPage}&page=${page}`, requestOptions('GET'))
    .then(handleResponse);
}

export function findById(id) {
  return fetch(`${API_URL}/project/${id}`, requestOptions('GET'))
    .then(handleResponse);
}