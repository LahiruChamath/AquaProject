import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import {
  ADMIN_PRODUCTS_PATH,
  ADMIN_SELLERS_PATH,
  ADMIN_SELLERS_REVIEWS_PATH,
  LOGIN_PATH,
  PRODUCTS_PATH,
  REGISTER_PATH,
  SELLER_PRODUCTS_ADD_PATH,
  SELLER_PRODUCTS_EDIT_PATH,
  SELLER_PRODUCTS_PATH,
  SPECIFIC_PRODUCTS_PATH,
} from "./components/constants";
import AdminProductsTable from "./components/organisms/Admin/AdminProductsTable";
import AdminSellerReviews from "./components/organisms/Admin/AdminSellerReviews";
import AdminSellersTable from "./components/organisms/Admin/AdminSellersTable";
import SellerAddProduct from "./components/organisms/Seller/SellerAddProduct";
import SellerEditProduct from "./components/organisms/Seller/SellerEditProduct";
import SellerProductsTable from "./components/organisms/Seller/SellerProductsTable";
import AdminDashboard from "./components/pages/AdminDashboard";
import Login from "./components/pages/Login";
import Products from "./components/pages/Products";
import Register from "./components/pages/Register";
import SellerDashboard from "./components/pages/SellerDashboard";
import SingleProduct from "./components/pages/SingleProduct";
import "./styles/login.css";
import "./styles/products.css";

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path={REGISTER_PATH} element={<Register />} />
          <Route path={PRODUCTS_PATH} element={<Products />} />
          <Route path={SPECIFIC_PRODUCTS_PATH} element={<SingleProduct />} />
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
              path={ADMIN_SELLERS_REVIEWS_PATH}
              element={<AdminSellerReviews />}
            />
            <Route
              path={ADMIN_PRODUCTS_PATH}
              element={<AdminProductsTable />}
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
