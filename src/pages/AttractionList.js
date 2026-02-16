import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Layout from '../components/Layout';
import AttractionCard from '../components/AttractionCard';

const AttractionList = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: 100,
    categories: []
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const search = searchParams.get('search');
        const category = searchParams.get('category'); // Basic support if passed
        
        const queryFilters = { ...filters };
        if (search) queryFilters.search = search;
        if (category) queryFilters.category = category;

        const data = await api.getSingleAttractions(queryFilters);
        setAttractions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]); // Re-run if filters change (though currently filters state is local and doesn't trigger URL change, but existing useEffect was empty dep array, changing to filters allows retry if local filters change)

  return (
    <Layout>
      <div className="bg-primary text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Explore Attractions</h1>
          <p className="opacity-90 mt-2">Find tickets for top museums, castles, and experiences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-16 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Filters</h3>
              <button className="text-xs text-primary font-medium hover:underline">Reset</button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Max Price: ${filters.price}</label>
              <input
                type="range"
                min="10" max="200"
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Categories</h4>
              <div className="space-y-2">
                {['Museums', 'Tours', 'Cruises', 'Food', 'Culture', 'Nature'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 border-gray-300" />
                    <span className="text-sm text-text-body">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <h4 className="text-sm font-medium mb-3">Cities</h4>
              <div className="space-y-2">
                {['Paris', 'London', 'Rome', 'New York', 'Dubai'].map(city => (
                  <label key={city} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 border-gray-300" />
                    <span className="text-sm text-text-body">{city}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse"></div>)}
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-text-light font-medium">{attractions.length} experiences found</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map(attr => (
                  <AttractionCard key={attr.id} attraction={attr} />
                ))}
              </div>
              {/* Pagination */}
              <div className="mt-12 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500" disabled>&lt;</button>
                <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold">1</button>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-text-main">2</button>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-text-main">3</button>
                <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-text-main">&gt;</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AttractionList;
