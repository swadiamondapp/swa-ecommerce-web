// pages/vlog.js
export default function Vlog() {
  return (
    <iframe
      src="https://swavlog.zinfog.in/"
      className="w-full min-h-screen border-0"
      style={{ height: '100vh' }}
      title="SWA Diamonds Blog"
    />
  );
}

Vlog.getLayout = function PageLayout(page) {
  // No Layout here
  return <>{page}</>;
};
