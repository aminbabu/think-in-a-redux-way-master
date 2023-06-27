import AdminSigninForm from "components/form/AdminSigninForm";
import Brand from "components/header/Brand";

const SignIn = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="auth-form flex flex-col gap-4 md:gap-6 items-center">
          <Brand />
          <h2 className="text-3xl font-bold text-slate-50">Admin Account</h2>
          <AdminSigninForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
