import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import {
  getAdminProduct,
  clearErrors,
} from "../../../redux/products/productAction";
import Sidebar from "../Sidebar";

const ProductList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products); 

  useEffect(() => {
    dispatch(getAdminProduct());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    products.forEach((product) => {
        data.rows.push({
          id: product._id,
          name: product.name,
          price: `$${product.price}`,
          stock: product.stock,
          actions: (
            <Fragment>
              <Link
                to={`/admin/product/${product._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteProductHandler(product._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    return data;
  };
  const deleteProductHandler = (id) => {
    console.log("test test");
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-1"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
