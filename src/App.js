import React, { useState } from "react";
import "./App.css";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "./Form";
import Location from "./Location";

const formSchema = yup.object().shape({
  name: yup.string().required("Name Required"),
  email: yup.string().email("Email Must Be Valid").required("Email Required"),
  password: yup
    .string()
    .required("Choose A Password")
    .min(6, "At Least 6 Characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords Must Match"),
  location: yup.string().required("Enter Your Location"),
});

function App() {
  const [user, addUser] = useState([]);
  console.log(user);

  return (
    <div className="App">
      <div className="left">
        <h1>
          Empowering East Africa's women-led SMEs to trade legally, safely and
          profitably across borders.
        </h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            location: "",
          }}
          validationSchema={formSchema}
          onSubmit={(data) => {
            addUser([...user, data]);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => {
            return (
              <div className="formBackground">
                <h2>Sign Up To Get Started</h2>
                <form onSubmit={handleSubmit}>
                  <Form name="name" placeholder="Name" label="Name: " />
                  <Form name="email" placeholder="Email" label="Email: " />
                  <Form
                    name="password"
                    placeholder="Password"
                    label="Password: "
                  />
                  <Form
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    label="Confirm Password: "
                  />
                  <select
                    name="location"
                    className="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                  >
                    <option value="" label="Choose Location" />
                    {Location.map((location) => (
                      <option value={location.name} label={location.name} />
                    ))}
                  </select>
                  {errors.location && touched.location && (
                    <p className="locationError">{errors.location}</p>
                  )}
                  <button
                    className="submit-button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default App;
