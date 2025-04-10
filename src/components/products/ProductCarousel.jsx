// import { useGetTopProductsQuery } from '../../features/product/productApiSlice';
import { Carousel, Image } from 'react-bootstrap';
import Message from '../common/Message';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-gray-800 mb-8 rounded-lg">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div className="flex justify-center">
              <Image src={product.images[0]?.url} alt={product.name} fluid />
            </div>
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;