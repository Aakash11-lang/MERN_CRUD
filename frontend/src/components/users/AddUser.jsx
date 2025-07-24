import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ApiRequest } from "../../utils/ApiRequest";
import { useToast } from "../../context/ToastProvider";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]+$/, "Invalid phone number")
    .required("Phone is required"),
  website: Yup.string().url("Invalid URL"),
  address: Yup.object({
    street: Yup.string(),
    suite: Yup.string(),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string(),
    geo: Yup.object({
      lat: Yup.string(),
      lng: Yup.string(),
    }),
  }),
  company: Yup.object({
    name: Yup.string().required("Company name is required"),
    catchPhrase: Yup.string(),
    bs: Yup.string(),
  }),
});

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

const AddUser = () => {
  const { showCustomToast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log({values})
      const params = {
        url: "/create-user",
        method: "POST",
        payload: values,
      };
      const response = await ApiRequest(params);
      if (response.status) {
        resetForm();
        showCustomToast(response.message, "success");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      showCustomToast(error.errors[0].message, "danger");
    }
  };

  return (
    <>
      <Container>
        <h2 className="my-4">Add New User</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Row>
              <Col md={6}>
                <label>Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col md={6}>
                <label>Username</label>
                <Field name="username" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <label>Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col md={6}>
                <label>Phone</label>
                <Field name="phone" className="form-control" />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <label>Website</label>
                <Field name="website" className="form-control" />
              </Col>
            </Row>

            <h5 className="mt-4">Address</h5>
            <Row>
              <Col md={3}>
                <label>Street</label>
                <Field name="address.street" className="form-control" />
              </Col>
              <Col md={3}>
                <label>Suite</label>
                <Field name="address.suite" className="form-control" />
              </Col>
              <Col md={3}>
                <label>City</label>
                <Field name="address.city" className="form-control" />
                <ErrorMessage
                  name="address.city"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col md={3}>
                <label>Zipcode</label>
                <Field name="address.zipcode" className="form-control" />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <label>Latitude</label>
                <Field name="address.geo.lat" className="form-control" />
              </Col>
              <Col md={6}>
                <label>Longitude</label>
                <Field name="address.geo.lng" className="form-control" />
              </Col>
            </Row>

            <h5 className="mt-4">Company</h5>
            <Row>
              <Col md={4}>
                <label>Company Name</label>
                <Field name="company.name" className="form-control" />
                <ErrorMessage
                  name="company.name"
                  component="div"
                  className="text-danger"
                />
              </Col>
              <Col md={4}>
                <label>Catch Phrase</label>
                <Field name="company.catchPhrase" className="form-control" />
              </Col>
              <Col md={4}>
                <label>BS</label>
                <Field name="company.bs" className="form-control" />
              </Col>
            </Row>

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default AddUser;
