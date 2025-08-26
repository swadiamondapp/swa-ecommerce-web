export default function VlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This overrides your main layout so NO header/footer
  return <>{children}</>;
}
