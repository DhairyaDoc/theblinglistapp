import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./components/Checkout/Checkout";
import GiftCard from "./components/GiftCard/GiftCard";
import Cart from "./components/Cart/Cart";
import ReviewPage from "./components/Review/ReviewPage";
import PreviousOrder from "./components/Orders/PreviousOrder";
import OrderDetails from "./components/Orders/OrderDetails";
import MapDemo from "./components/Map/MapDemo";
import Jewels from "./components/Admin/Jewels/Jewels";
import ViewBlog from "./components/Blog/ViewBlog";
import LogIn from "../src/components/Auth/Login/LogIn";
import ForgotPwd from "../src/components/Auth/ForgotPassword/ForgotPwd";
import ResetPassword from "../src/components/Auth/ForgotPassword/ResetPassword";
import Profile from "./components/UserProfile/Profile";
import SignUpForm from "./components/Auth/SignUpForm/SignUpForm";
import Recommendation from "./components/Home/Recommendation";
import ViewProduct from "./components/Products/ViewProduct";
import Favourites from "./components/Favourites/Favourites";
import Product from "./components/Products/Product";
import AddBlog from "./components/Blog/AddBlog";
import MyBlogs from "./components/Blog/MyBlogs";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="100%">
        <Navbar />
        <Routes>
          <Route path="/" element={<LogIn />} />
        </Routes>
        <Routes>
          <Route path="/forgotPwd" element={<ForgotPwd />} />
        </Routes>
        <Routes>
          <Route path="/resetPwd" element={<ResetPassword />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<Jewels />} />
        </Routes>
        <Routes>
          <Route path="/recommendation" element={<Recommendation />} />
        </Routes>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Routes>
          <Route path="/giftcard" element={<GiftCard />} />
        </Routes>
        <Routes>
          <Route path="/previousorders" element={<PreviousOrder />} />
        </Routes>
        <Routes>
          <Route path="/orderDetails/:id" element={<OrderDetails />} />
        </Routes>
        <Routes>
          <Route path="/map" element={<MapDemo />} />
        </Routes>
        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Routes>
          <Route path="/reviews" element={<ReviewPage />} />
        </Routes>
        <Routes>
          <Route path="/blogs" element={<ViewBlog />} />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route path="/viewdetails" element={<ViewProduct />} />
          {/* <Route path="/viewdetails/:id" element={<ViewProduct />} /> */}
        </Routes>
        <Routes>
          <Route path="/favorites" element={<Favourites />} />
        </Routes>
        <Routes>
          <Route path="/products" element={<Product />} />
        </Routes>
        <Routes>
          <Route path="/addBlog" element={<AddBlog />} />
        </Routes>
        <Routes>
          <Route path="/myBlog" element={<MyBlogs />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
