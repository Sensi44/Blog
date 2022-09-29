import axios from 'axios';

const baseURL = 'https://blog.kata.academy/api/';
const token =
  // eslint-disable-next-line max-len
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzU3M2NlM2NmNzA1MWIwMDgyYTkyZSIsInVzZXJuYW1lIjoienp6eHh4MTIzIiwiZXhwIjoxNjY5NjMzMjk5LCJpYXQiOjE2NjQ0NDkyOTl9.EUVr1JPAY_ODH1SUSuw17hEysb1LMD87r8tSF7UowyA';

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
  const res = axios
    .post('https://blog.kata.academy/api/users/', {
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
    .post('https://blog.kata.academy/api/users/login/', {
      user: {
        email,
        password,
      },
    })
    .then((resp) => resp.data);
  return res;
}

export function editProfile(username, email, password, image) {
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
    .put('https://blog.kata.academy/api/user', data, config)
    .then((resp) => resp.data);
  return res;
}
