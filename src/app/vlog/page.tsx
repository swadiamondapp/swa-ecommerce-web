// app/vlog/page.tsx
'use client';

export default function VlogPage() {
  return (
    <iframe
      src="https://swavlog.zinfog.in/"
      className="w-full min-h-screen border-0"
      style={{ height: '100vh' }}
      title="SWA Diamonds Blog"
    />
  );
}

// app/vlog/layout.tsx
export default function VlogLayout({ children }: { children: React.ReactNode }) {
  // Return children without wrapping it in your main layout
  return <>{children}</>;
}
