import { placeOrder } from '../services/orderAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Placing order...');
    try {
      await placeOrder();
      toast.success('Order placed successfully!', { id: toastId });
      navigate('/dashboard/user'); // Redirect to user dashboard or an order confirmation page
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order.', { id: toastId });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="max-w-lg mx-auto">
        <div className="mt-6">
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded w-full">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}