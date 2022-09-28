import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import ProductDetails from "./components/products/productDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { loadUser } from "./redux/users/userAction";
import store from "./redux/store";
import { useEffect } from "react";
import Profile from "./components/users/Profile";
import ProtectedRoute from "./components/routes/protectedRoute";
import UpdateProfile from "./components/users/UpdateProfile";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import { useSelector } from "react-redux";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import { useState } from "react";
import axios from "axios";
import Payment from "./components/cart/Payment";
//Payment import
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//Admin import
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/products/ProductList";
import NewProduct from "./components/admin/products/NewProduct";

 const App = () => {
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.authUser
  );
  const [stripeApi, setStripeApi] = useState("");
  const getStripeApiKey = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/shopping/stripeapi`
    );
    setStripeApi(data.stripeApiKey);
  };
  useEffect(() => {
    store.dispatch(loadUser());
    //getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} axact />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/edit/profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Routes>
          <Route
            path="/admin/dashboard"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
         <Route
            path="/admin/product/create"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <NewProduct />
              </ProtectedRoute>
            }
          /> 
        </Routes>
        {/* {!loading && user.role !=="admin" && (
          <Footer />
        ) } */}
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
