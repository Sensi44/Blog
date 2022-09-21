import axios from 'axios';

const baseURL = 'https://blog.kata.academy/api/';

export function getArticles(offset, limit = 5) {
  const apiUrl = `${baseURL}articles?limit=${limit}&offset=${offset}`;
  const res = axios.get(apiUrl).then((resp) => resp.data);
  return res;
}

export function getPost(slug) {
  const apiUrl = `${baseURL}articles/${slug}`;
  const res = axios.get(apiUrl).then((resp) => resp.data);
  return res;
}
