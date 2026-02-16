import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import TimeSlotSelector from './TimeSlotSelector';
import TicketSelector from './TicketSelector';
import { useCart } from '../context/CartContext';

const BookingBox = ({ attractionId, title, basePrice, timing_type }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState({});
    
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [error, setError] = useState(null);

    // Reset when date changes
    useEffect(() => {
        setAvailableSlots([]);
        setSelectedSlot(null);
        setCategories([]);
        setQuantities({});
        setError(null);
    }, [selectedDate, attractionId]);

    // Fetch Slots or Categories when date changes
    useEffect(() => {
        if (!selectedDate) return;

        const fetchData = async () => {
             setError(null);
            if (timing_type === 'TIME_SLOT') {
                setLoadingSlots(true);
                try {
                    const slots = await api.getTimeSlots(attractionId, selectedDate);
                    setAvailableSlots(slots || []);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load time slots.");
                } finally {
                    setLoadingSlots(false);
                }
            } else {
                // Non-time slot flow (e.g. OPEN)
                setLoadingCategories(true);
                try {
                    const cats = await api.getAvailableCategories(attractionId, selectedDate);
                     setCategories(cats || []);
                     // Init quantities
                     const initialQtys = {};
                     if (cats && cats.length > 0) {
                         cats.forEach(c => initialQtys[c.id] = 0);
                         initialQtys[cats[0].id] = 0; 
                     }
                     setQuantities(initialQtys);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load tickets.");
                } finally {
                    setLoadingCategories(false);
                }
            }
        };

        fetchData();
    }, [selectedDate, attractionId, timing_type]);

    // Fetch Categories when Slot Selected (for TIME_SLOT)
    useEffect(() => {
        if (!selectedSlot || timing_type !== 'TIME_SLOT') return;

        const fetchCats = async () => {
            setLoadingCategories(true);
            setError(null);
            try {
                const cats = await api.getAvailableCategories(
                    attractionId, 
                    selectedDate, 
                    selectedSlot.entry_time, 
                    selectedSlot.exit_time
                );
                setCategories(cats || []);
                 // Init quantities
                 const initialQtys = {};
                 if (cats && cats.length > 0) {
                     cats.forEach(c => initialQtys[c.id] = 0);
                 }
                 setQuantities(initialQtys);
            } catch (err) {
                console.error(err);
                setError("Failed to load tickets for this slot.");
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCats();
    }, [selectedSlot, attractionId, selectedDate, timing_type]);

    const handleQuantityChange = (id, qty) => {
        setQuantities(prev => ({ ...prev, [id]: qty }));
    };

    const calculateTotal = () => {
        let total = 0;
        categories.forEach(cat => {
            const qty = quantities[cat.id] || 0;
            const price = cat.discountedPrice || cat.price; // Use discounted price if available
            total += price * qty;
        });
        return total;
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);
        setError(null);
        try {
            const itemsToAdd = categories.filter(cat => quantities[cat.id] > 0);
            
            for (const cat of itemsToAdd) {
                const payload = {
                    ticketId: cat.id,
                    quantity: quantities[cat.id],
                    date: selectedDate,
                    entry_time: selectedSlot ? selectedSlot.entry_time : null,
                    exit_time: selectedSlot ? selectedSlot.exit_time : null,
                    // Metadata for UI
                    title: title, 
                    categoryName: cat.name,
                    price: cat.discountedPrice || cat.price
                };
                await addToCart(payload);
            }
            // Navigate to Cart
            navigate('/cart');
        } catch (err) {
            console.error(err);
            setError("Failed to add to cart. Please try again.");
        } finally {
            setAddingToCart(false);
        }
    };

    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
    const totalPrice = calculateTotal();
    const isBookable = totalItems > 0 && !addingToCart;

    return (
        <div className="bg-white rounded-xl shadow-sticky border border-gray-100 p-6 sticky top-24">
            <div className="text-xl font-bold mb-4">Book Tickets</div>
            
            {error && <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">{error}</div>}

            {/* Date Picker */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-text-light mb-1">Select Date</label>
                <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            {/* Time Slot Selector */}
            {timing_type === 'TIME_SLOT' && selectedDate && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-text-light mb-2">Select Time Slot</label>
                    {loadingSlots ? (
                        <div className="text-center py-4 text-gray-400">Loading slots...</div>
                    ) : (
                        <TimeSlotSelector 
                            slots={availableSlots} 
                            selectedSlot={selectedSlot} 
                            onSelect={setSelectedSlot} 
                        />
                    )}
                </div>
            )}

            {/* Ticket Selector */}
            {(categories.length > 0) && (
                 <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-text-light">Select Tickets</label>
                        {loadingCategories && <span className="text-xs text-blue-500">Updating...</span>}
                    </div>
                    <TicketSelector 
                        categories={categories} 
                        selections={quantities} 
                        onUpdate={handleQuantityChange} 
                    />
                </div>
            )}

            {/* Total & Action */}
            <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-text-light font-medium">Total</span>
                    <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                
                <Button 
                    fullWidth 
                    size="lg" 
                    disabled={!isBookable} 
                    onClick={handleAddToCart}
                >
                    {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </Button>
                
                <div className="text-center mt-3 text-xs text-green-600 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Free cancellation until 24 hours before
                </div>
            </div>
        </div>
    );
};

export default BookingBox;
