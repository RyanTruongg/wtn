import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "configs/firebase";
import UserService from "services/user.service";

const authContext = createContext();

export function ProvideAuth(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

/**
 *
 * @returns {{
 *   user: null | {displayName: string, role: string, user_id: string},
 *   authState: "pending" | "success" | "failed",
 *   signin: Function,
 *   signInWithPopup: Function,
 *   signup: Function,
 *   signout: Function,
 *   sendPasswordResetEmail: Function,
 *   confirmPasswordReset: Function
 * }} authContext
 */
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState("pending");

  const signin = async (email, password) => {
    setAuthState("pending");
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return response.user;
    } catch (e) {
      setAuthState("failed");
    }
  };

  const signInWithPopup = () => {
    setAuthState("pending");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result.additionalUserInfo.isNewUser) {
          await UserService._createOne(result.user.uid);

          alert("ok");
        }
      })
      .catch(() => {
        setAuthState("failed");
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setAuthState("failed");
        setUser(null);
      });
  };
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };
  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            setUser(idTokenResult.claims);
            console.log(idTokenResult.claims);
            setAuthState("success");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setAuthState("failed");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    authState,
    signin,
    signInWithPopup,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
