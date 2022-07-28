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
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, productsCount, totalProductPerPage, error } =
    useSelector((state) => state.products);
  const { keyword } = useParams();
  const [price, setPrice] = useState([1, 1000000000]);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage, keyword,price));
  }, [dispatch, alert, error, currentPage, keyword,price]);

  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Fragment>
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
                          1000000: `$1000000`,
                        }}
                        min={1}
                        max={1000000}
                        defaultValue={[1, 1000000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)} 
                      />
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
          {totalProductPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={totalProductPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNumber}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
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
