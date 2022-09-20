import React, { useState } from "react";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../util/firebase/firebase.util.js";
import FormInput from "../form-input/form-input.component.jsx";
import "./sign-in-form.styles.scss";
import Button from "../button/button.components";

// initialized object value for the form
const defaultFormFields = {
  email: "",
  password: ""
};

const signInWithGoogle = async () => {
  // user is passed in to createUserCodumentFromAuth in order to get data and set.
  // & uses uid to authenticate and set data
  const { user } = await signInWithGooglePopUp();
  // eslint-disable-next-line
  await createUserDocumentFromAuth(user);
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      console.log(response);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("User Not Found");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit} className="group">
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          className="form-input"
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          className="form-input"
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
