import Button from "components/ui/Button";
import Message from "components/ui/Message";
import { useSignupMutation } from "features/auth/authAPI";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormCheck from "./FormCheck";
import FormControl from "./FormControl";

const initialCreadentials = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreed: false,
};

const SignupForm = () => {
  const [creadentials, setCreadentials] = useState(initialCreadentials);
  const [message, setMessage] = useState("");

  const [signup, { data, isLoading, isError, error }] = useSignupMutation();

  const navigate = useNavigate();

  const { name, email, password, confirmPassword, agreed } = creadentials || {};

  // handle input change
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setMessage("");

    setCreadentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      signup({
        name,
        email,
        password,
        role: "student",
      });
    } else {
      setCreadentials((prevState) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
      setMessage("Passwords do not match!");
    }
  };

  // side effects
  useEffect(() => {
    if (isError && error?.data) {
      setMessage(error.data);
      setCreadentials((prevState) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
    }

    if (data?.accessToken && data?.user) {
      setCreadentials(initialCreadentials);
      navigate("/course");
    }
  }, [data, isError, error, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-y-4 sm:gap-y-6 w-96 max-w-full"
    >
      <div className="form-group">
        <FormControl
          name="name"
          placeholder="Student name"
          required
          value={name}
          onChange={handleChange}
        />
        <FormControl
          name="email"
          placeholder="Email address"
          required
          value={email}
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
        <FormControl
          type="password"
          name="confirmPassword"
          placeholder="Conrim password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />
      </div>
      <FormCheck
        name="agreed"
        required
        checked={agreed}
        onChange={handleChange}
      >
        Agreed with the{" "}
        <Link to="#" className="link">
          terms and conditions
        </Link>
        .
      </FormCheck>
      {message !== "" && (
        <Message className="bg-red-200 text-red-500">{message}</Message>
      )}
      <Button
        type="submit"
        className="bg-violet-600 text-white transition-colors duration-300 hover:bg-violet-700 rounded-lg"
        disabled={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
