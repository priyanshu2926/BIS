import Brand from '../common/Brand'

export default function Footer() {
  return <footer className="bg-navy text-blue-100">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr]">
      <div>
        <Brand light />
        <p className="mt-5 max-w-md text-sm leading-6 text-blue-200">An AI-powered guide for making Indian Standards and BIS services easier to understand and navigate.</p>
      </div>
      <div className="md:justify-self-end">
        <p className="text-sm font-semibold text-white">Explore</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a href="#home" className="hover:text-white">Home</a><a href="#about" className="hover:text-white">About</a><a href="#how-it-works" className="hover:text-white">How it works</a>
        </div>
      </div>
    </div>
    <div className="border-t border-white/15"><div className="mx-auto max-w-7xl px-5 py-5 text-sm text-blue-200 sm:px-8">Built for Smart India Hackathon 2026</div></div>
  </footer>
}
