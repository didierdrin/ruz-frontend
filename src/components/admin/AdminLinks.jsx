import { NavLink } from 'react-router-dom';

const AdminLinks = () => {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-md mb-2 text-sm font-medium ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
    }`;

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Admin Links</h2>
      <NavLink to="/admin/userlist" className={linkClasses}>
        Manage Users
      </NavLink>
      <NavLink to="/admin/productlist" className={linkClasses}>
        Manage Products
      </NavLink>
      <NavLink to="/admin/orderlist" className={linkClasses}>
        Manage Orders
      </NavLink>
    </div>
  );
};

export default AdminLinks;
