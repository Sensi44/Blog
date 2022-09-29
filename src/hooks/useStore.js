import { useSelector } from 'react-redux';

export function useStore() {
  const { email, token, username, loginError } = useSelector(
    (state) => state.user
  );
  const { loading, error, modalWindow } = useSelector((state) => state.loading);

  return {
    isAuth: !!username,
    email,
    token,
    loginError,
    username,
    loading,
    error,
    modalWindow,
  };
}
