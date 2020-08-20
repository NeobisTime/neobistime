import React from "react";
import Spinner from "../components/shared/spinner/spinner";
import Navbar from "../components/shared/navbar";
import AdminNavbar from "../components/pages/admin/admin-navbar";

const withNavbarContainer = (Component: any, type?: string) => {
  const withNavbar = (props: any) => {
    return (
      <>
        {type === "admin" ? (
          <div className="wrapper">
            <AdminNavbar />
            <div className="content__wrapper">
              <Spinner />
              <Component />
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <Navbar />
            <div className="content__wrapper">
              <Spinner />
              <Component />
            </div>
          </div>
        )}
      </>
    );
  };
  return withNavbar;
};

export default withNavbarContainer;
