import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const SellerRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && (userInfo.role === 'seller' || userInfo.role === 'admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default SellerRoute;