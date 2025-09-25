import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productAPI';
import { Menu, X, Star, Shield, Truck, Award } from 'lucide-react';

const Home = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data.products);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, []);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Designer",
            content: "Absolutely love the quality and design. Fast shipping and excellent customer service!",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
        },
        {
            name: "Michael Rodriguez",
            role: "Developer",
            content: "Best online shopping experience I've had. The products exceeded my expectations.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
        },
        {
            name: "Emma Thompson",
            role: "Entrepreneur",
            content: "Premium quality at affordable prices. I'm a customer for life!",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
        }
    ];

    const trustFeatures = [
        { icon: Shield, title: "Secure Payments", desc: "256-bit SSL encryption" },
        { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
        { icon: Award, title: "Quality Guarantee", desc: "30-day returns" }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                StoreName
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Home
                                </a>
                                <a href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Products
                                </a>
                                <a href="/cart" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Cart
                                </a>
                                <a href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                                    Login
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Home
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Products
                            </a>
                            <a href="/cart" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Cart
                            </a>
                            <a href="/login" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                                Login
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Discover Premium
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Products
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Curated collection of the finest products for modern living.
                            Quality, style, and innovation in every purchase.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Shop Now
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="mt-16 relative">
                        <div className="relative mx-auto max-w-5xl">
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center"
                                alt="Premium products showcase"
                                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Features */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {trustFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center justify-center space-x-4 text-center md:text-left">
                                <feature.icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Featured Products
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Handpicked favorites that our customers love most
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 text-lg">
                                No featured products available.
                            </div>
                        ) : (
                            products.map((product) => (
                                <Link to={`/product/${product._id}`} key={product._id}>
                                    <div
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                                                Sale
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 mb-4">
                                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                                <span className="ml-2 text-gray-600 text-sm">(4.5)</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-xl text-gray-600">
                            Join thousands of satisfied customers worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-8 hover:bg-blue-50 transition-colors duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Start Shopping?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join our community and discover amazing products at unbeatable prices
                    </p>
                    <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                        Explore Products
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                StoreName
                            </h3>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Premium quality products for modern living. Curated with care, delivered with excellence.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 StoreName. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;