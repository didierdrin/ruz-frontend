import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../common/FormContainer';
import Message from '../common/Message';
import Loader from '../common/Loader';
import { forgotPassword } from '../../features/auth/authSlice';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">
          An email has been sent with instructions to reset your password
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          disabled={loading}
        >
          Send Reset Link
        </Button>
      </Form>

      <div className="py-3 text-center">
        Remember your password?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </div>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;