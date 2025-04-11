import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   addToCart,
//   removeFromCart,
//   saveShippingAddress,
//   savePaymentMethod,
// } from '../features/cart/cartSlice';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const saveShippingAddressHandler = (data) => {
    dispatch(saveShippingAddress(data));
  };

  const savePaymentMethodHandler = (data) => {
    dispatch(savePaymentMethod(data));
  };

  const cartContextValue = {
    cartItems: cartItems || [],
    shippingAddress,
    paymentMethod,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    saveShippingAddress: saveShippingAddressHandler,
    savePaymentMethod: savePaymentMethodHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);