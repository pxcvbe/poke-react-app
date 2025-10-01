import { FormEvent, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {

  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const loc = useLocation() as any;
  const redirect = loc.state?.redirect || "/";
  
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res =
      mode === "login" ? login(email, password) : register(email, password);
    if (res.ok) nav(redirect, { replace: true });
    else setError(res.error || "Failed");
  }

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto border rounded-2xl p-6 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-zinc-100">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
          {mode === "login"
            ? "Masuk untuk mulai menangkap Pokemon."
            : "Daftar akun baru untuk menyimpan inventori."}
        </p>
        {error && (
          <div className="mb-3 p-2 rounded bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-zinc-200">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full border rounded-xl px-3 py-2 bg-white text-gray-900 border-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-zinc-200">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full border rounded-xl px-3 py-2 bg-white text-gray-900 border-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            />
          </div>
          <button className="w-full px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700">
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>
        <div className="mt-3 text-sm">
          {mode === "login" ? (
            <button
              onClick={() => setMode("register")}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Buat akun baru
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sudah punya akun? Login
            </button>
          )}
        </div>
        <div className="mt-4 text-sm">
          <Link
            to="/"
            className="text-gray-600 dark:text-zinc-400 hover:underline"
          >
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
