import SignUpForm from "../../components/sign-up-form/sign-up-form.jsx";
import SignInForm from "../../components/sign-in-form.jsx/sign-in-form";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
