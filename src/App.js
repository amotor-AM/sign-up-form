import React, { useState } from "react";
import "./App.css";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "./Form";

const formSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  location: yup.string().required(),
});

function App() {
  const [user, addUser] = useState([]);
  console.log(user);

  return (
    <div className="App">
      <div className="left">
        <h1>Left</h1>
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
          {({ handleSubmit }) => {
            return (
              <div className="formBackground">
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
                  <Form
                    name="location"
                    placeholder="Choose Your Location"
                    label="Location: "
                  />
                  <button type="submit" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
      <div className="right">
        <h1>Right</h1>
      </div>
    </div>
  );
}

export default App;
