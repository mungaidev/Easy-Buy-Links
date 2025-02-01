import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Info, ImageOff } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Add image size parameters to Unsplash URLs
  const optimizeImageUrl = (url: string) => {
    if (url.includes('unsplash.com')) {
      // Add width, quality, and format parameters
      return `${url}?w=400&q=75&fm=webp`;
    }
    return url;
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link 
        to={`/product/${product.id}`}
        className="block relative overflow-hidden"
      >
        <div className="relative h-48">
          {!imageError ? (
            <>
              {/* Show skeleton loader while image is loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <img
                src={optimizeImageUrl(product.images[0])}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-105`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageOff className="w-8 h-8 text-gray-400" />
            </div>
          )}
          {product.images.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
              +{product.images.length - 1} more
            </span>
          )}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20 flex items-center justify-center">
          <span className="text-white font-semibold px-4 py-2 rounded-lg bg-green-600 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link 
          to={`/product/${product.id}`}
          className="block group-hover:text-green-600 transition-colors duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">
              £{product.currentPrice.toFixed(2)}
            </span>
            {product.previousPrice && (
              <span className="text-sm text-gray-500 line-through">
                £{product.previousPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to={`/product/${product.id}`}
              className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-full transition-all duration-300"
              title="View Details"
            >
              <Info size={20} />
            </Link>
            <a
              href={product.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-full transition-all duration-300"
              title="Buy Now"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};