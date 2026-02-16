import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import Layout from '../components/Layout';
import BookingBox from '../components/BookingBox';

const AttractionDetails = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await api.getAttractionDetails(id);
        setAttraction(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return (
    <Layout>
      <div className="animate-pulse container mx-auto px-4 py-8">
        <div className="h-[400px] bg-gray-200 rounded-xl mb-8"></div>
        <div className="h-8 bg-gray-200 w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 w-1/4 mb-8"></div>
      </div>
    </Layout>
  );

  if (!attraction) return <Layout><div className="p-20 text-center">Attraction not found</div></Layout>;

  // Data Mapping & Fallbacks
  const { 
      title, 
      city, 
      region, 
      price, 
      rating = 4.5, 
      reviews = 0, 
      image,
      attachments,
      categories,
      attraction_type,
      description,
      highlights,
      inclusions, // API might return inclusions instead/extra
      timings,
      location,
      timing_type
  } = attraction;

  const displayImage = image || (attachments && attachments.length > 0 ? attachments[0].public_url : 'https://via.placeholder.com/800x600?text=No+Image');
  
  // Helper to safely get name from string or object
  const getName = (val) => (typeof val === 'object' && val !== null ? val.name : val);

  const displayCity = getName(city) || getName(region) || 'Dubai';
  const displayCountry = getName(attraction.country) || 'UAE';

  const displayCategories = categories || (attraction_type ? [attraction_type.name] : []); // Ensure array
  const displayHighlights = highlights || inclusions || []; // Fallback to inclusions or empty
  const displayTimings = timings || "Open Daily: 9:00 AM - 6:00 PM"; // Mock default
  const displayLocation = location || displayCity; 

  return (
    <Layout>
      {/* Gallery Header */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {displayCategories.map(cat => (
                <span key={cat} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">{cat}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">{title}</h1>
            <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span> {rating} ({reviews.toLocaleString()} reviews)
              </span>
              <span>•</span>
              <span>{displayCity}, {displayCountry}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content */}
          <div className="lg:w-2/3">

            {/* Highlights */}
            {displayHighlights.length > 0 && (
                <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Experience Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">✓</span>
                        <span className="text-text-main">{typeof highlight === 'string' ? highlight : highlight.description || 'Included Feature'}</span>
                    </li>
                    ))}
                </ul>
                </div>
            )}

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About this activity</h2>
              <p className="text-text-body text-lg leading-relaxed">{description || "Experience the best of this attraction with our exclusive ticket packages."}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold mb-2">Opening Hours</h3>
                <p className="text-text-body">{displayTimings}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold mb-2">Location</h3>
                <p className="text-text-body">{displayLocation}</p>
              </div>
            </div>

          </div>

          {/* Sidebar Booking */}
          <div className="lg:w-1/3">
             {/* Pass mapped/raw ID and other safe props */}
            <BookingBox attractionId={id} title={title} basePrice={price} timing_type={timing_type} />
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AttractionDetails;
