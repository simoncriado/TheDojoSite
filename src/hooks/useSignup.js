import { useState, useEffect } from 'react';
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

// We export the signUp hook which will be used whenever we need to sign a new user up in our app
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  // The error is set to be null at the beggining and will be changed in case there is an error
  const [error, setError] = useState(null);
  // The same with isPending: it is false to begin with and will be changed to true if the page is loading for example
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // When users submit the signUp form in the Signup component this function will be fired
  const signup = async (email, password, displayName, thumbnail) => {
    // We set the error to null again just in case the user had an issue when signing in and he tries again. So that he can start from when there was no error
    setError(null);
    // We set isPending to be true
    setIsPending(true);

    // We try to signUp the user
    try {
      // This reaches out to firebase auth and tries to signUp that user with the provided email and password and it sends us back a response
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // If we dont get a response when throw a new error
      if (!res) {
        throw new Error('Could not complete signup');
      }

      // Upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      // Add display name and avatar to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // create an user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      // If the signUp fails we catch the error
    } catch (err) {
      if (!isCancelled) {
        // We set the error to whatever the error was so that we can then show it to the user (for Example invalid email)
        setError(err.message);
        // We set isPending again to false as the page ended loading
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  // We return the signup function, error state and isPending state to be used in other components if needed
  return { signup, error, isPending };
};
