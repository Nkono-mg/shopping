import React, { useEffect, Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
} from "../../redux/products/productAction";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { addItemToCart } from "../../redux/cart/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const alert = useAlert();
  const { id } = useParams();
  let [qty, setQty] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, alert, error, id]);

  const addToCart = () => {
    dispatch(addItemToCart(id, qty));
    alert.success("Item added to cart");
  };

  return (
    <Fragment>
      <MetaData title={`The Best Product Quality on Line`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="row d-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause="hover">
              {product.images &&
                product.images.map((image) => (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={product.title}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product #{product._id}</p>
            <hr />
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100} %` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            <hr />
            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span
                className="btn btn-danger minus"
                onClick={() => setQty(qty - 1)}
              >
                -
              </span>
              <input
                type="number"
                className="form-control count d-inline"
                value={qty > 0 && qty <= product.stock ? qty : 1}
                readOnly
              />
              <span
                className="btn btn-primary plus"
                onClick={() => setQty(qty + 1)}
              >
                +
              </span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              disabled={product.stock === 0}
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <hr />
            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? `greenColor` : `redColor`}
              >
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : `Out of Stock: ${product.stock}`}
              </span>
            </p>
            <hr />
            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>
            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
            >
              Submit Your Review
            </button>
            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Submit Review
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>
                        <button
                          className="btn my-3 float-right review-btn px-4 text-white"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
