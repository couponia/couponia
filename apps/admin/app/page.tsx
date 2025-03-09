export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Welcome to Couponia Admin</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Manage your coupons and settings here
      </p>
    </div>
  );
}
