import Button from "components/ui/Button";
import Message from "components/ui/Message";
import { useSigninMutation } from "features/auth/authAPI";
import { useGetUsersQuery } from "features/users/usersAPI";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "./FormControl";

const initialcreadentials = {
  email: "",
  password: "",
};

const AdminSigninForm = () => {
  const [creadentials, setCreadentials] = useState(initialcreadentials);
  const [message, setMessage] = useState("");

  const [signin, { data, isError, error }] = useSigninMutation();
  const { data: adminUserData } = useGetUsersQuery("?role=admin");

  const navigate = useNavigate();

  const { email, password } = creadentials || {};
  const [adminUser] = adminUserData || [];

  // handle input change
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setMessage("");

    setCreadentials((prevState) => ({ ...prevState, [name]: value }));
  };

  // handle student login form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (adminUser?.email === email) {
      signin({ email, password });
    } else {
      setCreadentials((prevState) => ({ ...prevState, password: "" }));
      setMessage("Could not find admin! Please check your email address!");
    }
  };

  // side effects
  useEffect(() => {
    if (isError && error?.data) {
      setMessage(error.data);
      setCreadentials((prevState) => ({ ...prevState, password: "" }));
    }

    if (data?.accessToken && data?.user) {
      setCreadentials(initialcreadentials);
      navigate("/admin/dashboard");
    }
  }, [data, isError, error, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-y-4 sm:gap-y-6 w-96 max-w-full"
    >
      <div className="form-group">
        <FormControl
          name="email"
          className={message !== "" && "focus:!ring-red-500"}
          required
          placeholder="Email address"
          onChange={handleChange}
        />
        <FormControl
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
      </div>
      {message !== "" && (
        <Message className="bg-red-200 text-red-500">{message}</Message>
      )}
      <div className="text-end">
        <Link to="#" className="link">
          Forgot Password?
        </Link>
      </div>
      <Button
        type="submit"
        className="bg-violet-600 text-white transition-colors duration-300 hover:bg-violet-700 rounded-lg"
      >
        Sign in
      </Button>
    </form>
  );
};

export default AdminSigninForm;
