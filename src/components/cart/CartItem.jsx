import { Link } from 'react-router-dom';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <Row className="align-items-center mb-3">
      <Col md={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col>
      <Col md={3}>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
      </Col>
      <Col md={2}>${item.price}</Col>
      <Col md={2}>
        <Form.Control
          as="select"
          value={item.qty}
          onChange={(e) => addToCart(item.product, Number(e.target.value))}
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col md={2}>
        <Button
          type="button"
          variant="light"
          onClick={() => removeFromCart(item.product)}
        >
          <i className="fas fa-trash"></i>
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;