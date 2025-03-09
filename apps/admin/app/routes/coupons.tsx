import { useState } from 'react';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconQrcode,
  IconDownload,
} from '@tabler/icons-react';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'bogo';
  value: number;
  brand: string;
  brandLogo: string;
  status: 'active' | 'used' | 'expired';
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  description: string;
  terms: string[];
}

export default function Coupons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // Mock data - replace with actual API calls
  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'SUMMER2024',
      type: 'percentage',
      value: 20,
      brand: 'Woolworths',
      brandLogo: '/brands/woolworths.png',
      status: 'active',
      validFrom: '2024-03-01',
      validUntil: '2024-04-30',
      usageLimit: 1000,
      usageCount: 450,
      description: '20% off on all summer clothing',
      terms: [
        'Valid on all summer clothing items',
        'Cannot be combined with other offers',
        'Valid in-store and online',
      ],
    },
    {
      id: '2',
      code: 'TECH50OFF',
      type: 'fixed',
      value: 500,
      brand: 'Incredible Connection',
      brandLogo: '/brands/incredible.png',
      status: 'active',
      validFrom: '2024-03-15',
      validUntil: '2024-03-31',
      usageLimit: 500,
      usageCount: 123,
      description: 'R500 off on electronics above R5000',
      terms: [
        'Minimum purchase of R5000',
        'Valid on electronics only',
        'One coupon per transaction',
      ],
    },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const formatValue = (type: string, value: number) => {
    switch (type) {
      case 'percentage':
        return `${value}% OFF`;
      case 'fixed':
        return `R${value} OFF`;
      case 'bogo':
        return 'Buy 1 Get 1';
      default:
        return '';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Coupon Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg flex items-center hover:bg-purple-200"
          >
            <IconQrcode size={20} className="mr-2" />
            Generate Bulk Coupons
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
          >
            <IconPlus size={20} className="mr-2" />
            Add Coupon
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coupons..."
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

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coupon Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
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
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {coupon.code}
                      </div>
                      <div className="text-sm text-gray-500">{coupon.description}</div>
                      <div className="mt-1">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                          {formatValue(coupon.type, coupon.value)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={coupon.brandLogo}
                        alt={coupon.brand}
                        className="w-8 h-8 object-contain rounded"
                      />
                      <span className="ml-2 text-sm text-gray-900">{coupon.brand}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(coupon.validFrom).toLocaleDateString()} -{' '}
                      {new Date(coupon.validUntil).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.usageCount} / {coupon.usageLimit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-purple-600 rounded-full h-2"
                        style={{
                          width: `${(coupon.usageCount / coupon.usageLimit) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                        coupon.status
                      )}`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-3">
                      <IconEdit size={20} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <IconDownload size={20} />
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
      </div>

      {/* Add Modal - implement actual modal component */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
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

      {/* Generate Modal - implement actual modal component */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Generate Bulk Coupons</h2>
            {/* Add form implementation */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 