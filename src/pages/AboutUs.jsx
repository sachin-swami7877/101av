import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - 101Dream | Play Aviator & Win Real Cash</title>
        <meta name="description" content="101Dream is India's trusted online gaming platform. Play the Aviator crash game & Lucky Spinner. Win real cash with instant UPI withdrawals." />
        <meta name="keywords" content="101Dream about, Aviator game, Lucky Spinner, real cash games, online gaming India, UPI withdrawal" />
        <link rel="canonical" href="https://101dream.com/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0f0f1e] text-white">
        {/* Navbar */}
        <header className="border-b border-white/5">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="8" width="24" height="24" rx="5" fill="white" opacity="0.95"/>
                  <circle cx="9" cy="15" r="2.5" fill="#ef4444"/><circle cx="19" cy="15" r="2.5" fill="#ef4444"/>
                  <circle cx="14" cy="20" r="2.5" fill="#ef4444"/><circle cx="9" cy="25" r="2.5" fill="#ef4444"/>
                  <circle cx="19" cy="25" r="2.5" fill="#ef4444"/>
                  <path d="M30 4l8 5-14 9 6-14z" fill="white" opacity="0.85"/>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight">101<span className="text-red-500">Dream</span></span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/login" className="px-5 py-2.5 rounded-lg text-sm font-bold bg-red-600 hover:bg-red-500 transition-all">Play Now</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-black mb-8">
            About <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">101Dream</span>
          </h1>

          <div className="space-y-8 text-white/80 text-lg leading-relaxed">
            <p>
              <strong className="text-white">101Dream</strong> is India's fastest-growing online gaming platform where you can play your favorite games like the <strong className="text-white">Aviator crash game</strong> and <strong className="text-white">Lucky Spinner</strong> — and win real cash!
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Why Choose 101Dream?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">&#10003;</span> <span>100% Safe & Secure Platform</span></li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">&#10003;</span> <span>Instant UPI Withdrawals — Get your winnings directly to your bank</span></li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">&#10003;</span> <span>Aviator Crash Game — Predict the multiplier and win big</span></li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">&#10003;</span> <span>Lucky Spinner — Spin and win real cash prizes</span></li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">&#10003;</span> <span>24/7 Customer Support</span></li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">&#10003;</span> <span>Refer & Earn Bonus Program</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] text-center">
                  <div className="text-4xl mb-2">&#x1F680;</div>
                  <h3 className="font-bold text-white">Aviator</h3>
                  <p className="text-sm text-white/60 mt-1">Crash game with live multipliers</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] text-center">
                  <div className="text-4xl mb-2">&#x1F3AF;</div>
                  <h3 className="font-bold text-white">Lucky Spinner</h3>
                  <p className="text-sm text-white/60 mt-1">Spin the wheel, win instant prizes</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
              <ol className="space-y-3 list-decimal list-inside">
                <li><strong className="text-white">Sign Up</strong> — Create your free account on 101Dream</li>
                <li><strong className="text-white">Add Money</strong> — Deposit via UPI, PhonePe, Google Pay, Paytm</li>
                <li><strong className="text-white">Play Games</strong> — Choose Aviator or Spinner</li>
                <li><strong className="text-white">Win & Withdraw</strong> — Withdraw winnings instantly to your UPI</li>
              </ol>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Follow Us</h2>
              <p className="mb-4">Stay connected with 101Dream on social media for latest updates, offers and more!</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.instagram.com/101dream/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
                  Instagram
                </a>
                <a href="https://t.me/101dream" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:opacity-90 transition">
                  Telegram
                </a>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link to="/login" className="inline-block px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-600/30 hover:shadow-violet-500/50 transition-all hover:scale-[1.02]">
                Join 101Dream Now
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-extrabold">101<span className="text-red-500">Dream</span></span>
              <div className="flex items-center gap-6 text-sm text-white/40">
                <Link to="/about" className="hover:text-white/70">About</Link>
                <Link to="/privacy" className="hover:text-white/70">Privacy Policy</Link>
                <Link to="/how-to-play" className="hover:text-white/70">How to Play</Link>
                <Link to="/contact" className="hover:text-white/70">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutUs;
