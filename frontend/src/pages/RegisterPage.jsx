// import { Link } from "react-router-dom";
// import { registerUser } from "../api/auth";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "../layouts/AuthLayout";

// export default function RegisterPage() {
//   return (
//     <AuthLayout title="Create your account">
//       <form className="space-y-6">
//         <div>
//           <label className="mb-1 block text-sm">
//             Name
//           </label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 outline-none focus:border-black"
//             placeholder="Your name"
//           />
//         </div>

//         <div>
//           <label className="mb-1 block text-sm">
//             Email
//           </label>
//           <input
//             type="email"
//             className="w-full border px-3 py-2 outline-none focus:border-black"
//             placeholder="you@example.com"
//           />
//         </div>

//         <div>
//           <label className="mb-1 block text-sm">
//             Password
//           </label>
//           <input
//             type="password"
//             className="w-full border px-3 py-2 outline-none focus:border-black"
//             placeholder="••••••••"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-black py-3 text-sm uppercase tracking-wider text-white hover:opacity-90"
//         >
//           Create Account
//         </button>

//         <p className="text-center text-sm opacity-70">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="underline hover:opacity-100"
//           >
//             Sign in
//           </Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// }
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { registerUser } from "../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await registerUser(name, email, password);

      alert("Registration successful. Please log in.");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <AuthLayout title="Create your account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm">Name</label>
          <input
            name="name"
            type="text"
            className="w-full border px-3 py-2 outline-none focus:border-black"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border px-3 py-2 outline-none focus:border-black"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border px-3 py-2 outline-none focus:border-black"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black py-3 text-sm uppercase tracking-wider text-white hover:opacity-90"
        >
          Create Account
        </button>

        <p className="text-center text-sm opacity-70">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:opacity-100">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
