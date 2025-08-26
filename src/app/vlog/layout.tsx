// app/vlog/layout.tsx
export default function VlogLayout({ children }: { children: React.ReactNode }) {
  // Return children without wrapping it in your main layout
  return <>{children}</>;
}
