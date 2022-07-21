import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  // BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useSignIn from "../../hooks/useSignIn";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const { isLoading, error, signIn } = useSignIn();

  const onFormSubmit = (formData) => {
    // console.log(formData, "before reqBody");
    // setLoading(true);
    if (!formData.email && !formData.password) return toast.error("Please fill in all fields");
    const { email, password } = formData;

    if (email && password) {
      signIn(email, password);
    } else {
      toast.error("Please fill in all fields");
    }
    // setLoading(false);
    // let reqBody = {
    //   email: formData.email,
    //   password: formData.password
    // }

    // console.log(reqBody,"reqBody")
    // const loginName = "info@softnio.com";
    // const pass = "123456";
    // if (formData.name === loginName && formData.passcode === pass) {
    //   localStorage.setItem("accessToken", "token");
    //   setTimeout(() => {
    //     window.history.pushState(
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
    //       "auth-login",
    //       `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
    //     );
    //     window.location.reload();
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     setError("Cannot login with credentials");
    //     setLoading(false);
    //   }, 2000);
    // }
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={"/dashboard"} className="logo-link">
              <img className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo" />
              {/* <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                {/* <BlockDes>
                  <p>Access Dashlite using your email and passcode.</p>
                </BlockDes> */}
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> Unable to login with credentials
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="email"
                    id="default-01"
                    name="email"
                    ref={register({ required: "This field is required" })}
                    // defaultValue="info@softnio.com"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.email && <span className="invalid">{errors.email.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`/forgot-password`}>
                    Forgot Password?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    // defaultValue="123456"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>
            {/* <div className="form-note-s2 text-center pt-4">
             
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
            </div> */}
            {/* <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-4">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul> */}
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
