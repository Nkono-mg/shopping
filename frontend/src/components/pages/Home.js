import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products/productAction";
import { isEmpty } from "../../utils/utils";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, products, productsCount, totalProductPerPage, error } =
    useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts(dispatch));
  }, [dispatch]);
  return (
    <Fragment>
      <h1 id="products_heading">Latest products ({productsCount})</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {!isEmpty(products) && 
            products.map((product) => {
              return (
                <div
                  className="col-sm-12 col-md-6 col-lg-3 my-3"
                  key={product._id}
                >
                  <div className="card p-3 rounded">
                    <img
                      className="card-img-top mx-auto"
                      src="" 
                      alt={product.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        <a href="">{product.name}</a>
                      </h5>
                      <div className="ratings mt-auto">
                        <div className="rating-outer">
                          <div className="rating-inner"></div>
                        </div>
                        <span id="no_of_reviews">
                          {product.numOfReviws} Reviews
                        </span>
                      </div>
                      <p className="card-text">£ {product.price}</p>
                      <a href="#" id="view_btn" className="btn btn-block">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </Fragment>
  );
}
