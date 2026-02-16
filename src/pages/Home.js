import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import Layout from "../components/Layout";
import AttractionCard from "../components/AttractionCard";
import ComboCard from "../components/ComboCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredAttractions, setFeaturedAttractions] = useState([]);
  const [popularCombos, setPopularCombos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attractionsRes, combosRes] = await Promise.all([
          api.getSingleAttractions(),
          api.getComboAttractions(),
        ]);

        console.log("Attractions =>", attractionsRes);
        console.log("Combos =>", combosRes);

        // ✅ Extract array safely
        const attractionsData = attractionsRes?.data || [];
        const combosData = combosRes?.data || [];

        setFeaturedAttractions(attractionsData.slice(0, 4));
        setPopularCombos(combosData.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[500px] mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Unforgettable Experiences
            <br />
            <span className="text-primary-light">Wait For You</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-100 drop-shadow-md">
            Book tickets to top attractions, tours, and museums worldwide. Skip
            the line and save money.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-grow flex items-center px-4 h-12 md:h-14 bg-gray-50 rounded-xl">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Where do you want to go? (e.g. Paris, Louvre)"
                className="bg-transparent w-full outline-none text-text-main placeholder-text-light"
                id="searchInput"
              />
            </div>
            <Button
              size="lg"
              className="md:w-auto w-full h-12 md:h-14 rounded-xl px-8"
              onClick={() => {
                const val = document.getElementById("searchInput").value;
                if (val)
                  window.location.href = `/attractions?search=${encodeURIComponent(val)}`;
              }}
            >
              There I Go!
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">
              Trending Attractions
            </h2>
            <p className="text-text-body">
              Top rated experiences loved by travelers.
            </p>
          </div>
          <Link to="/attractions">
            <Button variant="ghost">View All &rarr;</Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(featuredAttractions) &&
              featuredAttractions.map((attr) => (
                <AttractionCard key={attr.id} attraction={attr} />
              ))}
          </div>
        )}
      </section>

      {/* Popular Combos */}
      <section className="bg-surface-white py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-main mb-2">
                Save with Bundles
              </h2>
              <p className="text-text-body">
                Get more for less with our curated attraction combos.
              </p>
            </div>
            <Link to="/combos">
              <Button variant="ghost">View All &rarr;</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(popularCombos) &&
                popularCombos.map((combo) => (
                  <ComboCard key={combo.id} combo={combo} />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <h2 className="text-2xl font-bold mb-12">
          Why book with AttractionBooker?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
              ⚡
            </div>
            <h3 className="font-bold text-lg mb-2">Instant Confirmation</h3>
            <p className="text-text-body">
              Get your tickets delivered to your phone instantly. No printing
              needed.
            </p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
              🛡️
            </div>
            <h3 className="font-bold text-lg mb-2">Trusted Platform</h3>
            <p className="text-text-body">
              Millions of reviews from real travelers you can trust.
            </p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
              📞
            </div>
            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-text-body">
              We are here to help you around the clock in multiple languages.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
