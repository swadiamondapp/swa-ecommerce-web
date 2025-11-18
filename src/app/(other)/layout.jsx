import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  return (
    <div className="md:pt-16 bg-zinc-100">
    {children}
    </div>
  )
}