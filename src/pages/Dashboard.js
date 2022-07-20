import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";

const Dashboard = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Blank Page" />
      <Content>
        <p>Dashboard</p>
      </Content>
    </React.Fragment>
  );
};

export default Dashboard;