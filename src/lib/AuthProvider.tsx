import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({ session: null, loading: true });

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
