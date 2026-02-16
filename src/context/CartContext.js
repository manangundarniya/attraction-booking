import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../api/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartId, setCartId] = useState(localStorage.getItem('cartId') || null);
    const [cartItems, setCartItems] = useState([]); // This might need to be fetched if server-side
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cartId) {
            localStorage.setItem('cartId', cartId);
        }
    }, [cartId]);

    const initCart = async () => {
        if (cartId) return cartId;
        setLoading(true);
        try {
            const res = await api.createCart();
            if (res && res.cart_id) { // Assuming response structure, usually it returns the cart object
                setCartId(res.cart_id);
                return res.cart_id;
            } else if (res && res.id) {
                 setCartId(res.id);
                 return res.id;
            }
             // Fallback if response structure is different, detailed logging would help
             console.log("Create Cart Response:", res);
             return res?.id || res?.cart_id; // Try to extract based on common patterns
        } catch (err) {
            setError(err);
            console.error("Failed to create cart", err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (ticketData) => {
        setLoading(true);
        setError(null);
        try {
            const currentCartId = await initCart();
            if (!currentCartId) throw new Error("Could not create cart");

            // Format data as per STEP 6: { quantity, date, entry_time, exit_time, cart_id }
            // We separate metadata (for UI) from API payload
            const apiBody = {
                quantity: ticketData.quantity,
                date: ticketData.date,
                entry_time: ticketData.entry_time,
                exit_time: ticketData.exit_time,
                cart_id: currentCartId
            };
            
            // Assuming ticketData includes ticketId to call the correct endpoint
            if(!ticketData.ticketId) throw new Error("Ticket ID missing");

            const res = await api.reserveTicket(ticketData.ticketId, apiBody);
            
            // Update local cart items state - implies we might need to fetch cart or just push this item
            // For now, let's just push to local state for UI feedback
            setCartItems(prev => [...prev, { ...ticketData, ...res }]);
            
            return res;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reserveCart = async () => {
        if (!cartId) return;
        setLoading(true);
        try {
            const res = await api.reserveCart(cartId);
            return res;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    const clearCart = () => {
        setCartId(null);
        setCartItems([]);
        localStorage.removeItem('cartId');
    };

    const value = {
        cartId,
        cartItems,
        loading,
        error,
        initCart,
        addToCart,
        reserveCart,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
