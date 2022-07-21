import React, { useState } from "react";
import Logo from "../../images/logo.png";
// import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  PreviewCard,
  Icon,
} from "../../components/Component";
import { FormGroup, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useResetPassword from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const [passState, setPassState] = useState(false);
  const { isLoading, resetPassword } = useResetPassword();
  //   const [errorVal, setError] = useState("");
  const email = localStorage.getItem("emailforpasswordchange")
    ? JSON.parse(localStorage.getItem("emailforpasswordchange"))
    : "";

  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get("token");

  const onSubmitPassword = (formData) => {
    const { new_password, confirm_password } = formData;
    console.log(new_password, "password");
    console.log(email, "email");
    console.log(token, "token");
    // check passwordlength
    if (new_password.length < 8) {
      toast.warn("Password must be at least 8 characters");
      return;
    }
    // check that passwords match
    if (new_password !== confirm_password) {
      toast.warning("Passwords do not match. Please recheck input fields");
      return;
    }

    if (new_password && token) {
      resetPassword(email, token, new_password);
    } else {
      toast.error("Unable to process your request");
    }
  };
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Reset-Password" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={"/"} className="logo-link">
              <img className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo" />
              {/* <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h5">Reset password</BlockTitle>
                <BlockDes>
                  <p>Input your new password</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form onSubmit={handleSubmit(onSubmitPassword)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password1">
                    New Password
                  </label>
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
                    id="password1"
                    name="new_password"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your new password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.new_password && <span className="invalid">{errors.new_password.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password1">
                    Confirm Password
                  </label>
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
                    id="password2"
                    name="confirm_password"
                    ref={register({ required: "This field is required" })}
                    placeholder="Confirm your new password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.confirm_password && <span className="invalid">{errors.confirm_password.message}</span>}
                </div>
              </FormGroup>

              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" type="submit">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Change Password"}
                </Button>
              </FormGroup>
            </form>
            {/* <div className="form-note-s2 text-center pt-4">
              <Link to={`/auth-login`}>
                <strong>Return to login</strong>
              </Link>
            </div> */}
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ResetPassword;
