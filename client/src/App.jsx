import ErrorPage from "@components/Error";
import Layout from "@components/Layout";
import Login from "@components/LoginPage";
import PrivateRoute from "@components/PrivateRoute";
import Register from "@components/Register";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./index.css";

import { providerRoutes } from "@providerComponent/ProviderRoutes";
import { customerRoutes } from "@userComponent/customerRoutes";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.role;

  const roleRoutes =
    role === "provider"
      ? providerRoutes
      : role === "customer"
      ? customerRoutes
      : [];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            {roleRoutes.length > 0 ? (
              roleRoutes.map((route, index) => (
                <Route key={route.path || index} {...route} />
              ))
            ) : (
              <Route index element={<Navigate to="/login" replace />} />
            )}
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
