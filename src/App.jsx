import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
// import Enquiry from './pages/Enquiry'
// import AdminLogin from './pages/admin/AdminLogin'
// import AdminDashboard from './pages/admin/Dashboard'
import { CartProvider } from "./context/CartContext"
import OrderSuccess from './pages/OrderSuccess'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Programs from './pages/Programs'
import ScrollToTop from './components/ScrollToTop'

import Login from './pages/Login'
import RequireSuperAdmin from "./auth/RequireSuperAdmin";
import RequireAdmin from "./auth/RequireAdmin";

import SuperAdminLayout from './components/SuperAdminLayout';
import AdminLayout from './components/AdminLayout';

// import CreateAdmin from "./pages/superAdmin/CreateAdmin";
// import Products from "./pages/superAdmin/productsCrud";
// import productsCrud from './pages/superAdmin/productsCrud'
import ProductsCrud from './pages/superAdmin/productsCrud';
import Admins from './pages/superAdmin/Admins';
import MyOrders from "./pages/admin/MyOrders";

import SuperAdminDashboard from './pages/superAdmin/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';

import AdminReturns from './pages/admin/AdminReturns'


function App() {
  return (

    
       <CartProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/customer" element={<CustomerDashboard/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/programs" element={<Programs />} />
        

         <Route path="/login" element={<Login />} />

          {/* SUPER ADMIN */}
      {/* <Route
        path="/super-admin"
        element={
          <RequireSuperAdmin>
            <SuperAdminLayout />
          </RequireSuperAdmin>
        }
      >
     
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/admins" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/products" element={<ProductsCrud />} />

      </Route> */}

      <Route
  path="/super-admin"
  element={
    <RequireSuperAdmin>
      <SuperAdminLayout />
   </RequireSuperAdmin>
  }
>
  <Route index element={<SuperAdminDashboard />} />
  <Route path="admins" element={<SuperAdminDashboard />} />
  <Route path="products" element={<ProductsCrud />} />
  <Route path="admin" element={<Admins />} />
  
</Route>


      {/* ADMIN */}
      {/* <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
         <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<MyOrders />} />
      </Route> */}
      <Route
  path="/admin"
  element={
    <RequireAdmin>
      <AdminLayout />
    </RequireAdmin>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="orders" element={<MyOrders />} />
  <Route path="returns" element={<AdminReturns />} />

</Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>

    
  )
}

export default App