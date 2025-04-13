// src/components/ProductList.jsx
import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import Product from './Product';

const ProductList = ({ products = [], loading, error, isAdmin = false }) => {
  if (loading) {
    return (
      <Spinner
        animation="border"
        role="status"
        className="mx-auto d-block my-4"
      />
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error?.data?.message || error.message || 'An error occurred'}
      </Alert>
    );
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} isAdmin={isAdmin} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;


// // src/components/ProductList.jsx
// import React from 'react';
// import { Row, Col, Spinner, Alert } from 'react-bootstrap';
// import { useGetProductsQuery } from '../../features/product/productSlice';
// import Product from './Product';

// const ProductList = ({ keyword = '', pageNumber = 1, isAdmin = false }) => {
//   const {
//     data,
//     isLoading,
//     error,
//   } = useGetProductsQuery({ keyword, pageNumber });

//   if (isLoading) return <Spinner animation="border" role="status" className="mx-auto d-block my-4" />;

//   if (error) return <Alert variant="danger">{error?.data?.message || error.message}</Alert>;

//   return (
//     <Row>
//       {data.products.map((product) => (
//         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//           <Product product={product} isAdmin={isAdmin} />
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default ProductList;



