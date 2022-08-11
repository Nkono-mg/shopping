import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.authUser);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
              <Link
                to="/user/edit/profile"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.name}</p>
              <h4>Joined on</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>
              {user.role !== "admin" && (
                <Link
                  to="/orders/me/all"
                  className="btn btn-danger btn-block mt-5"
                >
                  My Orders
                </Link>
              )}

              <Link
                to="/user/edit/password"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Profile;
