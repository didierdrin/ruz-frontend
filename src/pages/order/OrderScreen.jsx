import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation } from '../../features/order/orderSlice';
import { useGetPayPalClientIdQuery } from '../../features/paypal/paypalSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;

// import { useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import { toast } from 'react-toastify';
// import Message from '../../components/common/Message';
// import Loader from '../../components/common/Loader';
// //import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../../features/order/orderApiSlice';

// const OrderScreen = () => {
//   const { id: orderId } = useParams();
//   const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
//   const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
//   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
//   const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

//   useEffect(() => {
//     if (!errorPayPal && !loadingPayPal && paypal.clientId) {
//       const loadPayPalScript = async () => {
//         paypalDispatch({
//           type: 'resetOptions',
//           value: {
//             'client-id': paypal.clientId,
//             currency: 'USD',
//           },
//         });
//         paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
//       };
//       if (order && !order.isPaid) {
//         if (!window.paypal) {
//           loadPayPalScript();
//         }
//       }
//     }
//   }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

//   function onApprove(data, actions) {
//     return actions.order.capture().then(async function (details) {
//       try {
//         await payOrder({ orderId, details });
//         refetch();
//         toast.success('Payment successful');
//       } catch (err) {
//         toast.error(err?.data?.message || err.message);
//       }
//     });
//   }

//   function onError(err) {
//     toast.error(err.message);
//   }

//   function createOrder(data, actions) {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             amount: {
//               value: order.totalPrice,
//             },
//           },
//         ],
//       })
//       .then((orderId) => {
//         return orderId;
//       });
//   }

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>{' '}
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong> {order.shippingAddress.address},{' '}
//                 {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant="success">
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant="danger">Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant="danger">Not Paid</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loader />}
//                   {isPending ? (
//                     <Loader />
//                   ) : (
//                     <div>
//                       <PayPalButtons
//                         createOrder={createOrder}
//                         onApprove={onApprove}
//                         onError={onError}
//                       ></PayPalButtons>
//                     </div>
//                   )}
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default OrderScreen;