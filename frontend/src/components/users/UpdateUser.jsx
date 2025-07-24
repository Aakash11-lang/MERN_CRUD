import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Form as BootstrapForm,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import * as Yup from "yup";
import ToastAlert from "../../helpers/ToastAlert";
import { ApiRequest } from "../../utils/ApiRequest";
import { useToast } from "../../context/ToastProvider";

const UpdateUser = () => {
  const { showCustomToast } = useToast();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  const getUserDet = async () => {
    try {
      const params = {
        url: `/get-user/${userId}`,
        method: "GET",
      };
      const response = await ApiRequest(params);
      if (response.status) {
        setInitialValues(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  useEffect(() => {
    getUserDet();
  }, [userId]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.object().shape({
      city: Yup.string().required("City is required"),
    }),
    company: Yup.object().shape({
      name: Yup.string().required("Company name is required"),
    }),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const params = {
        url: `/update-user/${userId}`,
        method: "PUT",
        payload: values,
      };
      const response = await ApiRequest(params);
      if (response.status) {
        resetForm();
        showCustomToast(response.message, "success");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.log({ error });
      showCustomToast(error.errors[0].message, "danger");
    }
  };

  if (!initialValues) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <>
      <h3>Update User</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {() => (
          <Form>
            <FieldGroup label="Name" name="name" />
            <FieldGroup label="Username" name="username" />
            <FieldGroup label="Email" name="email" type="email" />
            <FieldGroup label="Phone" name="phone" />
            <FieldGroup label="Website" name="website" />

            <h5 className="mt-4">Address</h5>
            <FieldGroup label="Street" name="address.street" />
            <FieldGroup label="Suite" name="address.suite" />
            <FieldGroup label="City" name="address.city" />
            <FieldGroup label="Zipcode" name="address.zipcode" />
            <Row>
              <Col>
                <FieldGroup label="Latitude" name="address.geo.lat" />
              </Col>
              <Col>
                <FieldGroup label="Longitude" name="address.geo.lng" />
              </Col>
            </Row>

            <h5 className="mt-4">Company</h5>
            <FieldGroup label="Company Name" name="company.name" />
            <FieldGroup label="Catch Phrase" name="company.catchPhrase" />
            <FieldGroup label="BS" name="company.bs" />

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const FieldGroup = ({ label, name, type = "text" }) => (
  <BootstrapForm.Group className="mb-3">
    <BootstrapForm.Label>{label}</BootstrapForm.Label>
    <Field name={name} type={type} className="form-control" />
    <ErrorMessage name={name} component="div" className="text-danger" />
  </BootstrapForm.Group>
);
export default UpdateUser;
