import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from '../common/Rating';

const Product = ({ product, isAdmin }) => {
  return (
    <Card className="my-3 p-3 rounded hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.images[0]?.url}
          variant="top"
          className="h-48 object-cover"
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="no-underline">
          <Card.Title as="div" className="text-lg font-semibold">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="my-2">
          <Rating
            value={product.ratings}
            text={`${product.numOfReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3" className="text-xl font-bold">
          ${product.price}
        </Card.Text>

        {isAdmin && (
          <div className="flex justify-between mt-3">
            <Link to={`/admin/product/${product._id}/edit`}>
              <Button variant="light" className="btn-sm">
                <i className="fas fa-edit"></i> Edit
              </Button>
            </Link>
            <Button variant="danger" className="btn-sm">
              <i className="fas fa-trash"></i> Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;