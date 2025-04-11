// src/components/ProductList.jsx
import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useGetProductsQuery } from '../../features/product/productSlice';
import Product from './Product';

const ProductList = ({ keyword = '', pageNumber = 1, isAdmin = false }) => {
  const {
    data,
    isLoading,
    error,
  } = useGetProductsQuery({ keyword, pageNumber });

  if (isLoading) return <Spinner animation="border" role="status" className="mx-auto d-block my-4" />;

  if (error) return <Alert variant="danger">{error?.data?.message || error.message}</Alert>;

  return (
    <Row>
      {data.products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} isAdmin={isAdmin} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;




// // import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';
// import Product from './Product';
// import Loader from '../common/Loader';
// import Message from '../common/Message';
// import Paginate from '../common/Paginate';
// import ProductCarousel from './ProductCarousel';

// const ProductList = ({
//   products,
//   loading,
//   error,
//   page,
//   pages,
//   keyword = '',
//   isAdmin = false,
// }) => {
//   return (
//     <>
//       {!keyword && <ProductCarousel />}
//       <h1 className="text-2xl font-bold mb-4">
//         {isAdmin ? 'All Products' : 'Latest Products'}
//       </h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <>
//           <Row>
//             {products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} isAdmin={isAdmin} />
//               </Col>
//             ))}
//           </Row>
//           <Paginate
//             page={page}
//             pages={pages}
//             keyword={keyword ? keyword : ''}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default ProductList;