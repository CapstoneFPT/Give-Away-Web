import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const decodedValue = decodeURIComponent(value);

        return (
          <span key={index}>
            {/* prettier-ignore */} <img src={arrow_icon} alt="" />
            &nbsp; &nbsp; &nbsp;
            <Link to={to}>{decodedValue}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
