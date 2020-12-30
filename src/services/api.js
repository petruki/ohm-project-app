import handleResponse from "./handler";

const API_URL = 'https://ohm-project-api.herokuapp.com/api';
// const API_URL = 'http://localhost:3000/api';
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

export function find(query, by, pagination) {
  const { perPage, page } = pagination;
  return fetch(`${API_URL}/project/find?${by}=${query}&perpage=${perPage}&page=${page}`, requestOptions('GET'))
    .then(handleResponse);
}

export function findById(id) {
  return fetch(`${API_URL}/project/${id}`, requestOptions('GET'))
    .then(handleResponse);
}

export function sync(id, cookie) {
  return fetch(`${API_URL}/project/sync/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cookie })
  }).then(handleResponse);
}