import React from "react";
import { Formik } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(1, "Must have a charcter")
//     .max(255, "Must be shorteer than 255 characters")
//     .required("Must enter a name"),
//   email: Yup.string()
//     .min("Must be a valid email address")
//     .max(255, "Must be shorteer than 255 characters")
//     .required("Must enter an email")
// });

const FormikForm = () => {
  return (
    <div>
      <h2>Formik Form</h2>
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <br />
            <input
              style={{ padding: "5px" }}
              name="name"
              placeholder="Enter your name"
              id="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <br />
            <br />
            <label>Email:</label>
            <br />
            <input
              style={{ padding: "5px" }}
              name="email"
              placeholder="Enter your email"
              id="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <br />
            <br />
            <button
              style={{ padding: "5px" }}
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
