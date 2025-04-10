// import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import SellerLinks from '../../components/admin/SellerLinks';
// import { useGetSellerProductsQuery } from '../../features/product/productApiSlice';
// import { useGetSellerOrdersQuery } from '../../features/order/orderApiSlice';
// import Meta from '../../components/common/Meta';

// const SellerScreen = () => {
//   const { data: products, isLoading: loadingProducts } =
//     useGetSellerProductsQuery();
//   const { data: orders, isLoading: loadingOrders } = useGetSellerOrdersQuery();

//   return (
//     <>
//       <Meta title="Seller Dashboard" />
//       <Row className="m-3">
//         <Col md={2}>
//           <SellerLinks />
//         </Col>
//         <Col md={10}>
//           <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
//           <Row>
//             <Col className="mb-4" xl={6} md={6}>
//               <div className="p-4 bg-white rounded-lg shadow">
//                 <h2 className="text-xl font-semibold mb-2">Products</h2>
//                 {loadingProducts ? (
//                   <div className="text-center">Loading...</div>
//                 ) : (
//                   <div className="flex justify-between items-center">
//                     <span className="text-3xl font-bold">{products?.length}</span>
//                     <Link
//                       to="/seller/productlist"
//                       className="text-indigo-600 hover:underline"
//                     >
//                       View Products
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </Col>
//             <Col className="mb-4" xl={6} md={6}>
//               <div className="p-4 bg-white rounded-lg shadow">
//                 <h2 className="text-xl font-semibold mb-2">Orders</h2>
//                 {loadingOrders ? (
//                   <div className="text-center">Loading...</div>
//                 ) : (
//                   <div className="flex justify-between items-center">
//                     <span className="text-3xl font-bold">{orders?.length}</span>
//                     <Link
//                       to="/seller/orderlist"
//                       className="text-indigo-600 hover:underline"
//                     >
//                       View Orders
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//       </>
// }
//   );