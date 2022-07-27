import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth
} from "../../util/firebase/firebase.util";

const SignIn = () => {
  const logGoogleUser = async () => {
    // user is passed in to createUserCodumentFromAuth in order to get data and set.
    // & uses uid to authenticate and set data
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </div>
  );
};

export default SignIn;
