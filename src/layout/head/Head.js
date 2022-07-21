import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ ...props }) => {
  return (
    <Helmet>
      <title>{props.title ? props.title + " | " : null} Payvice Agent Reporting Dashboard</title>
    </Helmet>
  );
};
export default Head;
