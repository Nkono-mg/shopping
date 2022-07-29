import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import ProductDetails from "./components/products/productDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/users/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} axact/>
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} /> 
            <Route path="/user/login" element={<Login />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
