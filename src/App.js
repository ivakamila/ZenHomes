import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Signup from "./components/Signup/Signup";
import UploadNewProduct from "./pages/UploadNewProduct/UploadNewProduct";
import Shop from "./pages/Shop/Shop";
import ProductPage from "./pages/ProductPage/ProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginForm from "./components/Login/LoginForm";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ContactForm from "./components/ContactForm/ContactForm";
import AboutPage from "./pages/AboutPage/AboutPage";
import Footer from "./components/Footer/Footer";

export const FilteredContext = createContext();

function App() {
  const [filteredData, setFilteredData] = useState();

  return (
    <FilteredContext.Provider value={[filteredData, setFilteredData]}>
      <Router className="App">
        <Navbar />
        <Routes>
          <Route exact path="/zenHomes" element={<Homepage />} />
          <Route exact path="/sign-in" element={<LoginForm />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route
            exact
            path="/upload-new-product"
            element={<UploadNewProduct />}
          />
          <Route exact path="/shop" element={<Shop />} />
          <Route path="/product/:productName" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </FilteredContext.Provider>
  );
}

export default App;
