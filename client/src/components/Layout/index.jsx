import { Outlet, useLocation } from "react-router-dom";

import Footer from "@components/Footer";
import Header from "@components/Header";

const Layout = () => {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/login" || pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
