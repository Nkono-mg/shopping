import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products/productAction";
import { isEmpty } from "../../utils/utils";
import Loader from "../layout/Loader";
import Product from "../products/product";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import MetaData from "../layout/MetaData";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    products,
    productsCount,
    resPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();
  const [price, setPrice] = useState([1,10000]); 
  const [category, setCategory] = useState("");
  const categories = [
    "Electronics",
    "Cameras",
    "Laptop",
    "Food",
    "Books",
    "Drinks",
  ];
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage, keyword, price, category, ratings));
  }, [dispatch, alert, error, currentPage, keyword, price, category, ratings]);

  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      <MetaData title={`The Best Product Quality on Line`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment> 
          <h1 id="products_heading">Latest products ({productsCount})</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          10000: `$10000`,
                        }}
                        min={1}
                        max={10000}
                        defaultValue={[1,10000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRatings(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {!isEmpty(products) &&
                        products.map((product) => {
                          return (
                            <Product
                              key={product._id}
                              product={product}
                              col={4}
                            />
                          );
                        })}
                    </div>
                  </div>
                </Fragment>
              ) : (
                !isEmpty(products) &&
                products.map((product) => {
                  return (
                    <Product key={product._id} product={product} col={3} />
                  );
                })
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNumber}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
