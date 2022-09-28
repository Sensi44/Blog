import { useSelector } from 'react-redux';

export function useAuth() {
  const { email, token, id } = useSelector((state) => state.user);
  const { loading, error, modalWindow } = useSelector((state) => state.loading);

  return {
    isAuth: !!email,
    email,
    token,
    id,
    loading,
    error,
    modalWindow,
  };
}
