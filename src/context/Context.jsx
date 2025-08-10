import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  // cardViews store
  const [isCardView, setIsCardView] = useState(() => {
    return localStorage.getItem("isCardView") || "card";
  });

  useEffect(() => {
    localStorage.setItem("isCardView", isCardView);
  }, [isCardView]);

  const toggleCardView = () => {
    setIsCardView((prev) => (prev === "card" ? "table" : "card"));
  };

  // theme store
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // user store
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Invalid JSON in localStorage for 'user'", e);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.error("Error saving user to localStorage", e);
    }
  }, [user]);

  // Google auth
  const googleProvider = new GoogleAuthProvider();

  const googleLoginUser = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const googleUser = {
        fullName: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
        _id: res.user.uid,
        role: "user",
      };
      return googleUser;
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  // const googleLoginDonor = async () => {
  //   try {
  //     const res = await signInWithPopup(auth, googleProvider);
  //     const googleUser = {
  //       fullName: res.user.displayName,
  //       photoURL: res.user.photoURL,
  //       email: res.user.email,
  //       _id: res.user.uid,
  //       role: "donor",
  //     };
  //     setUser(googleUser);
  //   } catch (err) {
  //     console.error("Google login failed", err);
  //   }
  // };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // provider data
  const data = {
    toggleCardView,
    isCardView,
    toggleTheme,
    theme,
    user,
    setUser,
    googleLoginUser,
    logoutUser,
  };

  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};

export default MyProvider;
