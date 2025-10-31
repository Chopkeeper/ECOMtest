
import React, { useState } from 'react';
import type { Product, Review } from '../types';
import { CloseIcon, StarIcon, HeartIcon } from './icons';

interface ProductModalProps {
  product: Product;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
}

const renderStars = (rating: number, className: string = "w-5 h-5") => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<StarIcon key={i} className={`${className} text-yellow-400`} isFilled={i <= rating} />);
    }
    return stars;
};

const ReviewForm: React.FC<{ productId: number; onAddReview: ProductModalProps['onAddReview'] }> = ({ productId, onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!author.trim() || !comment.trim() || rating === 0) {
            setError('Please fill in all fields and select a rating.');
            return;
        }
        onAddReview({ productId, author, rating, comment });
        setRating(0);
        setAuthor('');
        setComment('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-slate-50">
            <h4 className="font-bold text-lg mb-2 text-gray-800">Write a Review</h4>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="mb-3">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                    placeholder="e.g., John Doe"
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex items-center">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <button
                                key={ratingValue}
                                type="button"
                                onMouseEnter={() => setHoverRating(ratingValue)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(ratingValue)}
                                className="text-yellow-400"
                                aria-label={`Rate ${ratingValue} stars`}
                            >
                                <StarIcon
                                    className="w-7 h-7"
                                    isFilled={ratingValue <= (hoverRating || rating)}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Share your thoughts about the product..."
                />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition-colors">
                Submit Review
            </button>
        </form>
    );
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, reviews, onClose, onAddToCart, onAddReview, wishlist, onToggleWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    onClose();
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10"
        >
          <CloseIcon className="w-7 h-7" />
        </button>

        <div className="w-full md:w-1/2 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <div className="flex">{renderStars(product.rating)}</div>
            <span>{product.rating.toFixed(1)}</span>
            <span className="border-l pl-2">{product.reviewCount} Reviews</span>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-2">
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="border-t pt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Customer Reviews</h3>
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map(review => (
                            <div key={review.id} className="border-b pb-3">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{review.author}</p>
                                    <div className="flex">{renderStars(review.rating, "w-4 h-4")}</div>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{review.date}</p>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
                )}
                <ReviewForm productId={product.id} onAddReview={onAddReview} />
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <p className="text-4xl font-extrabold text-orange-500 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="font-semibold">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg font-bold">-</button>
                <input 
                  id="quantity"
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r py-1"
                />
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg font-bold">+</button>
              </div>
            </div>

            <div className="flex items-stretch gap-3">
                <button
                    onClick={handleAddToCartClick}
                    className="flex-grow bg-orange-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-lg border-2 flex items-center justify-center transition-all transform hover:scale-105 ${
                    isWishlisted
                        ? 'border-red-500 bg-red-100 text-red-500'
                        : 'border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500'
                    }`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <HeartIcon className="w-6 h-6" isFilled={isWishlisted} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
