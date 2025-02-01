import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ITEMS_PER_PAGE = 15;

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const searchResults = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.details.some(detail => detail.toLowerCase().includes(query.toLowerCase()))
  );

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = searchResults.slice(startIndex, endIndex);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <Helmet>
        <title>Search Results for "{query}" - Easy Buy Links</title>
        <meta name="description" content={`Search results for "${query}" on Easy Buy Links. Find the best products matching your search.`} />
        <meta name="keywords" content={`${query}, search results, easy buy links, online shopping`} />
        <meta property="og:title" content={`Search Results for "${query}" - Easy Buy Links`} />
        <meta property="og:description" content={`Search results for "${query}" on Easy Buy Links. Find the best products matching your search.`} />
        <meta property="og:image" content="https://easy-buylinks.netlify.app/search-banner.jpg" />
        <meta property="og:url" content={`https://easy-buylinks.netlify.app/search?q=${query}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mb-8">
          Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
        </p>

        {currentResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResults.map(product => (
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
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your search. Try different keywords or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};