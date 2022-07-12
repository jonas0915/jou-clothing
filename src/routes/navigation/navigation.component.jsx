import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <React.Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>
            <CrwnLogo className="Logo" />
          </div>
        </Link>
        <div className="nav-links-container">
          {/* to property = tells the link where it should go. */}
          {/* Link component is almost similar to an anchor tag. */}
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/Sign-in">
            SIGN IN
          </Link>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Navigation;
