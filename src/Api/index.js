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

export function signUp(username, email, password) {
  const test = {
    user: {
      username: 'JohnDO11133',
      email: 'pipisyn2ka2@yan33dex.ru',
      password: 'qweras2df332',
    },
  };

  const res = axios({
    method: 'post',
    url: 'https://blog.kata.academy/api/users',
    data: JSON.stringify(test),
    headers: { 'content-type': 'application/json' },
  }).then(() => null);
  console.log(res);
  return res;
}
