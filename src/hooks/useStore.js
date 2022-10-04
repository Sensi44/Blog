import { useSelector } from 'react-redux';

export function useStore() {
  const { email, token, username, image, loginError } = useSelector(
    (state) => state.user
  );
  const { loading, error, modalWindow } = useSelector((state) => state.loading);
  const { article } = useSelector((state) => state.article);

  return {
    isAuth: !!username,
    email,
    image,
    token,
    article,
    loginError,
    username,
    loading,
    error,
    modalWindow,
  };
}
