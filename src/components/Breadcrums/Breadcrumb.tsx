import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link style={{ textDecoration: "none" }} to="/">
        Home /
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const decodedValue = decodeURIComponent(value);

        return (
          <span key={index}>
            &nbsp;
            <Link style={{ textDecoration: "none" }} to={to}>
              {decodedValue.charAt(0).toUpperCase() + decodedValue.slice(1)}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
