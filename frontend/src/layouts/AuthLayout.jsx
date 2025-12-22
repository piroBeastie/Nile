export default function AuthLayout({ title, children }) {
  return (
    <div className="mx-auto max-w-[420px] py-24">
      <h1 className="mb-10 text-3xl font-semibold text-center">
        {title}
      </h1>

      <div className="bg-white p-8">
        {children}
      </div>
    </div>
  );
}