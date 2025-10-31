import React from 'react';
import type { Product } from '../types';
import { StarIcon, HeartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
}

const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-yellow-400" isFilled={i <= rating} />);
    }
    return stars;
};


export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewProduct, wishlist, onToggleWishlist }) => {
  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="relative cursor-pointer" onClick={() => onViewProduct(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors duration-200 ${
            isWishlisted 
              ? 'bg-pink-100 text-pink-500' 
              : 'bg-white/70 text-gray-600 hover:text-pink-500 hover:bg-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon className="w-5 h-5" isFilled={isWishlisted} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          className="text-sm font-semibold text-gray-800 mb-2 h-10 overflow-hidden cursor-pointer"
          onClick={() => onViewProduct(product)}
        >
          {product.name}
        </h3>
        <div className="flex items-center mt-auto mb-2">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>
        <p className="text-lg font-bold text-purple-600 mb-3">${product.price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-auto bg-pink-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};