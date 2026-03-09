import { Button, Chip, Spinner } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/user_service";
import { LOGIN_PATH } from "../constants";
import RegistrationSuccessModal from "../organisms/RegistrationSuccessModal";

const Register = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const registerUse = (obj) => {
    registerUser(obj)
      .then((res) => {
        setIsloading(false);
        setIsSuccessModal(true);
      })
      .catch(() => setIsloading(false));
  };

  return (
    <div className="login h-screen w-screen bg-center bg-cover bg-no-repeat flex justify-center items-center">
      <div className="container w-6/12">
        <div className="bg-opacity-20 backdrop-blur-md bg-white p-7 rounded-2xl shadow-xl">
          <div className="text-2xl font-bold text-white">Sign up</div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              city: "",
              birthdate: "",
              userType: "customer",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
              }
              return errors;
            }}
            onSubmit={(values) => {
              // Handle form submission
              setIsloading(true);
              registerUse(values);
            }}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form>
                <div className="my-10">
                  <div className="flex space-x-5 mb-5 w-full">
                    <div className="w-1/2">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        First name
                      </label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        Last name
                      </label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5 mb-5 w-full">
                    <div className="w-1/2">
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
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        Phone
                      </label>
                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        onKeyPress={(e) => {
                          // Allow only numeric key presses
                          if (e.key && !/^\d$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="0721234567"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5 mb-5 w-full">
                    <div className="w-1/2">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        City
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="Colombo"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="birthdate"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        Birthdate
                      </label>
                      <Field
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-5 mb-5 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="userType"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        User type
                      </label>
                      <Field
                        as="select"
                        id="userType"
                        name="userType"
                        className="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-none block w-full p-2.5 border border-gray-300"
                      >
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                      </Field>
                    </div>
                  </div>

                  <div className="flex space-x-5 mb-5 w-full">
                    <div className="w-1/2">
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
                    <div className="w-1/2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-md font-medium text-white"
                      >
                        Confirm password
                      </label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border-red-500"
                            : ""
                        } bg-white outline-none text-gray-900 text-sm rounded-lg focus:border-none focus:ring-blue-500 block w-full p-2.5 border border-gray-300`}
                        placeholder="*******"
                        required
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="mt-2">
                          <Chip color="red" value={errors.confirmPassword} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="p-3 w-full flex justify-center"
                  color="blue"
                >
                  {isLoading ? <Spinner color="blue" /> : "Register"}
                </Button>
                <div className="text-white text-center mt-5">
                  Already have an account?{" "}
                  <Link to={LOGIN_PATH} className="underline">
                    Sign in
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <RegistrationSuccessModal
        open={isSuccessModal}
        handleOpen={() => setIsSuccessModal(false)}
      />
    </div>
  );
};

export default Register;
