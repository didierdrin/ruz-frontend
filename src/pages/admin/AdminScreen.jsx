import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import AdminLinks from '../../components/admin/AdminLinks';
//import { useGetOrdersQuery } from '../../features/order/orderApiSlice';
//import { useGetProductsQuery } from '../../features/product/productApiSlice';
//import { useGetUsersQuery } from '../../features/user/userApiSlice';
import Meta from '../../components/common/Meta';

const AdminScreen = () => {
  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: products, isLoading: loadingProducts } = useGetProductsQuery();
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();

  return (
    <>
      <Meta title="Admin Dashboard" />
      <Row className="m-3">
        <Col md={2}>
          <AdminLinks />
        </Col>
        <Col md={10}>
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <Row>
            <Col className="mb-4" xl={4} md={6}>
              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                {loadingUsers ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">{users?.length}</span>
                    <Link
                      to="/admin/userlist"
                      className="text-indigo-600 hover:underline"
                    >
                      View Users
                    </Link>
                  </div>
                )}
              </div>
            </Col>
            <Col className="mb-4" xl={4} md={6}>
              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                {loadingProducts ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">{products?.length}</span>
                    <Link
                      to="/admin/productlist"
                      className="text-indigo-600 hover:underline"
                    >
                      View Products
                    </Link>
                  </div>
                )}
              </div>
            </Col>
            <Col className="mb-4" xl={4} md={6}>
              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Orders</h2>
                {loadingOrders ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">{orders?.length}</span>
                    <Link
                      to="/admin/orderlist"
                      className="text-indigo-600 hover:underline"
                    >
                      View Orders
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AdminScreen;