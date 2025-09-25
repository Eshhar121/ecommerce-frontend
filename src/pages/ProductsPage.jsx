import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productAPI';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts(searchQuery); // Pass searchQuery to the API
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products.');
        toast.error('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]); // Re-fetch products when searchQuery changes

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div className="text-center p-4">Loading products...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="bg-white rounded-lg shadow-md p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded-md" />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        )}
      </div>
    </div>
  );
}
