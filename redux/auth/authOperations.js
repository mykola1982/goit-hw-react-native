import { authFirebase } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { authSlice } from "../auth/authReducer";

export const authSingUpUser =
  ({ email, login, password }) =>
  async (dispatch, getState) => {
    console.log("email, password, login", email, password, login);
    try {
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const user = response.user;

      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispath, getState) => {
    console.log("email,  password ", email, password);
    try {
      const response = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const user = response.user;
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSingOutUser = () => async (dispath, getState) => {};
