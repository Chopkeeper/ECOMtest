
import React from 'react';
import type { CartItem } from '../types';
import { CloseIcon, TrashIcon } from './icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartItemRow: React.FC<{item: CartItem; onUpdateQuantity: CartProps['onUpdateQuantity']; onRemoveItem: CartProps['onRemoveItem']}> = ({ item, onUpdateQuantity, onRemoveItem }) => {
    return (
        <div className="flex items-center gap-4 py-4 border-b">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-grow">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 border rounded-md w-fit">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-0.5 text-lg font-bold">-</button>
                    <input 
                        type="number" 
                        value={item.quantity} 
                        readOnly
                        className="w-10 text-center border-l border-r py-0.5"
                    />
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 text-lg font-bold">+</button>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 mt-2">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
}


export const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-5 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Shopping Cart</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <CloseIcon className="w-7 h-7" />
            </button>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="flex-grow overflow-y-auto px-5">
              {cartItems.map(item => (
                <CartItemRow key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
              ))}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              <p className="text-xl font-semibold">Your cart is empty</p>
              <p>Looks like you haven't added anything yet.</p>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-5 border-t mt-auto">
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
