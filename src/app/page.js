"use client";

export default function Home() {

  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>

      {/* Gold Glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-yellow-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-amber-400/10 blur-3xl rounded-full animate-pulse"></div>

      {/* Floating Diamonds */}
      <div className="absolute top-20 left-20 text-yellow-400 text-2xl animate-bounce">
        ◆
      </div>

      <div className="absolute bottom-32 left-40 text-yellow-500 text-xl animate-pulse">
        ◆
      </div>

      <div className="absolute top-32 right-32 text-yellow-300 text-3xl animate-bounce">
        ◆
      </div>

      <div className="absolute bottom-20 right-20 text-yellow-500 text-xl animate-pulse">
        ◆
      </div>

      {/* Card */}
      <div className="relative z-10 w-[92%] max-w-4xl rounded-[40px] border border-yellow-500/20 bg-white/5 backdrop-blur-xl p-8 md:p-16 shadow-[0_0_60px_rgba(255,215,0,0.12)]">

        {/* Logo */}
        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full border border-yellow-500/40 flex items-center justify-center mb-6 bg-yellow-500/10 shadow-[0_0_30px_rgba(255,215,0,0.25)]">

            <span className="text-5xl text-yellow-400">
              ◆
            </span>

          </div>

          <h2 className="text-yellow-400 tracking-[10px] uppercase text-sm md:text-base font-semibold mb-6">
            SWA DIAMONDS
          </h2>

        </div>

        {/* Title */}
        <h1 className="text-center text-white text-4xl md:text-7xl font-bold leading-tight mb-8">

          Website Under <br />

          <span className="text-yellow-400">
            Maintenance
          </span>

        </h1>

        {/* Description */}
        <p className="text-center text-zinc-300 text-lg md:text-xl leading-9 max-w-2xl mx-auto">

          We are currently upgrading our digital experience
          to serve you with a more luxurious and seamless jewellery journey.

          <br /><br />

          Our website will be back online shortly.

        </p>

        {/* Loader */}
        <div className="flex justify-center gap-4 mt-12">

          <span className="w-4 h-4 rounded-full bg-yellow-400 animate-bounce"></span>

          <span className="w-4 h-4 rounded-full bg-yellow-400 animate-bounce delay-150"></span>

          <span className="w-4 h-4 rounded-full bg-yellow-400 animate-bounce delay-300"></span>

        </div>

        {/* Contact */}
        <div className="mt-14 text-center">

          <p className="text-zinc-500 mb-3">
            Need assistance?
          </p>

          <a
            href="mailto:info@swadiamonds.com"
            className="text-yellow-400 text-lg hover:text-yellow-300 transition"
          >
            info@swadiamonds.com
          </a>

        </div>

      </div>

    </main>
  );
}
