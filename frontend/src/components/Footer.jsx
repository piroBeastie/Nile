export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-start text-xs opacity-50 tracking-wide">
        © {new Date().getFullYear()} • Crafted with care
      </div>
    </footer>
  );
}