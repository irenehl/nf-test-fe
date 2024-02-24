import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Sidebar />
      <Toaster />
      {children}
    </main>
  );
};

export default Layout;
