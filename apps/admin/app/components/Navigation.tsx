'use client';

import { useEffect, useState } from 'react';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
}

export default function Navigation() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubUser = async () => {
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
          // This will include credentials (cookies) in the request
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch GitHub user');
        }
      } catch (error) {
        console.error('Error fetching GitHub user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubUser();
  }, []);

  return (
    <nav className="w-full px-4 py-3 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-lg">Couponia Admin</div>
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="text-sm">Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{user.name || user.login}</span>
            </div>
          ) : (
            <div className="text-sm">Not authenticated</div>
          )}
        </div>
      </div>
    </nav>
  );
} 