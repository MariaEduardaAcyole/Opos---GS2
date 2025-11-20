import { useState } from "react";
import { useRouter } from "next/router";
import { signupUser } from "../lib/auth";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (!name || !email || !password) return setErr("Preencha todos os campos");
    setLoading(true);

    setTimeout(() => {
      const res = signupUser({ name, email, password });
      setLoading(false);
      if (!res.ok) return setErr(res.message);
      // sucesso
      router.push("/login?signup=success");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <button onClick={() => router.back()} className="text-gray-300 mb-4 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Voltar
        </button>

        <h1 className="text-2xl font-semibold text-white mb-4">Criar conta</h1>
        <p className="text-gray-400 mb-6">Cadastre-se para começar a usar a plataforma.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-full bg-black/20 border border-white/10 text-white"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded-full bg-black/20 border border-white/10 text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <input
            className="w-full p-3 rounded-full bg-black/20 border border-white/10 text-white"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          {err && <div className="text-red-400 text-sm">{err}</div>}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <div className="text-gray-400 text-sm mt-4">
          Já tem conta?{" "}
          <a href="/login" className="text-blue-300 hover:underline">
            Entrar
          </a>
        </div>
      </div>
    </div>
  );
}
