import { useSelector } from 'react-redux';

export function useStore() {
  const { email, token, username, image, loginError } = useSelector(
    (state) => state.user
  );
  const { loading, error, modalWindow } = useSelector((state) => state.loading);
  const { article } = useSelector((state) => state.article);
  const { posts } = useSelector((state) => state.posts);

  return {
    isAuth: !!username,
    email,
    image,
    token,
    article,
    posts,
    loginError,
    username,
    loading,
    error,
    modalWindow,
  };
}
