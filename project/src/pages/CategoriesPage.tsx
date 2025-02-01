import React, { useState, useCallback } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ITEMS_PER_PAGE = 15;

export const CategoriesPage = () => {
  const { products } = useProducts();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === 'asc' 
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      <Helmet>
        <title>Categories - Easy Buy Links</title>
        <meta name="description" content="Browse all product categories on Easy Buy Links. Find the best deals and products in every category." />
        <meta name="keywords" content="categories, products, easy buy links, online shopping, best deals" />
        <meta property="og:title" content="Categories - Easy Buy Links" />
        <meta property="og:description" content="Browse all product categories on Easy Buy Links. Find the best deals and products in every category." />
        <meta property="og:image" content="https://easy-buylinks.netlify.app/categories-banner.jpg" />
        <meta property="og:url" content="https://easy-buylinks.netlify.app/categories" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Categories</h1>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Sort {sortOrder === 'asc' ? '↓' : '↑'}
          </button>
        </div>

        {categories.map(category => {
          const categoryProducts = currentProducts.filter(product => product.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}

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