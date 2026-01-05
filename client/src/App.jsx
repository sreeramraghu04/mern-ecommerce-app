/* import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pagenotfound from "./pages/Pagenotfound";
import Layout from "./components/Layout";
import UserDetails from "./pages/UserDetails";
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./components/router/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<DashBoard />} />
          </Route>

          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Pagenotfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
 */

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
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminRoute from "./components/router/AdminRoute";
import Spinner from "./components/Spinner";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
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

          <Route
            path="/admin/create-collection"
            element={<CreateCollection />}
          />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/update-product" element={<UpdateProduct />} />

          <Route path="/admin/products" element={<Products />} />
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
