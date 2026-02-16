import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ComboCard = ({ combo }) => {
    // Destructure with fallbacks for safety
    const { 
        id, 
        title, 
        included_attractions, // API likely returns this or we default 
        price, 
        image,
        attachments 
    } = combo;

    // Derived values
    const attractions = included_attractions || [];
    const attractionCount = attractions.length;
    // Mock savings if not in API, or calculate if possible. API 'combo' usually implies savings.
    const savings = "15%"; 
    
    const displayImage = image || (attachments && attachments.length > 0 ? attachments[0].public_url : 'https://via.placeholder.com/400x300?text=Combo');

    return (
        <Link to={`/attractions/${id}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col h-full relative">

                {/* Savings Badge */}
                <div className="absolute top-3 right-3 z-10 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    Save {savings}
                </div>

                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={displayImage}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                        <div className="text-xs font-medium opacity-90">{attractionCount} Attractions in 1 Ticket</div>
                        <h3 className="font-bold text-lg leading-tight mt-1">{title}</h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-orange-50/30 to-white">
                    <ul className="mb-4 space-y-1.5">
                        {attractions.length > 0 ? (
                            attractions.slice(0, 3).map((attr, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-text-body">
                                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="truncate">{attr.title}</span>
                                </li>
                            ))
                        ) : (
                             <li className="text-sm text-text-light italic">Multiple experiences included</li>
                        )}
                        
                        {attractions.length > 3 && (
                            <li className="text-xs text-text-light pl-6">+ {attractions.length - 3} more</li>
                        )}
                    </ul>

                    <div className="mt-auto flex items-center justify-between">
                        <div>
                            <div className="text-xs text-text-light">Package Price</div>
                            <div className="text-xl font-bold text-secondary">${price || 'Check Info'}</div>
                        </div>
                        <Button variant="secondary" size="sm">
                            View Bundle
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ComboCard;
