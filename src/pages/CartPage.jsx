import { useState, useEffect } from 'react';
import { getCart, removeFromCart } from '../services/cartAPI';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await getCart();
        setCart(response.data);
      } catch (err) {
        setError('Failed to fetch cart.');
        toast.error('Failed to fetch cart.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart(prevCart => prevCart.filter(item => item.productId !== productId));
      toast.success('Item removed from cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item from cart.');
    }
  };

  if (loading) return <div className="text-center p-4">Loading cart...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!cart || cart.length === 0) return <div className="text-center p-4">Your cart is empty.</div>;

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.productId} className="flex items-center justify-between p-4 border rounded">
            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-lg font-bold">${item.price}</p>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(item.productId)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <p className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <Link to="/checkout">
          <button className="bg-blue-500 text-white px-6 py-2 rounded mt-2">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
