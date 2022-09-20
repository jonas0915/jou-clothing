// BACK FOR FIREBASE DATABASE

import { initializeApp } from "firebase/app";
// authentication coming from firebase
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  // docMethod- retrives method frm firestore database
  //   doc is what's needed to get the document instance
  doc,
  //   represents as getting/setting documents data. used to access the database
  getDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxg6OXi1bLg_4bpWZonDPqywoqkt2Lr20",
  authDomain: "jou-clothing-db.firebaseapp.com",
  projectId: "jou-clothing-db",
  storageBucket: "jou-clothing-db.appspot.com",
  messagingSenderId: "156240429987",
  appId: "1:156240429987:web:79b6f54024f795c4085016"
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);
// to able to use authentication from firebase
// googleAuthProvider is a class from firebaseAuthentication and connected to googleAuth
//
const googleProvider = new GoogleAuthProvider();
// takes configuration object. And tell googgleAuthProvider how to behave
// setCustomParameter is specific to google only

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);
//allows us to access the database. to get or set a document

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

//to use the database. create a method

//fcnt that takes data from auth service and stored in firestore
//1st. see if there's existing doc ref? a special objct in firestore when talking about actual instance of doc model.
//  doc takes 3 arguments. 1st=DB, 2nd=collection, 3rd=identifier(a unique ID or uid found in user objct)
//   can reach uid by tapping into userAuth obj and link uid

export const createUserDocumentFromAuth = async (
  userAuth,

  //overwrites the null value of display name
  additionalInformation = { displayName: "Jonas" }
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // snapshot is the data/specific object. using await so it's used asynchronously
  // getting the document frm userDocRef that was taken the DB that registers when logging in

  // checks if there's an existing instance in DB  and access data
  const userSnapshot = await getDoc(userDocRef);

  // console.log(userSnapshot);
  // .exists() to check if the document exists
  // console.log(userSnapshot.exists());

  // above - IF userSnapshot DATA DOES NOT EXIST. Create an object  w/name, email, & date.
  //       - try  - will set the document & recieves userDocRef & pass data that will be set with.
  //       - catch - an error and send error message
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // try catch block. try something asynchronus & do something with the data
    try {
      await setDoc(userDocRef, {
        // displayName set to Null
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // IF IT DOES EXIST, CODE ABOVE WILL NOT RUN & SKIP.
  return userDocRef;
  // return userDocRef
};

// authenticating users from firebase auth tab

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
