import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../util/firebase/firebase.util";

import FormInput from "../form-input/form-input.component.jsx";
import "./sign-up-form.styles.scss";
import Button from "../button/button.components";

// initialized object value for the form
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  // object set as initial state
  const [formFields, setFormFields] = useState(defaultFormFields);

  // destructured values from defaulFormFields
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //used by fromField to auth user when form is submitter.
  // 1.confirm password matches = if statements checks this and if it's not equal, alert user and exit
  // 2.auth email & password =when required is matched, proceed to creat user
  // 3.create userDoc from createAuthUser
  // use email & password field and pass display name
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 1
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    // passing in the firebase/auth function and pass in email in password from default formField
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already exist!");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    // when an event happens in this name value that's equivalent to the object.It will be pickedup
    // event.target, recognized the event trigger and pass it thru the object
    const { name, value } = event.target;

    //updated the approriate field
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} className="group">
        {/* when the button is pressed this will be triggered */}

        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        {/* if input is empty, it's invalit & woudlnd't send */}

        {/* different way of taking values */}
        {/* 
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
            className: "form-input"
          }}
        /> */}

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          className="form-input"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
