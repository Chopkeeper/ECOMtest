
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onViewProduct, wishlist, onToggleWishlist }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <h3 className="text-2xl font-semibold">No products found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
};
