import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Booking = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    const { date, quantities, totalPrice, title } = location.state || {}; // Using state for simplicity
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success

    if (!location.state) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">No booking in progress</h2>
                    <Link to="/"><Button>Go Home</Button></Link>
                </div>
            </Layout>
        );
    }

    const handlePayment = () => {
        // Mock payment processing
        setTimeout(() => {
            setStep(3);
        }, 1500);
    };

    if (step === 3) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center max-w-lg">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-text-main mb-2">Booking Confirmed!</h1>
                    <p className="text-text-body mb-8">Your tickets have been sent to your email. Get ready for an amazing experience!</p>
                    <div className="bg-gray-50 rounded-lg p-6 w-full text-left mb-8 border border-gray-100">
                        <div className="text-sm text-text-light mb-1">Booking Reference</div>
                        <div className="font-mono font-bold text-lg mb-4">#AB-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                        <div className="flex justify-between border-t border-gray-200 pt-4">
                            <span className="font-medium">Total Paid</span>
                            <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <Link to="/" className="w-full">
                        <Button fullWidth>Back to Explorations</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-50 py-8 min-h-[calc(100vh-64px)]">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-2xl font-bold text-text-main mb-6">Confirm Your Booking</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column - Forms */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Contact Info */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center">1</span>
                                    Contact Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-light mb-1">First Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-light mb-1">Last Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary" placeholder="Doe" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-text-light mb-1">Email</label>
                                        <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary" placeholder="john@example.com" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-text-light mb-1">Phone Number</label>
                                        <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center">2</span>
                                    Payment Method
                                </h2>
                                <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-primary text-sm mb-4">
                                    This is a mock payment step. No real transaction will occur.
                                </div>
                                <div className="space-y-4">
                                    <div className="border border-primary bg-blue-50/50 p-4 rounded-lg flex items-center gap-3 cursor-pointer">
                                        <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                                        <span className="font-medium">Credit or Debit Card</span>
                                        <div className="ml-auto flex gap-2">
                                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>

                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" placeholder="Card Number" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" placeholder="MM/YY" />
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" placeholder="CVC" />
                                    </div>
                                </div>
                            </div>

                            <Button size="lg" fullWidth onClick={handlePayment}>
                                Pay ${totalPrice.toFixed(2)}
                            </Button>
                        </div>

                        {/* Right Column - Summary */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-sticky border border-gray-100 sticky top-24">
                                <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                                <div className="mb-4">
                                    <div className="text-sm text-text-light mb-1">Experience</div>
                                    <div className="font-medium text-text-main">{title || "Selected Attraction"}</div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm text-text-light mb-1">Date</div>
                                    <div className="font-medium text-text-main">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>

                                <div className="border-t border-gray-100 py-4 space-y-2">
                                    {Object.entries(quantities).map(([key, qty]) => {
                                        if (qty > 0) return (
                                            <div key={key} className="flex justify-between text-sm">
                                                <span className="text-text-body">{qty}x {key}</span>
                                            </div>
                                        );
                                        return null;
                                    })}
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-xl text-primary">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Booking;
