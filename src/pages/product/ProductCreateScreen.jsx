import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/common/FormContainer';
import Message from '../../components/common/Message';
import Loader from '../../components/common/Loader';
import { createProduct } from '../../features/product/productSlice';
import { uploadFile } from '../../services/productService';

const ProductCreateScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error } = productCreate;

  const uploadFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadedImages = await Promise.all(
        files.map((file) => uploadFile(file))
      );
      setImages([...images, ...uploadedImages]);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        images,
        category,
        countInStock,
        description,
      })
    ).then(() => {
      navigate('/seller');
    });
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={uploadFileHandler}
            className="mb-2"
          />
          {uploading && <Loader />}
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Preview ${index}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="countInStock" className="mb-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-full mt-4">
          Create Product
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductCreateScreen;

// import { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import FormContainer from '../../components/common/FormContainer';
// import Message from '../../components/common/Message';
// import Loader from '../../components/common/Loader';
// //import { createProduct } from '../../features/product/productSlice';
// import { uploadFile } from '../../services/productService';

// const ProductCreateScreen = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState(0);
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const productCreate = useSelector((state) => state.productCreate);
//   const { loading, error } = productCreate;

//   const uploadFileHandler = async (e) => {
//     const files = Array.from(e.target.files);
//     setUploading(true);

//     try {
//       const uploadedImages = await Promise.all(
//         files.map((file) => uploadFile(file))
//       );
//       setImages([...images, ...uploadedImages]);
//       setUploading(false);
//     } catch (error) {
//       console.error(error);
//       setUploading(false);
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       createProduct({
//         name,
//         price,
//         images,
//         category,
//         countInStock,
//         description,
//       })
//     ).then(() => {
//       navigate('/seller');
//     });
//   };

//   return (
//     <FormContainer>
//       <h1 className="text-2xl font-bold mb-4">Create Product</h1>
//       {error && <Message variant="danger">{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="name" className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="price" className="mb-3">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="image" className="mb-3">
//           <Form.Label>Images</Form.Label>
//           <Form.Control
//             type="file"
//             multiple
//             onChange={uploadFileHandler}
//             className="mb-2"
//           />
//           {uploading && <Loader />}
//           <div className="flex flex-wrap gap-2 mt-2">
//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image.url}
//                 alt={`Preview ${index}`}
//                 className="w-20 h-20 object-cover rounded"
//               />
//             ))}
//           </div>
//         </Form.Group>

//         <Form.Group controlId="category" className="mb-3">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="countInStock" className="mb-3">
//           <Form.Label>Count In Stock</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter count in stock"
//             value={countInStock}
//             onChange={(e) => setCountInStock(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="description" className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Form.Group>

//         <Button type="submit" variant="primary" className="w-full mt-4">
//           Create Product
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default ProductCreateScreen;