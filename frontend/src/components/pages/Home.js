import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products/productAction";
import { isEmpty } from "../../utils/utils";
import Loader from "../layout/Loader";
import Product from "../products/product";
import { useAlert } from "react-alert";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, productsCount, totalProductPerPage, error } =
    useSelector((state) => state.products);
  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProducts());
    
  }, [dispatch, alert, error]);
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
        </Fragment>
      )}
    </Fragment>
  );
}
