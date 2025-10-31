import React from 'react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-1">
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 ${
                selectedCategory === category
                  ? 'bg-pink-100 text-pink-600 font-semibold'
                  : 'hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};