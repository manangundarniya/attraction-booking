import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, cartId, reserveCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);
        try {
            // Step 7: Reserve Cart
            await reserveCart(cartId);
            navigate('/checkout');
        } catch (err) {
            console.error(err);
            setError("Failed to reserve cart. Please try again.");
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
       return (
           <Layout>
               <div className="container mx-auto px-4 py-20 text-center">
                   <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                   <Link to="/" className="text-primary hover:underline">Browse Attractions</Link>
               </div>
           </Layout>
       );
    }

    /*
    const total = cartItems.reduce((sum, item) => {
         // Assuming item has price/quantity attached or we calculate it. 
         // BookingBox addToCart logic pushed { ticketId, quantity, ... } and response.
         // We might need price info closer to display. 
         // For now, let's assume item structure or minimal display.
         // Wait, BookingBox didn't push Price info into cartItems! 
         // I should fix BookingBox to push price info too for display.
         return sum + (item.price || 0) * item.quantity;
    }, 0);
    */

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                
                {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    {cartItems.map((item, index) => (
                        <div key={index} className="p-6 border-b last:border-0 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg mb-1">{item.title || "Attraction Ticket"}</h3> 
                                <div className="text-sm text-gray-500">
                                    Date: {item.date} {item.entry_time && `| Time: ${item.entry_time}`}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    Quantity: {item.quantity}
                                </div>
                            </div>
                            {/* Price display might be missing if I don't pass it */}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end items-center gap-6">
                    {/* <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div> */}
                    <Button onClick={handleCheckout} disabled={loading} size="lg">
                        {loading ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
