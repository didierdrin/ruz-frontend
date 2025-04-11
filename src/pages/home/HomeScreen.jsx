import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../features/product/productSlice';
import ProductList from '../../components/products/ProductList';
import Meta from '../../components/common/Meta';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  // Use RTK Query to fetch products
  const { data, error, isLoading, isError } = useGetProductsQuery(
    { keyword, pageNumber }
  );

  return (
    <>
      <Meta />
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <ProductList
            products={data.products}
            loading={isLoading}
            error={error}
            page={data.page}
            pages={data.pages}
            keyword={keyword}
          />
        )}
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