import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const MyContext = createContext();

const MyProvider = ({ children }) => {

  // cardViews store
  const [isCardView, setIsCardView] = useState(()=>{
    return localStorage.getItem("isCardView") || "card"
  }); 
  useEffect(()=>{
    localStorage.setItem("isCardView" , isCardView) 
  }, [isCardView])
  const toggleCardView = ()=>{
    setIsCardView((prev)=> prev === "card" ? "table" : "card")
  }

    // theme store
  const [theme, setTheme] = useState(()=>{
    return localStorage.getItem("theme")  || "light"
  });
  useEffect(()=>{
     localStorage.setItem("theme" , theme)
     document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme])
  const toggleTheme = ()=>{
    setTheme((prev)=> prev=== "light"? "dark" : "light")
  }

   // user store
  const [user, setUser] = useState(()=>{
    return JSON.parse(localStorage.getItem("user")) || null
  })
  useEffect(()=>{
    localStorage.setItem("user" , JSON.stringify(user))
 }, [user])


   //  google auth
   const googleProvider = new GoogleAuthProvider();
      const googleLoginUser = async()=>{
        signInWithPopup(auth , googleProvider)
        .then((res)=>{
          // console.log()
         const googleUser = {
            fullName : res.user.displayName ,
           photoURL : res.user.photoURL ,
           email : res.user.email ,
           _id : res.user.uid ,
           role: "user"
         }
         setUser(googleUser)

        })
      }
      const googleLoginDonor = async()=>{
        signInWithPopup(auth , googleProvider)
        .then((res)=>{
          // console.log()
         const googleUser = {
            fullName : res.user.displayName ,
           photoURL : res.user.photoURL ,
           email : res.user.email ,
           _id : res.user.uid ,
           role: "donor" 
         }
         setUser(googleUser)

        })
      }

      const logoutUser = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error("Logout Error:", error);
        }
      };

     
    // provider data
  const data = {
    toggleCardView,
    isCardView ,
    logoutUser,
    googleLoginDonor,
    googleLoginUser,
    toggleTheme,
    theme,
    user,
    setUser

  };

  return <MyContext.Provider value={data}>
    {children}
  </MyContext.Provider>;
};

export default MyProvider;
