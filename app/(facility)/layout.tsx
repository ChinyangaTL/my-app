import { FacilityAuthProvider } from '../context/AuthContext/context';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=''>
      <FacilityAuthProvider>{children}</FacilityAuthProvider>
    </div>
  );
};

export default Layout;
