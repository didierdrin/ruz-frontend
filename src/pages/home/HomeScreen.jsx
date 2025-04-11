import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../../features/product/productSlice';
import ProductList from '../../components/products/ProductList';
import Meta from '../../components/common/Meta';
import axios from 'axios';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(setLoading(true)); // Start loading
    dispatch(setError(null)); // Reset previous errors

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products`, {
          params: { keyword, pageNumber }, // Send keyword and pageNumber as query parameters
        });

        // Dispatch the action to set products and pagination data
        dispatch(setProducts({
          products: data.products,
          page: data.page,
          pages: data.pages,
        }));

        dispatch(setLoading(false)); // Stop loading
      } catch (err) {
        dispatch(setError(err.message || 'Failed to fetch products')); // Handle error
        dispatch(setLoading(false)); // Stop loading
      }
    };

    fetchProducts();
  }, [dispatch, keyword, pageNumber]); // Re-run the effect when keyword or pageNumber changes

  return (
    <>
      <Meta />
      <div className="container mx-auto px-4 py-6">
        <ProductList
          products={products}
          loading={loading}
          error={error}
          page={page}
          pages={pages}
          keyword={keyword}
        />
      </div>
    </>
  );
};

export default HomeScreen;


//import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// //import { listProducts } from '../../features/product/productSlice';
// import ProductList from '../../components/products/ProductList';
// import Meta from '../../components/common/Meta';

// const HomeScreen = () => {
//   const { keyword, pageNumber } = useParams();
//   const dispatch = useDispatch();

//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products, page, pages } = productList;

//   useEffect(() => {
//     dispatch(listProducts({ keyword, pageNumber }));
//   }, [dispatch, keyword, pageNumber]);

//   return (
//     <>
//       <Meta />
//       <div className="container mx-auto px-4 py-6">
//         <ProductList
//           products={products}
//           loading={loading}
//           error={error}
//           page={page}
//           pages={pages}
//           keyword={keyword}
//         />
//       </div>
//     </>
//   );
// };

// export default HomeScreen;