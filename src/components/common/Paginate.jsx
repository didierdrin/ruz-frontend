import { Link, useParams } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
  const { pageNumber } = useParams();

  return (
    pages > 1 && (
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow">
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
              className={`px-4 py-2 border ${
                x + 1 === page
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {x + 1}
            </Link>
          ))}
        </nav>
      </div>
    )
  );
};

export default Paginate;