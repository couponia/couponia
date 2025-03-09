import { useState } from 'react';
import { IconPlus, IconEdit, IconTrash, IconSearch, IconCheck } from '@tabler/icons-react';

interface Nonprofit {
  id: string;
  name: string;
  logo: string;
  description: string;
  registrationNumber: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'pending' | 'inactive';
  beneficiaries: number;
  couponsReceived: number;
}

export default function Nonprofits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - replace with actual API calls
  const nonprofits: Nonprofit[] = [
    {
      id: '1',
      name: 'Hope Foundation SA',
      logo: '/nonprofits/hope-foundation.png',
      description: 'Supporting underprivileged communities in South Africa',
      registrationNumber: 'NPO-123-456',
      email: 'contact@hopefoundation.org.za',
      phone: '+27 11 234 5678',
      address: '123 Main Road, Johannesburg',
      status: 'active',
      beneficiaries: 1500,
      couponsReceived: 750,
    },
    {
      id: '2',
      name: 'Ubuntu Care',
      logo: '/nonprofits/ubuntu-care.png',
      description: 'Providing essential supplies to families in need',
      registrationNumber: 'NPO-789-012',
      email: 'info@ubuntucare.org.za',
      phone: '+27 21 345 6789',
      address: '456 Long Street, Cape Town',
      status: 'pending',
      beneficiaries: 800,
      couponsReceived: 0,
    },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Nonprofits</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
        >
          <IconPlus size={20} className="mr-2" />
          Add Nonprofit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search nonprofits..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nonprofits.map((nonprofit) => (
            <div key={nonprofit.id} className="border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={nonprofit.logo}
                    alt={nonprofit.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{nonprofit.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{nonprofit.description}</p>
                    <span
                      className={`mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                        nonprofit.status
                      )}`}
                    >
                      {nonprofit.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {nonprofit.status === 'pending' && (
                    <button className="p-2 text-green-600 hover:text-green-900">
                      <IconCheck size={20} />
                    </button>
                  )}
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
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">{nonprofit.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{nonprofit.email}</p>
                  <p className="text-sm">{nonprofit.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Beneficiaries</p>
                  <p className="font-medium">{nonprofit.beneficiaries.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coupons Received</p>
                  <p className="font-medium">{nonprofit.couponsReceived.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-sm">{nonprofit.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal - implement actual modal component */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Add New Nonprofit</h2>
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