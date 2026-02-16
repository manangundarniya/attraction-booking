import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const AttractionCard = ({ attraction }) => {
    // Destructure with fallbacks for the API response structure
    const { 
        id, 
        title, 
        city, 
        region, // API returns region
        price, 
        rating = 4.5, // Default/Mock as API doesn't return ratings yet
        reviews = 0, // Default/Mock 
        image, 
        attachments, // API returns attachments
        categories,
        attraction_type // API returns attraction_type
    } = attraction;

    // Derived values
    const displayImage = image || (attachments && attachments.length > 0 ? attachments[0].public_url : 'https://via.placeholder.com/400x300?text=No+Image');
    const displayCity = city || region?.name || 'Dubai'; // Default to Dubai if unknown
    const displayCategory = categories?.[0] || attraction_type?.name || 'General';
    const displayPrice = price ? `$${price}` : 'View Details';

    return (
        <Link to={`/attractions/${id}`} className="group block h-full">
            <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col border border-gray-100">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={displayImage}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error'; }} 
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-text-main shadow-sm">
                        {displayCategory}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-xs font-bold text-text-main">{rating}</span>
                        <span className="text-xs text-text-light">({reviews.toLocaleString()})</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <div className="text-xs text-text-light mb-1 uppercase tracking-wide font-medium">{displayCity}</div>
                    <h3 className="font-bold text-text-main text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>

                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50">
                        <div>
                            <div className="text-xs text-text-light mb-0.5">From</div>
                            <div className="text-lg font-bold text-text-main">{displayPrice}</div>
                        </div>
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AttractionCard;
