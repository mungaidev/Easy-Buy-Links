import React from 'react';
import { Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Easy Buy Links. All rights reserved.
          </p>
          <a
            href="https://www.facebook.com/share/14pN4T2voP/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-300"
          >
            <Facebook size={24} />
            <span>Follow us on Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
};