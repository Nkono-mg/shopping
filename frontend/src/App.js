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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
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
            <Route path="/" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
