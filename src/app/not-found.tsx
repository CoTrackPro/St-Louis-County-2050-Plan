import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Large 404 */}
        <div className="text-[120px] font-extrabold leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none mb-2">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-[#0ea5e9] text-white font-medium hover:bg-[#0284c7] transition"
          >
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-xl border border-white/20 text-gray-300 font-medium hover:border-white/40 hover:text-white transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
