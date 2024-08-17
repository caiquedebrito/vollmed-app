import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/src/hooks/useStorageState';
import { api } from '../api/index';
import { AxiosError } from 'axios';
import { router } from 'expo-router';

type User = {
  login: string,
  password: string,
}

const AuthContext = createContext<{
  signIn: (user: User) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = (user: User) => {
    api.post('/login', { login: user.login, senha: user.password })
      .then((response) => {
        setSession(response.data.token);
        router.push('/(app)');
      })
      .catch((e: AxiosError) => {
        alert('Erro ao fazer login: ' + e.response?.data);
        setSession(null);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
