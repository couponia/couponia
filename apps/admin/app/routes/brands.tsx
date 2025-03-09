import { useState } from 'react';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

interface Brand {
  id: string;
  name: string;
  logo: string;
  categories: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function BrandsAndCategories() {
  const [activeTab, setActiveTab] = useState<'brands' | 'categories'>('brands');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - replace with actual API calls
  const brands: Brand[] = [
    { id: '1', name: 'Nike', logo: '/brands/nike.png', categories: ['Sports', 'Fashion'] },
    { id: '2', name: 'Woolworths', logo: '/brands/woolworths.png', categories: ['Grocery', 'Fashion'] },
  ];

  const categories: Category[] = [
    { id: '1', name: 'Fashion', description: 'Clothing and accessories' },
    { id: '2', name: 'Electronics', description: 'Gadgets and devices' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Brands & Categories</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
        >
          <IconPlus size={20} className="mr-2" />
          Add {activeTab === 'brands' ? 'Brand' : 'Category'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 ${
                activeTab === 'brands'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('brands')}
            >
              Brands
            </button>
            <button
              className={`px-6 py-3 ${
                activeTab === 'categories'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'brands' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <div key={brand.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-purple-600">
                        <IconEdit size={20} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600">
                        <IconTrash size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold">{brand.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {brand.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-purple-50 text-purple-600 text-sm px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y">
              {categories.map((category) => (
                <div key={category.id} className="py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-purple-600">
                      <IconEdit size={20} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600">
                      <IconTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal - implement actual modal component */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add New {activeTab === 'brands' ? 'Brand' : 'Category'}
            </h2>
            {/* Add form implementation */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 