import React, { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { SaveShippingInfo } from "../../redux/cart/cartAction";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import CheckoutStep from "./CheckoutStep";

const Shipping = () => {
  const shippingInfo = useSelector((state) => state.cartProduct.shippingInfo);
  const [address, setAdress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countrisesList = Object.values(countries);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SaveShippingInfo({ address, city, postalCode, phoneNo, country }));
    navigate(`/order/confirm`);
  };

  return (
    <Fragment>
      <CheckoutStep shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={(e) => submitHandler(e)}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                required
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              >
                {countrisesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Shipping;
