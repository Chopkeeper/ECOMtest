
import React from 'react';
import { SearchIcon, CartIcon, UserIcon } from './icons';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  cartItemCount,
  onCartClick,
}) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-orange-500">ShopZone</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden sm:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full pl-4 pr-12 py-2 border rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-white bg-orange-500 rounded-r-full hover:bg-orange-600 transition flex items-center">
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-orange-500 transition-colors"
            >
              <CartIcon className="w-7 h-7" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="text-gray-600 hover:text-orange-500 transition-colors">
              <UserIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
         {/* Search Bar for mobile */}
         <div className="mt-3 sm:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full pl-4 pr-12 py-2 border rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-white bg-orange-500 rounded-r-full hover:bg-orange-600 transition flex items-center">
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
      </div>
    </header>
  );
};
