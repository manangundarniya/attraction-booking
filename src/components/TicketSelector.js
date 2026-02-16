import React from 'react';

const TicketSelector = ({ categories, selections, onUpdate }) => {
    if (!categories || categories.length === 0) {
        return <div className="text-gray-500 italic">Select a time slot to view tickets.</div>;
    }

    return (
        <div className="space-y-4">
            {categories.map((category) => {
                const quantity = selections[category.id] || 0; // Assuming category.id is the ticketId or equivalent unique identifier

                return (
                    <div key={category.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                        <div className="flex-1 pr-4">
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                            <div className="mt-2 flex items-baseline space-x-2">
                                <span className="text-lg font-bold text-blue-600">
                                    {category.discountedPrice ? `$${category.discountedPrice}` : `$${category.price}`}
                                </span>
                                {category.discountedPrice && (
                                    <span className="text-sm text-gray-400 line-through">${category.price}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center mt-4 sm:mt-0 space-x-3">
                            <button
                                onClick={() => onUpdate(category.id, Math.max(0, quantity - 1))}
                                disabled={quantity === 0}
                                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors
                                    ${quantity === 0 
                                        ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                                    }`}
                            >
                                -
                            </button>
                            <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
                            <button
                                onClick={() => onUpdate(category.id, quantity + 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TicketSelector;
