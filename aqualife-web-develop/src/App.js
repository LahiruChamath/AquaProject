import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProductsTable from "./components/organisms/Admin/AdminProductsTable";
import AdminSellerReviews from "./components/organisms/Admin/AdminSellerReviews";
import AdminSellersTable from "./components/organisms/Admin/AdminSellersTable";
import AdminOrdersTable from "./components/organisms/Admin/AdminOrdersTable";
import SellerAddProduct from "./components/organisms/Seller/SellerAddProduct";
import SellerEditProduct from "./components/organisms/Seller/SellerEditProduct";
import SellerProductsTable from "./components/organisms/Seller/SellerProductsTable";
import AdminDashboard from "./components/pages/AdminDashboard";
import Login from "./components/pages/Login";
import Products from "./components/pages/Products";
import Register from "./components/pages/Register";
import SellerDashboard from "./components/pages/SellerDashboard";
import SingleProduct from "./components/pages/SingleProduct";
import Checkout from "./components/pages/Checkout";
import { 
  ADMIN_PRODUCTS_PATH, 
  ADMIN_SELLERS_PATH, 
  ADMIN_ORDERS_PATH,
  ADMIN_SELLERS_REVIEWS_PATH,
  LOGIN_PATH,
  PRODUCTS_PATH,
  REGISTER_PATH,
  SELLER_PRODUCTS_ADD_PATH,
  SELLER_PRODUCTS_EDIT_PATH,
  SELLER_PRODUCTS_PATH,
  SPECIFIC_PRODUCTS_PATH,
  CHECKOUT_PATH
} from "./components/constants";
import "./styles/login.css";
import "./styles/products.css";
import CartNotification from "./components/organisms/CartNotification";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <CartNotification />
        <Routes>
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path={REGISTER_PATH} element={<Register />} />
          <Route path={PRODUCTS_PATH} element={<Products />} />
          <Route path={SPECIFIC_PRODUCTS_PATH} element={<SingleProduct />} />
          <Route path={CHECKOUT_PATH} element={<Checkout />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              index
              path={ADMIN_SELLERS_PATH}
              element={<AdminSellersTable />}
            />
            <Route
              path={`${ADMIN_SELLERS_REVIEWS_PATH}:id`}
              element={<AdminSellerReviews />}
            />
            <Route
              path={ADMIN_PRODUCTS_PATH}
              element={<AdminProductsTable />}
            />
            <Route
              path={ADMIN_ORDERS_PATH}
              element={<AdminOrdersTable />}
            />
          </Route>
          <Route
            path="/seller"
            element={
              <ProtectedRoute user={user}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path={SELLER_PRODUCTS_PATH}
              element={<SellerProductsTable />}
            />
            <Route
              path={`${SELLER_PRODUCTS_EDIT_PATH}:productId`}
              element={<SellerEditProduct />}
            />
            <Route
              path={SELLER_PRODUCTS_ADD_PATH}
              element={<SellerAddProduct />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
