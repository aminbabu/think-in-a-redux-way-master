import SigninForm from "components/form/SigninForm";
import Brand from "components/header/Brand";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="auth-form flex flex-col gap-4 md:gap-6 items-center">
          <Brand />
          <h2 className="text-3xl font-bold text-slate-50">Student Account</h2>
          <SigninForm />
          <div className="text-center">
            New to LWS?{" "}
            <Link to="/signup" className="link">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
