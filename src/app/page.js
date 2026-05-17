"use client";

export default function Home() {
  return (
    <div className="maintenance-wrapper">

      {/* Animated Background */}
      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {/* Floating Diamonds */}
      <span className="floating floating1"></span>
      <span className="floating floating2"></span>
      <span className="floating floating3"></span>
      <span className="floating floating4"></span>

      {/* Main Card */}
      <div className="maintenance-card">

        <div className="diamond-logo">
          ◆
        </div>

        <h2 className="brand-name">
          SWA DIAMONDS
        </h2>

        <h1 className="title">
          We’re Upgrading Something Beautiful
        </h1>

        <p className="description">
          Our website is currently under scheduled maintenance
          to deliver a faster, more luxurious shopping experience.
          We’ll be back shortly.
        </p>

        {/* Loader */}
        <div className="luxury-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Contact */}
        <div className="contact-box">
          <p>Need assistance?</p>

          <a href="mailto:info@swadiamonds.com">
            info@swadiamonds.com
          </a>
        </div>

      </div>

    </div>
  );
}
