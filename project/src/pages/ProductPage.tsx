import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, ImageOff } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Helmet } from 'react-helmet-async';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const [activeImage, setActiveImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const product = products.find(p => p.id === id);

  const optimizeImageUrl = (url: string, size: 'large' | 'thumb' = 'large') => {
    if (url.includes('unsplash.com')) {
      const width = size === 'large' ? 800 : 200;
      return `${url}?w=${width}&q=75&fm=webp`;
    }
    return url;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      <Helmet>
        <title>{product.name} - Easy Buy Links</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.name}, ${product.category}, easy buy links, online shopping`} />
        <meta property="og:title" content={`${product.name} - Easy Buy Links`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={optimizeImageUrl(product.images[0])} />
        <meta property="og:url" content={`https://easy-buylinks.netlify.app/product/${product.id}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-96">
                {!imageErrors[activeImage] ? (
                  <>
                    {!imagesLoaded[activeImage] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                    <img
                      src={optimizeImageUrl(product.images[activeImage])}
                      alt={`${product.name} - Image ${activeImage + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imagesLoaded[activeImage] ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => setImagesLoaded(prev => ({ ...prev, [activeImage]: true }))}
                      onError={() => setImageErrors(prev => ({ ...prev, [activeImage]: true }))}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ImageOff className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                        activeImage === index ? 'border-green-600' : 'border-transparent'
                      }`}
                    >
                      {!imageErrors[index] ? (
                        <img
                          src={optimizeImageUrl(image, 'thumb')}
                          alt={`${product.name} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ImageOff className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">
                  £{product.currentPrice.toFixed(2)}
                </span>
                {product.previousPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">
                    £{product.previousPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={product.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Buy Now
                <ExternalLink size={20} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};