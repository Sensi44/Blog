import axios from 'axios';

const baseURL = 'https://blog.kata.academy/api/';

export function getArticles(offset, limit = 5, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const apiUrl = `${baseURL}articles?limit=${limit}&offset=${offset}`;
  const res = axios.get(apiUrl, config).then((resp) => resp.data);
  return res;
}

export function getPost(slug, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const apiUrl = `${baseURL}articles/${slug}`;
  const res = axios.get(apiUrl, config).then((resp) => resp.data);
  return res;
}

export function signUp(username, email, password) {
  const res = axios
    .post(`${baseURL}users/`, {
      user: {
        username,
        email,
        password,
      },
    })
    .then((resp) => resp.data);
  return res;
}

export function signIn(email, password) {
  const res = axios
    .post(`${baseURL}users/login/`, {
      user: {
        email,
        password,
      },
    })
    .then((resp) => resp.data);
  return res;
}

export function editProfile(token, username, email, password, image) {
  const data = {
    user: {
      username,
      email,
      password,
      image,
    },
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = axios
    .put(`${baseURL}user`, data, config)
    .then((resp) => resp.data);
  return res;
}

export function getCurrentUser(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = axios.get(`${baseURL}user/`, config).then((resp) => resp.data);
  return res;
}

export function createArticle(token, title, description, text, tagList) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    article: {
      title,
      description,
      body: text,
      tagList,
    },
  };
  const res = axios
    .post(`${baseURL}articles/`, data, config)
    .then((resp) => resp.data);
  return res;
}

export function deleteArticle(token, slug) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = axios
    .delete(`${baseURL}articles/${slug}`, config)
    .then((resp) => resp.data);
  return res;
}
