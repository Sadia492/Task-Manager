import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
export const authContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
      // if (currentUser?.email) {
      //   const { data } = await axios.post(
      //     `${import.meta.env.VITE_URL}/jwt`,
      //     { email: currentUser?.email },
      //     { withCredentials: true }
      //   );
      //   console.log(data);
      //   setLoading(false);
      // } else {
      //   const { data } = await axios.get(`${import.meta.env.VITE_URL}/logout`, {
      //     withCredentials: true,
      //   });
      //   console.log(data);
      //   setLoading(false);
      // }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signOutUser,
    signInWithGoogle,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
}
