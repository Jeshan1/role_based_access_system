import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type AuthType = {
  user: any;
  loading: boolean;
  error: string;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/user/myself", {
          // credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log(data);
        console.log(data);
        if (data.success) {
          setUser(data.user);
        }
        if (data.error) {
          setError("Please login to continue");
        }
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
