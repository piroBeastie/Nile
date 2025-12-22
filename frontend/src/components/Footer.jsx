export default function Footer() {
  return (
    <footer className="mt-32 border-t border-black/10 py-12 text-sm">
      <div className="flex justify-between opacity-70">
        <p>© {new Date().getFullYear()} NILE</p>
        <p>Crafted for modern living</p>
      </div>
    </footer>
  );
}