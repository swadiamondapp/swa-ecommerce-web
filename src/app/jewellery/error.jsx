"use client";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-gray-500">Failed to fetch product details</p>
      <button
        className="bg-teal-800 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => router.push(router.asPath)}
      >
        Refresh
      </button>
    </div>
  );
}
