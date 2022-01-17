import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Home from './Components/Home';
import Companies from './Components/Companies';
import Company from './Components/Company';
import NewCompany from './Components/NewCompany';
import Categories from './Components/Categories';
import NewCategory from './Components/NewCategory';
import Category from './Components/Category';
import Products from './Components/Products';
import Product from './Components/Product';
import NewProduct from './Components/NewProduct';
import Coupons from './Components/Coupons';
import Coupon from './Components/Coupon';
import NewCoupon from './Components/NewCoupon';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<Company />} />
        <Route path="/companies/newCompany" element={<NewCompany />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/newCategory" element={<NewCategory />} />
        <Route path="/categories/:categoryId" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/products/newProduct" element={<NewProduct />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/coupons/:couponId" element={<Coupon />} />
        <Route path="/coupons/newCoupon" element={<NewCoupon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
