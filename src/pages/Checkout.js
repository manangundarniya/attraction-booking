import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartId, cartItems } = useCart(); // Assuming cartId is available
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // Step 8: Checkout
            const payload = {
                cart_id: cartId,
                customer: formData
            };
            
            const res = await api.checkout(payload);
            
            // Assuming res contains orderId or similar
            // If API returns { orderId: 123 }, or { id: 123 }
            const orderId = res.orderId || res.id;
            
            if (orderId) {
                navigate(`/confirmation/${orderId}`, { state: { orderData: res } });
            } else {
                throw new Error("Order ID not found in response");
            }
        } catch (err) {
            console.error(err);
            setError("Checkout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    // Calculate total from context items
    // Calculate total from context items
    // const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="mb-6 border-b pb-4">
                        <h2 className="font-bold text-lg mb-2">Order Summary</h2>
                        <div className="text-gray-500 text-sm">
                            {cartItems.length} items
                        </div>
                        {/* <div className="text-xl font-bold text-primary mt-2">Total: ${total.toFixed(2)}</div> */}
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input 
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input 
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                        
                        <div className="pt-4">
                            <Button fullWidth size="lg" disabled={loading} type="submit">
                                {loading ? 'Processing...' : 'Confirm Booking'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;
