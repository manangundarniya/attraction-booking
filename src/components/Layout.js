import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col bg-surface-muted">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <span className="text-xl font-bold text-text-main tracking-tight">Attraction<span className="text-primary">Booker</span></span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link to="/" className={`font-medium ${isActive('/') ? 'text-primary' : 'text-text-body hover:text-primary'} transition-colors`}>
                                Home
                            </Link>
                            <Link to="/attractions" className={`font-medium ${isActive('/attractions') ? 'text-primary' : 'text-text-body hover:text-primary'} transition-colors`}>
                                Attractions
                            </Link>
                            <Link to="/combos" className={`font-medium ${isActive('/combos') ? 'text-primary' : 'text-text-body hover:text-primary'} transition-colors`}>
                                Combos & Deals
                            </Link>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-text-body text-sm font-medium">USD ($)</span>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Log in</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">Sign up</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-text-body hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
                        <Link to="/" className="text-text-main font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/attractions" className="text-text-main font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Attractions</Link>
                        <Link to="/combos" className="text-text-main font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Combos</Link>
                        <div className="flex gap-4 mt-2">
                            <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" size="sm" fullWidth>Log in</Button>
                            </Link>
                            <Link to="/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="primary" size="sm" fullWidth>Sign up</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-text-main text-white pt-16 pb-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="text-2xl font-bold mb-4">Attraction<span className="text-primary">Booker</span></div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Discover and book the best experiences, tours, and attractions worldwide. Your journey starts here.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Newsletter</h4>
                            <p className="text-gray-400 text-sm mb-4">Subscribe for travel inspiration and exclusive deals.</p>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Email address" className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                                <Button variant="primary" size="sm">Join</Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>&copy; 2024 AttractionBooker. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <span>USD</span>
                            <span>English (US)</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
