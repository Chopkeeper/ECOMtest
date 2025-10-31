
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { PRODUCTS, CATEGORIES, REVIEWS } from './constants';
import type { Product, CartItem, Review } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  const handleToggleWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      const isWishlisted = prevWishlist.includes(productId);
      const newWishlist = isWishlisted
        ? prevWishlist.filter(id => id !== productId)
        : [...prevWishlist, productId];
      
      try {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
      
      return newWishlist;
    });
  };

  const handleAddReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const totalCartItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen font-sans bg-slate-100">
      <Header
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        cartItemCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <main className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedCategory} Products
            </h2>
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onViewProduct={setViewingProduct}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          </main>
        </div>
      </div>
      
      {viewingProduct && (
        <ProductModal
          product={viewingProduct}
          reviews={reviews.filter(r => r.productId === viewingProduct.id)}
          onClose={() => setViewingProduct(null)}
          onAddToCart={handleAddToCart}
          onAddReview={handleAddReview}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}
