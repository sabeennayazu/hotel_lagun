const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Hotel Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Hotel Lagoon</h3>
                        <p className="text-gray-400">
                            Experience luxury and comfort at its finest with our world-class
                            amenities and exceptional service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#rooms" className="text-gray-400 hover:text-white">
                                    Rooms
                                </a>
                            </li>
                            <li>
                                <a href="#facilities" className="text-gray-400 hover:text-white">
                                    Facilities
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Hotel Street</li>
                            <li>City, State 12345</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: info@hotellagoon.com</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Newsletter</h3>
                        <p className="text-gray-400">
                            Subscribe to our newsletter for updates and special offers.
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Hotel Lagoon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
