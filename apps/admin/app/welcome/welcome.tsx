import { Outlet } from 'react-router-dom';

export function Welcome() {
  return (
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
      <Outlet />
    </div>
  );
}