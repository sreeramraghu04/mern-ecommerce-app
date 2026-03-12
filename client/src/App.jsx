import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pagenotfound from "./pages/Pagenotfound";
import Layout from "./components/Layout";
import UserDetails from "./pages/UserDetails";
import UserDashBoard from "./pages/user/UserDashBoard";
import PrivateRoute from "./components/router/PrivateRoute";
import CreateCollection from "./pages/admin/CreateCollection";
import CreateProduct from "./pages/admin/CreateProduct";
import Products from "./pages/admin/Product";
import UsersList from "./pages/admin/UsersList";
import ProfilePage from "./pages/user/ProfilePage";
import OrdersPage from "./pages/user/OrdersPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/router/AdminRoute";
import Spinner from "./components/Spinner";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import Collections from "./pages/admin/Collection";
import CollectionProducts from "./pages/CollectionProducts";
import CartPage from "./pages/user/CartPage";
import SearchForm from "./components/forms/SearchForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="search" element={<SearchPage />} />
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Spinner />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <UserDashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/searchproducts" element={<SearchForm />} />
          <Route
            path="/admin/create-collection"
            element={<CreateCollection />}
          />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route
            path="/admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/collections" element={<Collections />} />
          <Route path="/collection/:slug" element={<CollectionProducts />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/users-list" element={<UsersList />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/orders" element={<OrdersPage />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Pagenotfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
