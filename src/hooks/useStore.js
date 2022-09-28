import { useSelector } from 'react-redux';

export function useStore() {
  const { email, token, username } = useSelector((state) => state.user);
  const { loading, error, modalWindow } = useSelector((state) => state.loading);

  return {
    isAuth: !!username,
    email,
    token,
    username,
    loading,
    error,
    modalWindow,
  };
}
