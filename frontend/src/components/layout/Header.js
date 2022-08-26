import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../redux/users/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.authUser);
  const cartItems = useSelector((state)=>state.cartProduct.cartItems);
  const navigate = useNavigate();
 
  const logoutHandler = (e)=>{
    e.preventDefault();
    dispatch(logoutUser());
    alert.success("Logged out successfully !");
    navigate("/")
  }
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
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                { user && user.role !== "admin" ? (
                  <Link className="dropdown-item" to="/order/me/all"> Orders</Link>
                ) : (<Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>)
                }
                <Link className="dropdown-item" to="/me">Profile</Link>
                <Link className="dropdown-item text-danger" to="#!" onClick={(e)=>logoutHandler(e)}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/user/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};
export default Header;
