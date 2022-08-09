import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  //const { user, loading } = useSelector((state) => state.loadUser);

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/shopLogo.jfif" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>
          {/* user */ !true ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span> */}
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link className="dropdown-item text-danger" to="/">
                  Logout
                </Link>
              </div>
            </div>
          ) : (
              /* !loading && (
              <Link to="/user/login" className="btn ml-4" id="login_btn">
                Login
              </Link> */
              <Link to="/user/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            
          )}
        </div>
      </nav>
    </Fragment>
  );
};
export default Header;
