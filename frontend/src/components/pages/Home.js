import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products/productAction";
import { isEmpty } from "../../utils/utils";
import Loader from "../layout/Loader";
import Product from "../products/product";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, productsCount, totalProductPerPage, error } =
    useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

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
              {!isEmpty(products) &&
                products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
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
