import SignupForm from "components/form/SignupForm";
import Brand from "components/header/Brand";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="auth-form flex flex-col gap-4 md:gap-6 items-center">
          <Brand />
          <h2 className="text-3xl font-bold text-slate-50">
            Create New Student Account
          </h2>
          <SignupForm />
          <div className="text-center">
            Already have an account?{" "}
            <Link to="/signin" className="link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
