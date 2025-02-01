import React, { useState, useCallback } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Banner } from '../components/Banner';
import { useProducts } from '../context/ProductContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ITEMS_PER_PAGE = 15;

export const HomePage = () => {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Home - Easy Buy Links</title>
        <meta name="description" content="Discover the best products at great prices on Easy Buy Links." />
        <meta name="keywords" content="easy buy links, affordable products, online shopping, best deals" />
        <meta property="og:title" content="Home - Easy Buy Links" />
        <meta property="og:description" content="Discover the best products at great prices on Easy Buy Links." />
        <meta property="og:image" content="https://easy-buylinks.netlify.app/home-banner.jpg" />
        <meta property="og:url" content="https://easy-buylinks.netlify.app/" />
      </Helmet>

      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-green-700"
            >
              <ChevronLeft size={20} className="mr-1" />
              Previous
            </button>
            
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-green-700"
            >
              Next
              <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};