// import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from './Product';
import Loader from '../common/Loader';
import Message from '../common/Message';
import Paginate from '../common/Paginate';
import ProductCarousel from './ProductCarousel';

const ProductList = ({
  products,
  loading,
  error,
  page,
  pages,
  keyword = '',
  isAdmin = false,
}) => {
  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1 className="text-2xl font-bold mb-4">
        {isAdmin ? 'All Products' : 'Latest Products'}
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} isAdmin={isAdmin} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default ProductList;