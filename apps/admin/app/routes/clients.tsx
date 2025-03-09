import { useState } from 'react';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconUser,
  IconBuildingStore,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  couponsUsed: number;
  status: 'active' | 'inactive';
}

interface Shop {
  id: string;
  name: string;
  logo: string;
  type: string;
  location: string;
  manager: string;
  email: string;
  phone: string;
  totalSales: number;
  couponsRedeemed: number;
  rating: number;
  status: 'active' | 'inactive';
}

export default function ClientsAndShops() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'clients' | 'shops'>('clients');

  // Mock data - replace with actual API calls
  const clients: Client[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+27 82 123 4567',
      joinDate: '2024-01-15',
      totalOrders: 12,
      totalSpent: 4500,
      couponsUsed: 8,
      status: 'active',
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'm.brown@example.com',
      phone: '+27 83 234 5678',
      joinDate: '2024-02-01',
      totalOrders: 5,
      totalSpent: 2100,
      couponsUsed: 3,
      status: 'active',
    },
  ];

  const shops: Shop[] = [
    {
      id: '1',
      name: 'Fashion Express',
      logo: '/shops/fashion-express.png',
      type: 'Clothing',
      location: 'Cape Town CBD',
      manager: 'John Smith',
      email: 'john@fashionexpress.co.za',
      phone: '+27 21 555 1234',
      totalSales: 125000,
      couponsRedeemed: 450,
      rating: 4.5,
      status: 'active',
    },
    {
      id: '2',
      name: 'Tech Haven',
      logo: '/shops/tech-haven.png',
      type: 'Electronics',
      location: 'Sandton City',
      manager: 'Lisa Anderson',
      email: 'lisa@techhaven.co.za',
      phone: '+27 11 555 5678',
      totalSales: 350000,
      couponsRedeemed: 280,
      rating: 4.8,
      status: 'active',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients & Shops</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
        >
          <IconPlus size={20} className="mr-2" />
          Add {activeTab === 'clients' ? 'Client' : 'Shop'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 ${
                activeTab === 'clients'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('clients')}
            >
              Clients
            </button>
            <button
              className={`px-6 py-3 ${
                activeTab === 'shops'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('shops')}
            >
              Shops
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {activeTab === 'clients' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <IconUser size={20} className="text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {client.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Joined {new Date(client.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <IconMail size={16} />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <IconPhone size={16} />
                          <span>{client.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {client.totalOrders} orders
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(client.totalSpent)} spent
                        </div>
                        <div className="text-sm text-purple-600">
                          {client.couponsUsed} coupons used
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            client.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-3">
                          <IconEdit size={20} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <IconTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {shops.map((shop) => (
                <div key={shop.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={shop.logo}
                        alt={shop.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{shop.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{shop.type}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm text-gray-600">
                            {shop.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-purple-600 hover:text-purple-900">
                        <IconEdit size={20} />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-900">
                        <IconTrash size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{shop.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="font-medium">{shop.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="text-sm">{shop.email}</p>
                      <p className="text-sm">{shop.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Performance</p>
                      <p className="font-medium">
                        {formatCurrency(shop.totalSales)} sales
                      </p>
                      <p className="text-sm text-purple-600">
                        {shop.couponsRedeemed} coupons redeemed
                      </p>
                    </div>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              Add New {activeTab === 'clients' ? 'Client' : 'Shop'}
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