import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShoppingBag, Heart, Truck, Shield, Facebook } from 'lucide-react';

const bannerData = [
  {
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&q=75&auto=format",
    quote: "Connecting You with Quality",
    subtext: "Your trusted partner in online shopping"
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=75&auto=format",
    quote: "Shopping Made Simple",
    subtext: "Discover the joy of hassle-free online shopping"
  }
];

export const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(current => (current + 1) % bannerData.length);
    }, 2000); // Changed to 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Helmet>
        <title>About Us - Easy Buy Links</title>
        <meta name="description" content="Learn more about Easy Buy Links, our mission, and why we're the best choice for online shopping." />
        <meta name="keywords" content="about easy buy links, mission, online shopping, trusted partner" />
        <meta property="og:title" content="About Us - Easy Buy Links" />
        <meta property="og:description" content="Learn more about Easy Buy Links, our mission, and why we're the best choice for online shopping." />
        <meta property="og:image" content="https://easy-buylinks.netlify.app/about-banner.jpg" />
        <meta property="og:url" content="https://easy-buylinks.netlify.app/about" />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        {bannerData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.quote}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.quote}</h1>
                <p className="text-xl md:text-2xl">{slide.subtext}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              Easy Buy Links was founded with a simple yet powerful vision: to make online shopping easier, 
              more transparent, and more enjoyable for everyone. We understand that in today's fast-paced 
              world, finding the best products at the best prices can be overwhelming.
            </p>
            <p className="text-gray-600 leading-relaxed">
              That's why we've created a platform that curates high-quality products from trusted sellers, 
              ensuring that you always get the best value for your money. Our team of experts carefully 
              reviews each product and seller to maintain the highest standards of quality and reliability.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-gray-600">Carefully selected products from trusted sellers worldwide</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices and exclusive deals for our customers</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping options available</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Safe and secure transactions guaranteed</p>
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to revolutionize the online shopping experience by providing a trusted platform 
              where customers can discover quality products at competitive prices. We strive to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-3">
              <li>Connect customers with reliable sellers and amazing products</li>
              <li>Ensure transparency in pricing and product information</li>
              <li>Provide exceptional customer service and support</li>
              <li>Make online shopping accessible and enjoyable for everyone</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed mb-6">
              We're always here to help! If you have any questions, suggestions, or concerns, 
              please don't hesitate to reach out to us.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                <p className="text-gray-600">Email: easybuy7000@gmail.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Business Inquiries</h3>
                <p className="text-gray-600">Email: easybuy7000@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mb-8">
          <a
            href="https://www.facebook.com/share/14pN4T2voP/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-300"
          >
            <Facebook size={32} />
            <span className="text-lg">Follow us on Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};