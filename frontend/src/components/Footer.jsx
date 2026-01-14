export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-sm">
        {/* Brand */}
        <span className="font-semibold tracking-wide">NILE.</span>

        {/* Meta */}
        <span className="opacity-60">
          © {new Date().getFullYear()} NILE. All rights reserved.
        </span>
      </div>
    </footer>
  );
}