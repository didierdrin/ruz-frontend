import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import SearchBox from '../products/SearchBox';
// import Dropdown from './Dropdown';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { cartItems } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Marketplace
          </Link>

          <div className="hidden md:block flex-1 mx-8">
            <SearchBox />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>

            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FaShoppingCart className="text-gray-600 dark:text-gray-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <Dropdown
                trigger={
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                      {userInfo.avatar ? (
                        <img
                          src={userInfo.avatar.url}
                          alt={userInfo.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-indigo-600" />
                      )}
                    </div>
                    <span className="hidden md:inline text-gray-700 dark:text-gray-300">
                      {userInfo.name}
                    </span>
                  </div>
                }
              >
                <div className="py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  {userInfo.role === 'seller' && (
                    <Link
                      to="/seller"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Seller Dashboard
                    </Link>
                  )}
                  {userInfo.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/chat"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Messages
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <FaUser />
                <span className="hidden md:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <SearchBox />
        </div>
      </div>
    </header>
  );
};

export default Header;