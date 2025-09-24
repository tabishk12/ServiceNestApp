import { Outlet } from 'react-router-dom';

import Footer from '@components/Footer';
import Header from '@components/Header';

const Layout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-100'>
      <Header />
      <div className='flex-grow'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
