import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./views/pages/Signup/Signup";
import Login from "./views/pages/login/Login";
import About from "./views/pages/AboutUs/About";
import Home from "./views/pages/Home/Home";
import Contact from "./views/pages/ContactUs/Contact";
import MainLayout from "./views/components/Layout/MainLayout";
import Cart from "./views/pages/CartPage/Cart";

import CommodityDetails from "./views/pages/CommodityDetailsPage/CommodityDetails";
import CommodityList from "./views/pages/Commodity/CommodityList";
import OrderPage from "./views/pages/OrderPage/OrderPage";
import Profile from "./views/pages/Profile/Profile";
import ProtectedLayout from "./views/components/Layout/ProtectedLayout";
import AuthLayout from "./views/components/Layout/AuthLayout";
import useAuth from "./hooks/useAuth";
import Loader from "./views/components/Loader";
import OrderDetails from "./views/pages/OrderDetails/OrderDetails";

// import { Container } from "@mui/material";

function App() {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout user={user} />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/commodities/list" element={<CommodityList />} />
          <Route exact path="/commodities/list/:id" element={<CommodityDetails />} />
        </Route>

        <Route path="/my" element={<ProtectedLayout user={user} />}>
          <Route exact path="/my/orders" element={<OrderPage />} />
          <Route exact path="/my/orders/:id" element={<OrderDetails />} />
          <Route exact path="/my/profile" element={<Profile />} />
          <Route exact path="/my/cart" element={<Cart />} />
        </Route>

        <Route path="/auth" element={<AuthLayout user={user} />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
