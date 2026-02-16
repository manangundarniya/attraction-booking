import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Layout from '../components/Layout';
import ComboCard from '../components/ComboCard';

const ComboAttractions = () => {
    const [combos, setCombos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await api.getComboAttractions();
                setCombos(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-12 mb-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Bundle & Save</h1>
                    <p className="opacity-90 mt-2">Get the best value with our curated attraction packages</p>
                </div>
            </div>

            <div className="container mx-auto px-4 mb-20">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse"></div>)}
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-sm text-text-light font-medium">{combos.length} bundles available</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {combos.map(combo => (
                                <ComboCard key={combo.id} combo={combo} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default ComboAttractions;
