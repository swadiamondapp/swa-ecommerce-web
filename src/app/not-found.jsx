import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center my-40">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-gray-500 mb-2">Could not find the requested page</p>
      <Link href="/" className="text-teal-700 hover:text-teal-800">
        Return Home
      </Link>
    </div>
  )
}