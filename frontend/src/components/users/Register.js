import React, { useEffect, Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { userRegister, clearErrors } from "../../redux/users/userAction";
import { useNavigate } from "react-router-dom";
import /* A component that is used to set the title of the page. */
MetaData from "../layout/MetaData";

const Register = () => {
  const [newUser, setNeWUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = newUser;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticatedUser, error, loading } = useSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticatedUser, alert, navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    await dispatch(userRegister(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
       reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      }; 
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNeWUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title= {`Please create your account`} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={(e) => registerHandler(e)}
          >
            <h1 className="mb-3">Register</h1>
            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="profile"
                      name="avatar"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={(e) => onChange(e)}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={ loading ? true : false }
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Register;
