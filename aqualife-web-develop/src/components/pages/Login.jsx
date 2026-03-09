import { Button, Chip, Spinner } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/user_service";
import {
  ADMIN_SELLERS_PATH,
  PRODUCTS_PATH,
  REGISTER_PATH,
  SELLER_PRODUCTS_PATH,
  USER_ROLES,
} from "../constants";

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const login = (obj) => {
    setLoginError("");
    loginUser(obj)
      .then((res) => {
        if (res && res.data.result === true) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("role", res.data.role);

          setTimeout(() => {
            if (res.data.role === USER_ROLES.ADMIN) {
              navigate(ADMIN_SELLERS_PATH);
            } else if (res.data.role === USER_ROLES.SELLER) {
              navigate(SELLER_PRODUCTS_PATH);
            } else if (res.data.role === USER_ROLES.CUSTOMER) {
              navigate(PRODUCTS_PATH);
            }
            setIsloading(false);
          }, 1500);
        } else {
          setLoginError(res?.data?.message || "Login failed. Please try again.");
          setIsloading(false);
        }
      })
      .catch(() => {
        setLoginError("Network error. Please check your connection.");
        setIsloading(false);
      });
  };

  return (
    <div className="login h-screen w-screen bg-center bg-cover bg-no-repeat flex justify-center items-center">
      <div className="container w-4/12">
        <div className="bg-opacity-30 backdrop-blur-md bg-white p-7 rounded-2xl shadow-xl">
          <div className="text-2xl font-bold text-white">Sign in</div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^\S+@\S+\.\S+$/.test(values.email) // Basic email format check
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Password is required";
              }

              return errors;
            }}
            onSubmit={(values) => {
              // Simulate a login action
              setIsloading(true);
              login(values);

              // Replace this with your actual login logic
              // Here you can make an API call or perform client-side validation
              // to check if the provided email and password are correct.
            }}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-white"
                  >
                    Email address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`${
                      touched.email && errors.email ? "border-red-500" : ""
                    } bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    placeholder="john.doe@company.com"
                    required
                  />
                  {touched.email && errors.email && (
                    <div className="mt-2">
                      <Chip color="red" value={errors.email} />
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-white"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`${
                      touched.password && errors.password
                        ? "border-red-500"
                        : ""
                    } bg-white outline-none text-gray-900 text-sm rounded-lg focus:border-none focus:ring-blue-500 block w-full p-2.5 border border-gray-300`}
                    placeholder="*******"
                    required
                  />
                  {touched.password && errors.password && (
                    <div className="mt-2">
                      <Chip color="red" value={errors.password} />
                    </div>
                  )}
                </div>
                {loginError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500 bg-opacity-80 text-white text-sm text-center">
                    {loginError}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="p-3 w-full mt-5 flex justify-center"
                  color="blue"
                >
                  {isLoading ? <Spinner color="blue" /> : "Login"}
                </Button>
                <div className="text-white text-center mt-5">
                  Don't have an account?{" "}
                  <Link to={REGISTER_PATH} className="underline">
                    Sign up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
