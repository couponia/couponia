import { Link, Outlet } from 'react-router-dom';
import { IconBuildingStore, IconCategory, IconDiscount, IconHeart, IconTicket, IconUsers, IconUsersGroup } from '@tabler/icons-react';

const sidebarItems = [
  { name: 'Brands & Categories', icon: <IconCategory />, path: '/brands' },
  { name: 'Discounted Items', icon: <IconDiscount />, path: '/items' },
  { name: 'Nonprofits', icon: <IconHeart />, path: '/nonprofits' },
  { name: 'Partners & Outlets', icon: <IconUsersGroup />, path: '/partners' },
  { name: 'Clients & Shops', icon: <IconBuildingStore />, path: '/clients' },
  { name: 'Coupon Management', icon: <IconTicket />, path: '/coupons' },
  { name: 'User Management', icon: <IconUsers />, path: '/users' },
];

export function Welcome() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-600">Couponia Admin</h1>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-purple-600">Active Coupons</h3>
                <p className="text-3xl font-bold mt-2">245</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-600">Partner Brands</h3>
                <p className="text-3xl font-bold mt-2">52</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-green-600">Total Users</h3>
                <p className="text-3xl font-bold mt-2">1,234</p>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}