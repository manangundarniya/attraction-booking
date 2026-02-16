import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AttractionList from "./pages/AttractionList";
import AttractionDetails from "./pages/AttractionDetails";
import ComboAttractions from "./pages/ComboAttractions";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

// Wrapper to scroll to top on route change
const ScrollToTopWrapper = ({ children }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return children;
};

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTopWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attractions" element={<AttractionList />} />
            <Route path="/combos" element={<ComboAttractions />} />
            <Route path="/attractions/:id" element={<AttractionDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:orderId" element={<Confirmation />} />
          </Routes>
        </ScrollToTopWrapper>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
