import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Card, CardBody, Button, Label, Input } from "reactstrap";
import {
  nameRegex,
  phoneNumberRegex,
  emailRegex,
  matchesRegex,
} from "../configs/RegexUtils";
import "./registerFrom.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingMain from "../LoaderMain";

const RegisterForm = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    const isCustomerName = matchesRegex(values.customerName, nameRegex);
    const isEmailRegex = matchesRegex(
      values.email.replace(/\s+/g, ""),
      emailRegex
    );
    const isPhoneNumberRegex = matchesRegex(
      values.mobileNumber.replace(/\s+/g, ""),
      phoneNumberRegex
    );

    //customerName
    if (!values.customerName) {
      errors.customerName = "Full name is required";
    } else if (values.customerName.length <= 2) {
      errors.customerName = "Please enter proper full name";
    } else if (values.customerName.length > 150) {
      errors.customerName = "Please enter valid name";
    } else if (!isCustomerName) {
      errors.customerName =
        "Full name should only contain alphabetic characters";
    }

    //email
    if (!values.email) {
      errors.email = "Email Id is required";
    } else if (!isEmailRegex) {
      errors.email = "Invalid email address";
    }

    //mobile
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!isPhoneNumberRegex) {
      errors.mobileNumber = "Invalid mobile number";
    }

    if (!values.genderType) {
      errors.genderType = "Gender is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }
    return errors;
  };

  const initialValues = {
    userfullname: "",
    email: "",
    mobileNumber: "",
    genderType: "",
    address: "",
  };

  const initialErrors = {
    userfullname: "",
    email: "",
    mobileNumber: "",
    genderType: "",
    address: "",
  };

  const handleReset = () => {
    formik.resetForm({
      values: initialValues,
      errors: initialErrors,
    });
  };

  const registrationApiCall = (data) => {
    setLoadingStatus(true);
    const requestBody = {
      userfullname: data.customerName,
      emailAddress: data.email,
      phoneNumber: data.mobileNumber,
      gender: data.genderType,
      address: data.address,
    };
    axios
      .post(
        "https://registrationwebformbackend.onrender.com/api/v1/register",
        requestBody
      )
      .then((response) => {
        if (response.data.code === "0x200") {
          setLoadingStatus(false);
          navigate("/confirmation", { state: { data: response.data } });
          handleReset();
        }
      })
      .catch((error) => {
        setLoadingStatus(false);
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      const errors = validate(values);
      formik.setErrors(errors);
      console.log(values);
      if (Object.keys(errors).length === 0) {
        registrationApiCall(values);
      } else {
        formik.setErrors(errors);
      }
    },
  });

  const handleInputChange = (field, value) => {
    formik.setFieldError(field, "");
    formik.handleChange(field)(value);
  };

  return (
    <>
      <div className="form-container">
        <>
          <Card>
            <div>
              <p
                style={{
                  fontSize: "x-large",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Registration Form
              </p>
            </div>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {/* Full Name */}
                  <div>
                    <Label className="form-label" for="customerName">
                      Full Name
                    </Label>
                    <span className="asterisk1">*</span>
                    <Input
                      autoFocus
                      id="customerName"
                      name="customerName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.customerName}
                    />
                    {formik.errors.customerName ? (
                      <div className="divError">
                        {formik.errors.customerName}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Label className="form-label" for="email">
                      Contact Email
                    </Label>
                    <span className="asterisk1">*</span>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      value={formik.values.email.replace(/\s+/g, "")}
                    />
                    {formik.errors.email ? (
                      <div className="divError">{formik.errors.email}</div>
                    ) : null}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <Label className="form-label" for="mobileNumber ">
                      Mobile Number
                    </Label>{" "}
                    <span className="asterisk1">*</span>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      onChange={(e) =>
                        handleInputChange("mobileNumber", e.target.value)
                      }
                      value={formik.values.mobileNumber}
                    />
                    {formik.errors.mobileNumber ? (
                      <div className="divError">
                        {formik.errors.mobileNumber}
                      </div>
                    ) : null}
                  </div>

                  {/* Gender */}
                  <div>
                    <Label className="form-label" for="genderType">
                      Gender
                    </Label>{" "}
                    <span className="asterisk1">*</span>
                    <Input
                      id="genderType"
                      name="genderType"
                      type="select"
                      onChange={(e) =>
                        handleInputChange("genderType", e.target.value)
                      }
                      value={formik.values.genderType}
                    >
                      <option value="" hidden>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Input>
                    {formik.errors.genderType ? (
                      <div className="divError">{formik.errors.genderType}</div>
                    ) : null}
                  </div>

                  <div>
                    <Label className="form-label" for="address">
                      Address
                    </Label>{" "}
                    <span className="asterisk1">*</span>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address.replace(/\s+/g, " ")}
                    />
                    {formik.errors.address ? (
                      <div className="divError">{formik.errors.address}</div>
                    ) : null}
                  </div>

                  <div className="button-container">
                    <Button className="me-1" type="submit">
                      Submit
                    </Button>

                    <Button
                      type="reset"
                      onClick={handleReset}
                      style={{ backgroundColor: "#dc3545" }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
          {loadingStatus && <LoadingMain showLoading={loadingStatus} />}
        </>
      </div>
    </>
  );
};

export default RegisterForm;
