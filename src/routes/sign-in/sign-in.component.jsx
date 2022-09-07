// import { async } from "@firebase/util";
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.jsx";

import {
  // auth,
  signInWithGooglePopUp,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from "../../util/firebase/firebase.util";
// import { async } from "@firebase/util";

const SignIn = () => {
  // when sign-in component mounts for the 1st time this runs.
  //when there's an empty array, it means run the component once, the callback

  const logGoogleUser = async () => {
    // user is passed in to createUserCodumentFromAuth in order to get data and set.
    // & uses uid to authenticate and set data
    const { user } = await signInWithGooglePopUp();

    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // Another way of authenticating for sign in but not as important, but using signInWithGoogleRedirect directly
  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>

      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
