export const metadata = {
  title: "Site Under Maintenance | SWA Diamonds",
  description: "SWA Diamonds website is currently under maintenance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-card">
        <div className="diamond-logo">♦</div>

        <h1 className="title">We’ll Be Back Soon</h1>

        <p className="description">
          Our website is currently undergoing scheduled maintenance.
        </p>
      </div>
    </div>
  );
}
