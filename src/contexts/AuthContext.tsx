import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../../firebase/firebase'; // Certifique-se de importar corretamente

const AuthContext = createContext(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //@ts-ignore
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  return (
    //@ts-ignore
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
