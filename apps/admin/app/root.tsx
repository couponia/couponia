import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "react-router";
import { IconCategory, IconDiscount, IconHeart, IconTicket, IconUsers, IconUsersGroup, IconBuildingStore, IconMenu2, IconLogout } from '@tabler/icons-react';
import { useState } from 'react';

import { AuthProvider, useAuth } from './contexts/auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import type { Route } from "./+types/root";
import "./app.css";

const sidebarItems = [
  { name: 'Brands & Categories', icon: <IconCategory />, path: '/brands' },
  { name: 'Discounted Items', icon: <IconDiscount />, path: '/items' },
  { name: 'Nonprofits', icon: <IconHeart />, path: '/nonprofits' },
  { name: 'Partners & Outlets', icon: <IconUsersGroup />, path: '/partners' },
  { name: 'Clients & Shops', icon: <IconBuildingStore />, path: '/clients' },
  { name: 'Coupon Management', icon: <IconTicket />, path: '/coupons' },
  { name: 'User Management', icon: <IconUsers />, path: '/users' },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  // Don't show the layout on the login page
  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 h-full bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-600">Couponia Admin</h1>
        </div>
        <nav className="mt-6 flex flex-col h-[calc(100%-160px)] justify-between">
          <div>
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <button
            onClick={logout}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors mt-auto"
          >
            <span className="mr-3"><IconLogout /></span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <IconMenu2 size={24} />
          </button>
        </div>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </main>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
