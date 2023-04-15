import { authFirebase } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Toast from "react-native-root-toast";

import { authSlice } from "../auth/authReducer";

const { authSignOut, updateUserProfile, authStateChange } = authSlice.actions;

export const authSingUpUser =
  ({ email, login, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const user = response.user;

      await updateProfile(authFirebase.currentUser, {
        displayName: login,
        userId: user.uid,
        photoURL: avatar,
      });

      const { displayName, uid, photoURL } = await authFirebase.currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      Toast.show(`${error.message}`, {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const { displayName, uid, photoURL } = user.user;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      Toast.show(`${error.message}`, {
        backgroundColor: "red",
        duration: 3000,
        position: 50,
      });
    }
  };

export const deleteAvatar = () => async (dispatch, getState) => {
  try {
    console.log(authFirebase.currentUser);
    await updateProfile(authFirebase.currentUser, {
      displayName,
      userId: uid,
      photoURL: null,
    });

    const { displayName, uid, photoURL, email } =
      await authFirebase.currentUser;

    console.log("photo", photoURL);

    const userUpdateProfile = {
      userName: displayName,
      userId: uid,
      userAvatar: null,
      userEmail: email,
    };

    dispatch(updateUserProfile(userUpdateProfile));
  } catch (error) {
    Toast.show(`${error.message}`, {
      backgroundColor: "red",
      duration: 3000,
      position: 50,
    });
  }
};

export const logOut = () => async (dispatch, getState) => {
  try {
    await signOut(authFirebase);
    dispatch(authSignOut());
  } catch (error) {
    Toast.show(`${error.message}`, {
      backgroundColor: "red",
      duration: 3000,
      position: 50,
    });
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(authFirebase, (user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
        userAvatar: user.photoURL,
        userEmail: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
