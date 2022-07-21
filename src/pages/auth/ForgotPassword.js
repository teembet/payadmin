import React from "react";
import Logo from "../../images/logo.png";
// import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import { FormGroup, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useForgotPassword from "../../hooks/useForgotPassword";
import { toast } from "react-toastify";
import { isValidEmail } from "../../utils/Utils";

const ForgotPassword = () => {
  const { isLoading, forgotPassword } = useForgotPassword();

  const handleEmailValidation = (email) => {
    // console.log("ValidateEmail was called with", email);

    const isValid = isValidEmail(email);

    // const validityChanged =
    //   (errors.email && isValid) || (!errors.email && !isValid);
    // if (validityChanged) {
    //   console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    // }

    return isValid;
  };
  const onSubmitEmail = (formData) => {
    const { email } = formData;
    // console.log(formData, "email");
    if (email) {
      forgotPassword(email);
    } else {
      toast.error("Please input your email");
    }
  };
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
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
                <BlockTitle tag="h5">Forgot password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form onSubmit={handleSubmit(onSubmitEmail)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="email"
                    id="default-01"
                    name="email"
                    ref={register({ required: "This field is required", validate: handleEmailValidation })}
                    placeholder="Enter your email address"
                    className="form-control-lg form-control"
                  />
                  {errors.email && <span className="invalid">{errors.email.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" type="submit">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Send Reset Link"}
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              <Link to={`/auth-login`}>
                <strong>Return to login</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ForgotPassword;
