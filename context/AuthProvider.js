import { createContext, useContext, useEffect, useState } from "react";
import { PageLoading } from "../components/PageLoading";
import { useGetUser } from "../query/authQuery";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    data: getUser,
    isLoading: getUserLoading,
    isError: getUserError,
    isSuccess: getUserSuccess,
  } = useGetUser();

  useEffect(() => {
    // Only run logic when not loading
    if (!getUserLoading) {
      if (getUserSuccess && getUser?.userData) {
        setUser(getUser.userData);
        setIsAuth(true);
      } else {
        setUser({});
        setIsAuth(false);
      }
      setLoading(false);
    }
  }, [getUser, getUserLoading, getUserSuccess]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
