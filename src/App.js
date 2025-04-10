import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import SellerRoute from './components/common/SellerRoute';
import HomeScreen from './pages/home/HomeScreen';
import ProductScreen from './pages/product/ProductScreen';
import CartScreen from './pages/cart/CartScreen';
import LoginScreen from './components/auth/Login';
import RegisterScreen from './components/auth/Register';
import ProfileScreen from './pages/profile/ProfileScreen';
import ShippingScreen from './pages/order/ShippingScreen';
import PaymentScreen from './pages/order/PaymentScreen';
import PlaceOrderScreen from './pages/order/PlaceOrderScreen';
import OrderScreen from './pages/order/OrderScreen';
import ProductCreateScreen from './pages/product/ProductCreateScreen';
import ProductEditScreen from './pages/product/ProductEditScreen';
import OrderListScreen from './components/admin/OrderList';
import ProductListScreen from './components/admin/ProductList';
import UserListScreen from './components/admin/UserList';
import AdminScreen from './pages/admin/AdminScreen';
import SellerScreen from './pages/admin/SellerScreen';
import ChatScreen from './pages/chat/ChatScreen';
import NotFound from './pages/404';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              {/* <Route path="/forgot-password" element={<ForgotPasswordScreen />} /> */}

              <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/chat" element={<ChatScreen />} />
              </Route>

              <Route path="" element={<SellerRoute />}>
                <Route path="/seller" element={<SellerScreen />} />
                <Route
                  path="/seller/product/create"
                  element={<ProductCreateScreen />}
                />
                <Route
                  path="/seller/product/:id/edit"
                  element={<ProductEditScreen />}
                />
              </Route>

              <Route path="" element={<AdminRoute />}>
                <Route path="/admin" element={<AdminScreen />} />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route
                  path="/admin/productlist"
                  element={<ProductListScreen />}
                />
                <Route
                  path="/admin/productlist/:pageNumber"
                  element={<ProductListScreen />}
                />
                <Route path="/admin/userlist" element={<UserListScreen />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;