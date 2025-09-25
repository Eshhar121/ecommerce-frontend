import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productAPI';
import { addToCart } from '../services/cartAPI';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product.');
        toast.error('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart.');
    }
  };

  if (loading) return <div className="text-center p-4">Loading product...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!product) return <div className="text-center p-4">Product not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-bold mb-4">${product.price}</p>
      <button 
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
