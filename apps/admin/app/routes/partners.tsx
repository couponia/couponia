import { useState } from 'react';
import { IconPlus, IconEdit, IconTrash, IconSearch, IconBuildingStore } from '@tabler/icons-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'retailer' | 'brand' | 'service';
  status: 'active' | 'inactive';
  contactPerson: string;
  email: string;
  phone: string;
  outlets: Outlet[];
  totalCoupons: number;
  activeCampaigns: number;
}

interface Outlet {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  manager: string;
}

export default function Partners() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'partners' | 'outlets'>('partners');

  // Mock data - replace with actual API calls
  const partners: Partner[] = [
    {
      id: '1',
      name: 'Woolworths',
      logo: '/partners/woolworths.png',
      type: 'retailer',
      status: 'active',
      contactPerson: 'John Smith',
      email: 'john.smith@woolworths.co.za',
      phone: '+27 21 407 9111',
      outlets: [
        {
          id: '1',
          name: 'Woolworths V&A Waterfront',
          address: '19 Dock Road',
          city: 'Cape Town',
          province: 'Western Cape',
          phone: '+27 21 555 1234',
          manager: 'Sarah Johnson',
        },
        {
          id: '2',
          name: 'Woolworths Sandton City',
          address: '83 Rivonia Road',
          city: 'Johannesburg',
          province: 'Gauteng',
          phone: '+27 11 555 5678',
          manager: 'Michael Brown',
        },
      ],
      totalCoupons: 5000,
      activeCampaigns: 3,
    },
    {
      id: '2',
      name: 'Pick n Pay',
      logo: '/partners/pick-n-pay.png',
      type: 'retailer',
      status: 'active',
      contactPerson: 'Jane Doe',
      email: 'jane.doe@pnp.co.za',
      phone: '+27 21 658 1000',
      outlets: [
        {
          id: '3',
          name: 'Pick n Pay Observatory',
          address: '123 Main Road',
          city: 'Cape Town',
          province: 'Western Cape',
          phone: '+27 21 555 9012',
          manager: 'David Wilson',
        },
      ],
      totalCoupons: 3000,
      activeCampaigns: 2,
    },
  ];

  const allOutlets = partners.flatMap((partner) =>
    partner.outlets.map((outlet) => ({
      ...outlet,
      partnerName: partner.name,
      partnerLogo: partner.logo,
    }))
  );

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Partners & Outlets</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
          >
            <IconPlus size={20} className="mr-2" />
            Add {activeTab === 'partners' ? 'Partner' : 'Outlet'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-6 py-3 ${
                  activeTab === 'partners'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('partners')}
              >
                Partners
              </button>
              <button
                className={`px-6 py-3 ${
                  activeTab === 'outlets'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('outlets')}
              >
                Outlets
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

            {activeTab === 'partners' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {partners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-16 h-16 object-contain rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{partner.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {partner.outlets.length} outlets
                          </p>
                          <span
                            className={`mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              partner.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {partner.status}
                          </span>
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
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p className="font-medium">{partner.contactPerson}</p>
                        <p className="text-sm">{partner.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{partner.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Coupons</p>
                        <p className="font-medium">{partner.totalCoupons.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active Campaigns</p>
                        <p className="font-medium">{partner.activeCampaigns}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Outlet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Partner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Manager
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allOutlets.map((outlet) => (
                      <tr key={outlet.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <IconBuildingStore
                              size={24}
                              className="text-gray-400 mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {outlet.name}
                              </div>
                              <div className="text-sm text-gray-500">{outlet.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={outlet.partnerLogo}
                              alt={outlet.partnerName}
                              className="w-8 h-8 object-contain rounded mr-2"
                            />
                            <span className="text-sm text-gray-900">
                              {outlet.partnerName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{outlet.address}</div>
                          <div className="text-sm text-gray-500">
                            {outlet.city}, {outlet.province}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {outlet.manager}
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
            )}
          </div>
        </div>
      </div>

      {/* Add Modal - implement actual modal component */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              Add New {activeTab === 'partners' ? 'Partner' : 'Outlet'}
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
    </>
  );
} 